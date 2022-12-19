<!--
@component
Here's some documentation for this component.
-->

<script lang='ts'>

// stores
import { allDonuts, activeDonutId, nextDonutId, donutCount, donutSize, donutHits } from '$stores/donutStore';
import { allBullets, activeBulletId, nextBulletId, activeBullet } from "$stores/bulletStore";
import { shotCount } from '$stores/shotStore';
import { shooterX, shooterW, shooterSize, shooterXMotion } from "$stores/shooterStore";
import { positionX } from "$stores/positionStore";
import { windowWidth} from "$stores/windowStore";

// left / right motion
$: { shooterXMotion.set($shooterX, {hard:true}); }

let throttleTimer: boolean = false;

// functions

// function to throttle the firing of bullets
function throttleFire() {
	if (!throttleTimer) {
		throttleTimer = true;
		setTimeout(() => {
			throttleTimer = false;
		}, 200);
		return true;
	}
	return false;
}

function playSound(path: string) {
	const audio = new Audio(`${path}`);
	audio.play();
}

function evaluateShot(x:number) {

	// get all donuts that are on screen
	const donuts = [... $allDonuts.filter(donut => donut.status === "dropped")];
	donuts.forEach(donut => {
		const min = (donut.x) ? donut.x : 0;
		const max = (donut.x && $donutSize) ? donut.x + $donutSize : 0;
		if (x >= min && x <= max) {
			donut.status = "hit";
			$donutHits++;
			updateDonuts();
		}

	 });
	return donuts;
}

function shoot() {

	// Capture x position of bullet
	const x = JSON.parse(JSON.stringify($shooterX));

	// Will this shot hit a donut?
	evaluateShot(x);

	// play sound
	playSound('/audio/shot-01.mp3');

	const activeBullet = $allBullets[$activeBulletId];
	activeBullet.status = "fired"
	activeBullet.x = x;
	updateBullets();
}
function reload() {
	const nextBullet = $allBullets[$nextBulletId];
	nextBullet.status = "ready"
	nextBullet.x = 0;
	updateBullets();
	$activeBulletId = $nextBulletId;
}
function updateBullets() {
	$allBullets = [	...$allBullets]
}
function updateDonuts() {
	$allDonuts = [	...$allDonuts]
}

function shootAndReload() {
	if (throttleFire()) {
		shoot();
		reload();
	}
};




$: {
	if ($shotCount != 0) {
		shootAndReload();

	}
}


</script>

<template lang='pug'>
.absolute.bottom-0.text-white.grid.place-content-center.pointer-events-none(
	tabindex="-1"
	style="transform: translateX({$shooterXMotion}px);"
	)
	.bg-white.h-4.relative(
		style!="width:{$shooterSize}px"
	) &nbsp;
</template>