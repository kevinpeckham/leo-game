<!--
@component
The main user-controlled shooting component.
The shooter can move left and right, and shoot.
-->

<script lang='ts'>

// svelte fade
import { fade } from 'svelte/transition';

// stores
import { gameStatus } from '$lib/stores/gameStore';
import { allDonuts, donutCount, donutSize, donutHits } from '$stores/donutStore';
import { bulletCount, bullets } from "$stores/bulletStore";
import { shotCount } from '$stores/shotStore';
import { shooterX, shooterW, shooterSize, shooterXMotion } from "$stores/shooterStore";
import { positionX } from "$stores/positionStore";
import { windowWidth} from "$stores/windowStore";

// types & classes
import { Bullet } from "$types/bulletTypes";
import type { Donut } from "$types/donutTypes";

// reactive expressions

	// left / right motion
	$: { if ($gameStatus == "playing") shooterXMotion.set($shooterX, {hard:true}); }

	// every time the shot count increases we shoot
	$: {
		if ($shotCount != 0 && $gameStatus == "playing") {
			shoot();
		}
	}

// variables
let throttleTimer: boolean = false;
let bulletHitTimer;


// functions

function playSound(path: string) {
	const audio = new Audio(`${path}`);
	audio.play();
}
function evaluateShot(bullet: Bullet) {
	const x = bullet.x;

	// get all donuts that are on screen
	const donuts = [... $allDonuts.filter(donut => donut.status === "dropped")];
	const donutArray: Donut[] = [];
	donuts.forEach(donut => {
		const min = (donut.x) ? donut.x : 0;
		const max = (donut.x && $donutSize) ? donut.x + $donutSize : 0;
		if (x >= min && x <= max) {
			donutArray.push(donut)
		}
	 });
	return donutArray;
}
function shoot() {

	// Capture x position of bullet
	const x = JSON.parse(JSON.stringify($shooterX));

	// play sound
	playSound('/audio/shot-01.mp3');

	// update bullet count
	$bulletCount++;

	// make bullet
	const bullet = new Bullet('&nbsp;', $bulletCount, "ready", x, 0)

	// fire bullet
	bullet.status = "fired";

	// add bullet to bullet store
	$bullets = [...$bullets, bullet];

	// Get donuts that are hit
	const hitDonuts: Donut[]  = evaluateShot(bullet);
	const hitDonut = hitDonuts[0];

	if (hitDonut) {
		hitDonut.status = "hit";
		//const yString = (hitDonut.element?.style.transform.split(',')[1].split('.')[0]) ? hitDonut.element?.style.transform.split(',')[1].split('.')[0] : '';
		//const targetCurrentY = parseInt(yString) ? parseInt(yString) : 0;
		updateDonuts();

			// hit timer
			bulletHitTimer = setTimeout(() => {
				bullet.status = "hit"
				$donutHits = $donutHits + 1;
				//if (targetCurrentY) bullet.y = targetCurrentY;
				//console.log(bullet.y)
				updateBullets();
			}, 100);
	}
}

function updateBullets() {
	$bullets = [	...$bullets]
}
function updateDonuts() {
	$allDonuts = [	...$allDonuts]
}

</script>

<template lang='pug'>
+if('$gameStatus == "playing"')
	.absolute.mb-8.bottom-0.text-white.grid.place-content-center.pointer-events-none(
		transition:fade
		tabindex="-1"
		style="transform: translateX({$shooterXMotion}px);"
		)
		.bg-white.h-8.relative(
			style!="width:{$shooterSize}px"
		) &nbsp;
</template>