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
	const count: number = $state(10);
	function doRoll() {
		latest = [];
		for (let index = 0; index < count; index++) {
			const id = roll();
			if (id) {
				latest.push(roster[id]);
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
		<button
			class="flex w-fit items-center gap-2 bg-yellow-400 px-2 py-1 text-zinc-900"
			onclick={doReset}
		>
			<div class="h-1 w-1 bg-zinc-900"></div>
			RESET
			<div class="h-1 w-1 bg-zinc-900"></div>
		</button>
	</div>
	{#if latest.length > 0}
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
		<div class="grid w-full grid-cols-10 gap-1">
			{#each latest as chara}
				{#key chara}
					<CharacterCard character={chara} />
				{/key}
			{/each}
		</div>
		{#if $gachaLogs.length > 0}
			<p class="text-xl">Logs</p>
			<div class="flex h-64 flex-col gap-2 overflow-y-scroll rounded-lg bg-zinc-800 p-4">
				{#each $gachaLogs as entry}
					<p>{entry}</p>
				{/each}
			</div>
		{/if}
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
