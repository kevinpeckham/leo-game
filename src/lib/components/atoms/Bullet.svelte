<!--
@component
Here's some documentation for this component.
-->

<script lang='ts'>
// svelte motion functions
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

// stores
import { windowHeight, windowWidth } from "$stores/windowStore";
import { shooterX, shooterSize } from "$stores/shooterStore";
import { allBullets, activeBulletId } from "$stores/bulletStore";

// types
import type { Bullet } from "$types/bulletTypes";

// motion
const motionY = tweened(0, {
	duration: 500,
	easing: cubicOut
});

// props
export let bullet: Bullet | undefined;

$: opacity = 0;

// shoot
$: {
	if (bullet && bullet.status == "fired") {
		opacity = 1;
		motionY.set(-1 * ($windowHeight + $shooterSize));
	}
}

// ready state
$: {
	if (bullet && bullet.status == "ready") {
		opacity = 0;
		motionY.set(0, { duration:0 });
	}
}


</script>

<template lang='pug'>
.absolute.bottom-0.left-0.text-normal.pointer-events-none.rounded-full.grid.place-content-center.p-2(
	id!="{bullet.id}",
	style!="background-color:transparent; height:{$shooterSize}px; opacity:{opacity}; transform: translate( {bullet.x}px, {$motionY}px); width:{$shooterSize}px;")
	div.bg-white.rounded-full(style="background-color:{bullet.color};") &nbsp;

</template>

