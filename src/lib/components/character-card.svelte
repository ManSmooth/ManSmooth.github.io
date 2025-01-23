<script lang="ts">
	import type { Character } from '$lib/gacha/charas';
	import { onMount } from 'svelte';

	export let character: Character;
	let bgColor = '';
	onMount(() => {
		switch (character.rarity) {
			case 4:
				bgColor = 'from-purple-300 to-fuchsia-400';
				break;
			case 5:
				bgColor = 'from-yellow-300 to-amber-400';
				break;
			case 6:
				bgColor = 'from-red-300 to-orange-400';
		}
	});
</script>

<div
	class="flex h-[640px] items-center justify-center overflow-hidden bg-gradient-to-b {bgColor} flex flex-col items-center shadow-lg"
>
	<img class="flex-1 scale-150 object-cover" src={character.imgUrl} alt={character.name} />
</div>
