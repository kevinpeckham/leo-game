<!--
@component
Here's some documentation for this component.
-->

<script lang='ts'>

	// svelte event dispatcher
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// components
	import IconPause from '$atoms/IconPause.svelte';
	import IconPlay from '$atoms/IconPlay.svelte';
	import IconReset from '$atoms/IconReset.svelte';
	import IconHeart from '$atoms/IconHeart.svelte';

	// settings store
	import { headerBackgroundColor } from '$lib/stores/settingsStore';

	// props
	export let classes = '';

	// stores
	import {
		donutHits,
		donutMisses,
		} from '$stores/donutStore';

	import { gameStatus, gameLevel } from '$stores/gameStore';
	import { health, healthMax } from '$stores/healthStore';

	// types
	import type{ Donut }  from '$types/donutTypes';

	// functions
	function resetGame() {
		dispatch('resetGame', {});
	}
	function resumePausedGame() {
		dispatch('resumePausedGame', {});
	}
	function pauseGame() {
		$gameStatus = 'paused';
	}
	function createArrayFromNumber(number: number) {
		return Array.from(Array(number).keys());
	}

</script>

<template lang='pug'>
.absolute.w-full.px-4.py-2.flex(
	style!="background-color: {$headerBackgroundColor};"
	class!=" {classes}"
	)
	.grid.grid-cols-3.w-full

		// left
		.flex.w-full
			// donut hits
			.text-white.text-lg.flex.items-center.mr-6
				.mr-2
					.inline-block.rotate-45.origin-center.text-2xl 🍩
				.text-base(class="min-w-[10px]") {$donutHits}

			// health
			.text-white.text-lg.flex.items-center.mr-4.transition-opacity
				+each('createArrayFromNumber($healthMax) as h')
					.mr-2.w-5.text-red-700(class!="{($health >= h + 1) ? '' : 'opacity-20'}")
						IconHeart

		// center -- game level
		.grid.grid-cols-1.place-content-center.w-full
			.p-1.pointer-events-auto.ml-4.text-white.text-center.text-lg Level: {$gameLevel}

		// right -- pause and reset buttons
		.div.grid-cols-1.place-content-center.text-lg.absolute.right-0.top-0.h-full.flex.items-center.pr-4

			+if('$gameStatus == "playing" || $gameStatus == "paused"')
				// pause button
				.p-1.pointer-events-auto(
					on:mousedown|stopPropagation!="{() => {($gameStatus == 'playing') ? pauseGame() : resumePausedGame()}}"
					class="hover:bg-white/20 rounded"
					class!="{($gameStatus == 'paused') ? 'bg-white/20 rounded' : ''}"
					)
					.w-4.h-4.text-white
						IconPause
				// reset button
				.p-1.pointer-events-auto.ml-4(
					on:mousedown|stopPropagation!="{resetGame}"
					class="hover:bg-white/20 rounded"
					)
					.w-4.h-4.text-white
						IconReset

</template>