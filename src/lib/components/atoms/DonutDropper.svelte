
<!--
@component
Here's some documentation for this component.
-->

<script lang='ts'>

// stores
import { allDonuts, activeDonutId, nextDonutId, donutCount, donutSize } from "$stores/donutStore";
import { shotCount } from '$stores/shotStore';
import { shooterX, shooterW, shooterXMotion } from "$stores/shooterStore";
import { positionX } from "$stores/positionStore";
import { windowWidth} from "$stores/windowStore";
import { gameStatus } from "$stores/gameStore";

// left / right motion
//$: { shooterXMotion.set($shooterX, {hard:true}); }

//let throttleTimer: boolean = false;

// functions

// function to throttle the firing of donuts
// function throttleFire() {
// 	if (!throttleTimer) {
// 		throttleTimer = true;
// 		setTimeout(() => {
// 			throttleTimer = false;
// 		}, 200);
// 		return true;
// 	}
// 	return false;
// }

// function playSound(path: string) {
// 	const audio = new Audio(`${path}`);
// 	audio.play();
// }

// function to generate random integer between min and max
function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function dropDonut() {

	// play sound
	//playSound('/audio/shot-01.mp3');

	const activeDonut = $allDonuts[$activeDonutId];
	activeDonut.status = "dropped"
	activeDonut.x = getRandomInt(0, $windowWidth - $donutSize );
	updateDonuts();
}
function reload() {
	const nextDonut = $allDonuts[$nextDonutId];
	nextDonut.status = "ready"
	nextDonut.x = -20;
	updateDonuts();
	$activeDonutId = $nextDonutId;
}
function updateDonuts() {
	$allDonuts = [	...$allDonuts]
}


function dropAndReload() {
	dropDonut();
	reload();
};


let dropDonuts: Timer;
$: {
	if ($gameStatus == "playing") { dropDonuts = setInterval(dropAndReload, 2000) }
	else { clearInterval(dropDonuts) }
}




</script>

<template lang='pug'>

</template>