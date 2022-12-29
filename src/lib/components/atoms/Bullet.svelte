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
import { bullets } from "$stores/bulletStore";

// types
import type { Bullet } from "$types/bulletTypes";

// motion
const motionY = tweened(0, {
	duration: 300,
	easing: cubicOut
});

// props
export let bullet: Bullet | undefined;


// ready state
$: {
	if (bullet && bullet.status == "ready") {
		bullet.opacity = 0;
		motionY.set(0, { duration:0 });
	}
}

// fired state
$: {
	if (bullet && bullet.status == "fired") {
		bullet.color = '#fff';
		bullet.opacity = 1;
		motionY.set(-1 * ($windowHeight + $shooterSize));
	}
}

// hit state
$: {
	if (bullet && bullet.status == "hit") {
	//bullet.opacity = 0;
	bullet.color = "red";
	// after timeOut set status to spent
	setTimeout(() => {
		if (bullet) {
			bullet.status = "spent";
			}}, 100);
		}
	}




// spent state
$: {
	if (bullet && bullet.status == "spent") {
		//bullet.opacity = 0;
		//motionY.set(0, { duration:0 });
	}
}


</script>

<template lang='pug'>
.absolute.bottom-0.left-0.text-normal.pointer-events-none.rounded-full.grid.place-content-center.p-2(
	id!="{bullet.id}",
	style!="transition-opacity delay-75 background-color: {bullet.color}; height:{$shooterSize}px; opacity:{bullet.opacity}; transform: translate( {bullet.x}px, {$motionY}px); width:{$shooterSize}px; {bullet.style}")
	.rounded-full(style="background-color:{bullet.color};") &nbsp;

</template>

