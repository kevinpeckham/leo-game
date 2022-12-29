<!--
@component
Here's some documentation for this component.
-->

<script lang='ts'>
// svelte transition functions
import { fade } from "svelte/transition";

// svelte dispatch
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// function that dispatches a custom event named "startButtonClick"
function onStartButtonClick() {
	dispatch("startButtonClick", {});
}

// components
import IconPlay from "$atoms/IconPlay.svelte";

// stores
import { gameStatus } from "$stores/gameStore";
import { messageOverlayBackgroundColor, messageOverlayBackgroundOpacity } from "$stores/settingsStore";

// props
</script>

<template lang='pug'>
.fixed.w-screen.h-screen.grid.grid-cols-1.place-items-center.pointer-events-auto(
	style!="display:hidden;"
	transition:fade
	tabindex="-1"
	class="z-20"
	)
	// overlay background
	.absolute.inset-0.pointer-events-none(style="background-color: {$messageOverlayBackgroundColor}; opacity: {$messageOverlayBackgroundOpacity};")

	// inner container
	div.w-full.h-auto
		// Message
		.text-white.mb-8.text-4xl.text-center.flex.justify-center
			+if('$gameStatus == "over"')
				.inline-block Game Over.
				+elseif('$gameStatus == "ready"')
					// text
					.w-full.grid.grid-cols-1.justify-center.pt-48
						.mb-8 Raining Donuts
						div(class="text-[200px] leading-none") 🍩
				+elseif('$gameStatus == "paused"')
					div Paused
				+else
					span &nbsp;
		// Start Button
		.grid.place-content-center.pointer-events-none(transition:fade)
			.bg-transparent.outline.outline-white.text-center.px-4.py-2.text-white.rounded.pointer-events-auto.flex.items-center(
				class="hover:bg-white hover:text-blue-500 transition-colors"
				on:mousedown|stopPropagation!="{onStartButtonClick}"
				)
				.m-0
					IconPlay

				+if("$gameStatus == 'paused'")
					//- .ml-1
					//- 	IconPause
					.inline-block.ml-2 Continue
					+elseif('$gameStatus == "over"')
						.inline-block.ml-2 New Game
					+elseif('$gameStatus == "ready"')
							.inline-block.ml-2 Play
</template>