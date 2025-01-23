<script lang="ts">
	import CharacterCard from '$lib/components/character-card.svelte';
	import { roster, type Character } from '$lib/gacha/charas';
	import {
		fivePity,
		forcePity,
		forceToggle,
		gachaLogs,
		gachaPool,
		init,
		rateUpSix,
		rateUpFive,
		roll,
		sixPity,
		softPityRollCount
	} from '$lib/gacha/roll';
	import { onMount } from 'svelte';

	let latest: Array<Character> = $state([]);
	let pulled: Record<keyof typeof roster, number> = $state({});
	const pulledAmount: number = $derived(
		Object.values(pulled).reduce((prev, curr) => prev + curr, 0)
	);
	// biome-ignore lint/style/useConst: Svelte
	let count: number = $state(10);

	// biome-ignore lint/style/useConst: Svelte
	let selectedChara: keyof typeof roster = $state('perlica');
	// biome-ignore lint/style/useConst: Svelte
	let targetAmount: number = $state(6);

	function doRoll() {
		const logsEnabled = count <= 1000;
		console.log(logsEnabled);
		latest = [];
		for (let index = 0; index < count; index++) {
			const id = roll(logsEnabled);
			if (id) {
				if (logsEnabled) {
					latest.push(roster[id]);
				}
				if (id in pulled) pulled[id]++;
				else pulled[id] = 1;
			}
		}
	}
	function rollUntil(chara: keyof typeof roster, n: number) {
		doReset();
		for (;;) {
			const id = roll(false);
			if (id) {
				if (id in pulled) pulled[id]++;
				else pulled[id] = 1;
			}
			if (chara in pulled && pulled[chara] >= n) {
				return;
			}
		}
	}
	onMount(() => {
		init();
	});
	function doReset() {
		$sixPity = 0;
		$fivePity = 0;
		$softPityRollCount = 0;
		$forcePity = 0;
		$forceToggle = true;
		$gachaLogs = [];
		latest = [];
		pulled = {};
	}
</script>

<div class="flex flex-col gap-4 p-8 font-medium">
	<h1 class="text-2xl">Endfield Gacha Simulator</h1>
	<div class="flex gap-4">
		<button
			class="flex w-fit items-center gap-2 bg-yellow-400 px-2 py-1 text-zinc-900"
			onclick={doRoll}
		>
			<div class="h-1 w-1 bg-zinc-900"></div>
			ROLL
			<div class="h-1 w-1 bg-zinc-900"></div>
		</button>
		<input type="number" bind:value={count} class="w-32 text-zinc-900" />
	</div>
	<div class="flex gap-4">
		<button
			class="flex w-fit items-center gap-2 bg-yellow-400 px-2 py-1 text-zinc-900"
			onclick={() => rollUntil(selectedChara, targetAmount)}
		>
			<div class="h-1 w-1 bg-zinc-900"></div>
			ROLL UNTIL
			<div class="h-1 w-1 bg-zinc-900"></div>
		</button>
		<select class="w-fit text-zinc-900" bind:value={selectedChara}>
			{#each Object.entries(roster) as [id, chara]}
				<option value={id}>{chara.name}</option>
			{/each}
		</select>
		<input type="number" bind:value={targetAmount} class="w-32 text-zinc-900" />
	</div>
	<div class="flex gap-4">
		<button
			class="flex w-fit items-center gap-2 bg-yellow-400 px-2 py-1 text-zinc-900"
			onclick={doReset}
		>
			<div class="h-1 w-1 bg-zinc-900"></div>
			RESET
			<div class="h-1 w-1 bg-zinc-900"></div>
		</button>
	</div>
	{#if pulledAmount > 0}
		<div class="flex flex-col gap-2">
			<p>{10 - $fivePity} rolls until 5★ or better</p>
			<p>{80 - $sixPity} rolls until 6★</p>
			{#if $forceToggle}
				<p>{120 - $forcePity} rolls until rate-up</p>
			{/if}
			<p>
				Current 6★ Rate: {($softPityRollCount >= 65
					? ($softPityRollCount - 65) * 5 + 0.8
					: 0.8
				).toFixed(1)}%
			</p>
		</div>
		{#if latest.length > 0}
			<div class="grid w-full grid-cols-10 gap-1">
				{#each latest as chara}
					{#key chara}
						<CharacterCard character={chara} />
					{/key}
				{/each}
			</div>
		{/if}
		{#if $gachaLogs.length > 0}
			<p class="text-xl">Logs</p>
			<div class="flex h-64 flex-col gap-2 overflow-y-scroll rounded-lg bg-zinc-800 p-4">
				{#each $gachaLogs as entry}
					<p>{entry}</p>
				{/each}
			</div>
		{/if}
		<p class="text-xl">
			Pulled characters ({pulledAmount})
		</p>
		<div class="flex flex-wrap gap-2">
			{#each Object.entries(pulled) as [id, count]}
				{@const chara = roster[id]}
				<div
					class={`flex w-fit flex-col gap-2 rounded-md p-[5px] text-zinc-900
					${id === $rateUpFive || id === $rateUpSix ? 'bg-zinc-100' : ''}
					`}
				>
					<div
						class={`flex w-fit flex-col gap-1 rounded-md bg-gradient-to-br p-2 ${chara.rarity === 6 ? 'from-red-300 to-orange-400' : chara.rarity === 5 ? 'from-yellow-300 to-amber-400' : 'from-purple-300 to-fuchsia-400'}`}
					>
						<div class="h-32 w-32 overflow-hidden rounded-lg">
							<img class="scale-[2]" src={chara.imgUrl} alt={chara.name} />
						</div>
						<p>
							{'★'.repeat(chara.rarity)}
						</p>
						<p>
							{chara.name}
						</p>
						<p class="text-right">
							x{count}
						</p>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-xl">Gacha Pool</p>
		{#each $gachaPool.keys() as star}
			{@const characters =
				star == 6
					? [$rateUpSix, ...($gachaPool.get(star) ?? [])]
					: star == 5
						? [$rateUpFive, ...($gachaPool.get(star) ?? [])]
						: ($gachaPool.get(star) ?? [])}
			{#if characters.length > 0}
				<p class="text-lg">{star}★</p>
				<div class="flex gap-2 rounded-lg bg-zinc-800 p-4">
					{#each characters as id}
						{@const chara = roster[id]}
						<div
							class={`flex flex-col gap-2 rounded-md p-2 ${id === $rateUpFive || id === $rateUpSix ? 'bg-gradient-to-br from-orange-600 to-amber-400 text-zinc-900' : ''}`}
						>
							<div class="h-32 w-32 overflow-hidden rounded-lg">
								<img class="scale-[3]" src={chara.imgUrl} alt={chara.name} />
							</div>
							<p>
								{chara.name}
							</p>
						</div>
					{/each}
				</div>
			{/if}
		{/each}
	{/if}
</div>
