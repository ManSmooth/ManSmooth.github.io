import { readStore } from '$lib/util/stores';
import { writable, type Writable } from 'svelte/store';
import { roster } from './charas';

export const softPityRollCount = writable(0);
export const fivePity = writable(0);
export const sixPity = writable(0);
export const forcePity = writable(0);
export const forceToggle = writable(true);

export const rateUpSix: Writable<keyof typeof roster> = writable('surtr');
export const rateUpFive: Writable<keyof typeof roster> = writable('avywenna');

export const gachaPool: Writable<Map<number, Array<keyof typeof roster>>> = writable(new Map());

export const gachaLogs: Writable<string[]> = writable([]);

function logEntry(text: string, logs: boolean) {
	if (logs) {
		gachaLogs.update((v) => [
			`[${new Date().toISOString().split('T')[1].slice(0, -1)}] ${text}`,
			...v
		]);
	}
}

function reward(rarityMap: Map<number, Array<keyof typeof roster>>, star: number, logs: boolean) {
	if (star >= 5) {
		fivePity.set(0);
	}
	if (star >= 6) {
		sixPity.set(0);
		softPityRollCount.set(0);
	}
	const rateUp = Math.random();
	if (rateUp <= 0.5)
		switch (star) {
			case 5:
				logEntry('Won 5★ rate-up', logs);
				return readStore(rateUpFive);
			case 6:
				forceToggle.set(false);
				logEntry('Won 6★ rate-up', logs);
				return readStore(rateUpSix);
		}

	const pool = rarityMap.get(star);
	if (pool) {
		return pool[Math.floor(Math.random() * (pool.length ?? []))];
	}
	return undefined;
}

export function init() {
	const rarityMap: Map<number, Array<keyof typeof roster>> = new Map();
	for (let index = 1; index <= 6; index++) {
		rarityMap.set(
			index,
			Object.entries(roster)
				.filter(
					([k, v]) =>
						v.rarity === index && k !== readStore(rateUpFive) && k !== readStore(rateUpSix)
				)
				.map(([k, _]) => k)
		);
	}
	gachaPool.set(rarityMap);
}

export function roll(logs: boolean) {
	const rarityMap = readStore(gachaPool);
	if (!rarityMap) {
		return undefined;
	}

	sixPity.update((v) => v + 1);
	fivePity.update((v) => v + 1);
	softPityRollCount.update((v) => v + 1);
	forcePity.update((v) => v + 1);

	if ((readStore(forcePity) ?? 0) % 120 === 0 && readStore(forceToggle)) {
		fivePity.set(0);
		sixPity.set(0);
		softPityRollCount.set(0);
		forceToggle.set(false);
		logEntry('6★ Forced Pity', logs);
		return readStore(rateUpSix);
	}

	const rand = Math.random();
	const rollCount = readStore(softPityRollCount) ?? 0;
	const sixRate = rollCount >= 65 ? (rollCount - 65) * 0.05 + 0.008 : 0.008;
	// const sixRate = 0.008;

	if (rand < sixRate) {
		logEntry(`6★ ${rollCount} @ ${(sixRate * 100).toFixed(1)}%`, logs);
		return reward(rarityMap, 6, logs);
	}
	if ((readStore(sixPity) ?? 0) % 80 === 0) {
		logEntry('6★ Pity', logs);
		return reward(rarityMap, 6, logs);
	}
	if (rand < sixRate + 0.08) {
		return reward(rarityMap, 5, logs);
	}
	if ((readStore(fivePity) ?? 0) % 10 === 0) {
		logEntry('5★ Pity', logs);
		return reward(rarityMap, 5, logs);
	}
	return reward(rarityMap, 4, logs);
}
