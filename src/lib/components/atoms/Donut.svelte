<!--
@component
Manages state for donuts.
-->

<script lang='ts'>
// svelte motion functions
import { tweened } from 'svelte/motion';
import { cubicIn } from 'svelte/easing';

// stores
import { gameStatus } from '$stores/gameStore';
import { allDonuts, donutCount, donutSize, donutMisses, donutHits, donutDropTimer  } from '$stores/donutStore';
import { windowHeight, windowWidth } from "$stores/windowStore";
import { shooterX } from "$stores/shooterStore";
import {
	gameBackgroundColor,
	donutMaxTravelDuration,
	timeBeforeHitDonutTurnsToSmoke,
	timeBeforeHitDonutDisappears,
	headerHeight } from '$stores/settingsStore';

// types
import type { Donut } from "$types/donutTypes";

// props
export let donut: Donut;
//export let donutElement: HTMLDivElement;

// motion
const motionY = tweened(52, {
	duration: $donutMaxTravelDuration,
	easing: cubicIn
});

// functions
let timer;
let hitTimer;

// drop donut
$: {
	if (donut && donut.status == "dropped") {
		donut.opacity = 1;
		donut.label = (donut.id).toString();
		const dropHeight = $windowHeight - $headerHeight - $donutSize;
		$motionY = dropHeight;
	}

	else if (donut && donut.status == "hit") {
		donut.opacity = 0.6;
		donut.label = '';

		// clear  the drop timer
		clearTimeout(donut.dropTimer);

		// start content timer -- donut turns into smoke after 100ms
		if (!donut.contentTimer) {
			donut.contentTimer = setTimeout(() => {
				donut.content = '💨';
				donut.rotate = -90;
			}, $timeBeforeHitDonutTurnsToSmoke);
		}

		// start hit timer -- donut disappears after 200ms
		if (!donut.hitTimer) {
			donut.hitTimer = setTimeout(() => {
				donut.status = "spent";
				$allDonuts = $allDonuts;
			}, $timeBeforeHitDonutDisappears);
		}
	}

	// else if missed
	else if (donut && donut.status == "missed") {
		donut.opacity = 1;
		donut.label = 'huh?';
		donut.content = '👽';
		donut.rotate = 0;
		$gameBackgroundColor = 'yellow';
		// revert background color after
		// setTimeout(() => {
		// 	$gameBackgroundColor = '#233343';
		// 	donut.status = "spent";
		// }, 100);
		// $allDonuts = $allDonuts;

		// // clear  the drop timer
		clearTimeout(donut.dropTimer);
		donut.status = "spent";

		// // start hit timer -- donut disappears after 200ms
		// if (!donut.missTimer) {
		// 	donut.missTimer = setTimeout(() => {
		// 		donut.status = "spent";
		// 		//$allDonuts = $allDonuts;
		// 	}, $timeBeforeHitDonutDisappears);
		// }
	}

	// else if spent
	else if (donut.status == "spent") {
		if (donut.hitTimer) clearTimeout(donut.hitTimer);
		if (donut.missTimer) clearTimeout(donut.missTimer);
		if (donut.dropTimer) clearTimeout(donut.dropTimer);
	}

	if ($gameStatus == "paused" || $gameStatus == "over") {
		donut.status = "spent";
	}
}
</script>

<template lang='pug'>
//- donut
.absolute.top-0.left-0.rounded-full.text-center.leading-none(
	id!="{donut.id}"
	bind:this!="{donut.element}"
	style!="font-size: {$donutSize}px; opacity:{donut.opacity}; transform: translate( {donut.x}px, {$motionY}px);"
	)
		div(style="rotate:{parseInt(donut.rotate)}deg;") {donut.content}
		.text-sm.text-white {donut.label}

</template>

