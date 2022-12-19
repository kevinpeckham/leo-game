<!--
@component
Here's some documentation for this component.
-->

<script lang='ts'>
// svelte motion functions
import { tweened } from 'svelte/motion';
import { cubicIn } from 'svelte/easing';

// stores
import { gameStatus } from '$stores/gameStore';
import { allBullets, activeBulletId } from '$stores/bulletStore';
import { allDonuts, activeDonutId, nextDonutId, donutCount, donutSize } from '$stores/donutStore';
import { windowHeight, windowWidth } from "$stores/windowStore";
import { shooterX } from "$stores/shooterStore";

// types
import type { Donut } from "$types/donutTypes";


// props
export let donut: Donut;

// reactive variables
$: opacity = 0;
$: speed = 2000;
$: bgColor = "transparent";
$: content = "🍩";
$: rotate = "0";

// motion
const motionY = tweened(0, {
	duration: 2000,
	//easing: cubicIn
});


// functions
let timer;

// drop donut
$: {
	if (donut && donut.status == "dropped") {
		opacity = 1;
		motionY.set($windowHeight);
		// after donut has dropped, set status to "ready"
		timer = setTimeout(() => {
			donut.status = "missed";
		}, speed);
	}
}

// hit state
$: {
	if (donut && donut.status == "hit") {
		opacity = 0.6;
		content = '💨';
		rotate = "-90";
		setTimeout(() => {
			clearTimeout(timer);
			donut.status = "ready";
		}, 200);
	}
}

// ready state
$: {
	if (donut && donut.status == "ready") {
		opacity = 0;
		motionY.set(0, { duration:0 });
		content = "🍩";
		rotate = "0";
	}
}

// missed state
$: {
	if (donut && donut.status == "missed" && $gameStatus == "playing") {
		opacity = 0;
		$gameStatus = "gameOver";
	}
}



</script>

<template lang='pug'>
//- donut
.absolute.top-0.left-0.rounded-full.text-center.leading-none(
	id!="{donut.id}"
	data-status="{donut.status}"
	data-x="{donut.x}"
	style!="background-color:{bgColor}; font-size: {$donutSize}px; opacity:{opacity}; transform: translate( {donut.x}px, {$motionY}px);"
	)
		div(style="rotate:{rotate}deg;") {content}

</template>

