<script lang="ts">

// components
import Bullet from "$atoms/Bullet.svelte";
import Donut from "$atoms/Donut.svelte";
import Header from "$atoms/Header.svelte";
import PositionTracker from "$atoms/PositionTracker.svelte";
import Shooter from "$atoms/Shooter.svelte";
import DonutDropper from "$atoms/DonutDropper.svelte";
import WindowTracker from "$atoms/WindowTracker.svelte";

// stores
import { allBullets, activeBulletId, nextBulletId, activeBullet } from "$stores/bulletStore";
import { allDonuts, donutCount, activeDonutId, nextDonutId } from "$stores/donutStore";
import { shooterX } from "$stores/shooterStore";
import { shotCount } from "$stores/shotStore";
import { windowHeight, windowWidth } from "$stores/windowStore";
import { gameStatus } from "$stores/gameStore";

// functions
function onStartButtonClick() {
	$gameStatus ='playing';
}

function onMousedown() {
	if ($gameStatus == 'playing') $shotCount++;
}

function onKeydown(e:KeyboardEvent) {

	// if escape key is pressed, pause game
	if (e.key == 'Escape') {
		$gameStatus = 'paused';
	}

	// if spacebar is pressed increase donut count
	// if (e.key == " ") {
	// 	$donutCount = $donutCount + 1;
	// }
}

</script>

<template lang="pug">
WindowTracker
PositionTracker
#game.w-full.h-screen.relative.overflow-hidden.bg-blue-500(
	tabindex="-1",
	on:mousedown!="{onMousedown}"
	on:keydown!="{onKeydown}"
	)
	// - Header
	Header

	//- Bottom
	.absolute.bottom-0.left-0.w-full.bg-green-500.h-12(tabindex="-1")
	Shooter
	DonutDropper

	//- Bullets
	+each('$allBullets as bullet, index')
		Bullet("{bullet}")

	//- Donuts
	+each('$allDonuts as donut, index')
		Donut("{donut}")

	//- Start Button
	+if('$gameStatus != "playing"')
		.absolute.inset-0.grid.place-content-center
			.bg-transparent.outline.outline-white.text-center.px-4.py-2.text-white.rounded.pointer-events-auto(
				class="hover:bg-white hover:text-blue transition-colors"
				on:click!="{onStartButtonClick}"
				) {($gameStatus == "gameOver") ? "New Game" : "Start"}







</template>
