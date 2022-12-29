<script lang="ts">

// import fade
import { fade } from "svelte/transition";

// components
import BulletComponent from "$atoms/Bullet.svelte";
import DonutComponent from "$atoms/Donut.svelte";
import Header from "$atoms/Header.svelte";
import IconPlay from "$atoms/IconPlay.svelte";
import IconPause from "$atoms/IconPause.svelte";
import MessageOverlay from "$molecules/MessageOverlay.svelte";
import PositionTracker from "$atoms/PositionTracker.svelte";
import Shooter from "$atoms/Shooter.svelte";
import WindowTracker from "$atoms/WindowTracker.svelte";

// stores
import { bullets } from "$stores/bulletStore";
import { allDonuts, donutCount, donutMisses, donutHits } from "$stores/donutStore";
import { shooterX } from "$stores/shooterStore";
import { shotCount } from "$stores/shotStore";
import { windowHeight, windowWidth } from "$stores/windowStore";
import { gameStatus, gameInterval } from "$stores/gameStore";
import { health, healthMax } from "$stores/healthStore";

// settings
import { gameBackgroundColor, donutMaxTravelDuration, timeBetweenDonuts } from "$stores/settingsStore";

// donut class
import { Donut } from "$types/donutTypes";


// functions
function dropDonut() {

	// create new donut
	const donut = new Donut();

	// add new donut to allDonuts
	$allDonuts = [...$allDonuts, donut];

	// set donut status to "dropped"
	donut.status = "dropped";

	// after donut has dropped, set a timer
	// if timer is not cleared, set donut status to "missed"
	donut.dropTimer = setTimeout(() => {
		if ($gameStatus == "playing") $donutMisses++;
		if ($gameStatus == "playing" && $health > 0) $health--;
		donut.status = "missed";
		//donut.status = 'spent';
	}, $donutMaxTravelDuration);

	// increase donut count
	$donutCount = $donutCount + 1;
}

function clearDonutTimers() {
	$allDonuts = $allDonuts.map(donut => {
		clearTimeout(donut.dropTimer);
		donut.dropTimer = undefined;
		clearTimeout(donut.hitTimer);
		donut.hitTimer = undefined;
		return donut;
	});
}

function clearDonutStats() {
	$donutCount = 0;
	$donutHits = 0;
	$donutMisses = 0;
	$health = $healthMax;
}

function clearDonutStore() {
	$allDonuts = [];
}

function clearGameInterval() {
	clearInterval($gameInterval);
	$gameInterval = undefined;
}

function startNewGame() {
	clearDonutTimers();
	clearDonutStore();
	clearDonutStats();
	clearGameInterval();
	$gameStatus = 'playing';
	$gameInterval = setInterval(dropDonut, $timeBetweenDonuts);
}

function resetGame() {
	clearDonutTimers();
	clearDonutStore();
	clearDonutStats();
	clearGameInterval();
	$gameStatus = 'ready';
	$gameInterval = setInterval(dropDonut, $timeBetweenDonuts);
}

function resumePausedGame() {
	clearDonutTimers();
	clearDonutStore();
	clearGameInterval();
	$gameStatus = 'playing';
	$gameInterval = setInterval(dropDonut, $timeBetweenDonuts);
}

function onStartButtonClick() {
	if ($gameStatus != 'paused') startNewGame();
	else resumePausedGame();
}

function onMousedown() {
	if ($gameStatus == 'playing') $shotCount++;
	else {
		// do nothing
	 }
}

function onKeydown(e:KeyboardEvent) {

	// if escape key is pressed, pause game
	if (e.key == 'Escape') {
		$gameStatus = 'paused';
		clearInterval($gameInterval);
		$gameInterval = undefined;
	}

}

// end game after three misses
$: {
		if ($donutMisses >= 3) {
			$gameStatus = "over";
		}
	}


	$: {
		// if game is over, clear all timers and stats and throw out all donuts
		if ($gameStatus == 'over') {
			clearGameInterval();
			clearDonutTimers();
			clearDonutStore();
			clearDonutStats();
		}
		// if game is paused, clear all timers and donuts, keep donut count and stats
		else if ($gameStatus == 'paused') {
			clearGameInterval();
			clearDonutTimers();
			const current = $allDonuts.pop();
			const currentStatus = (current) ? current.status : undefined;
			if (currentStatus == 'dropped') $donutCount = $donutCount - 1;
			clearDonutStore();
		}
		else {
			// do nothing
		}
	}

</script>

<template lang="pug">
WindowTracker
PositionTracker

// - Game Container
#game.w-full.h-screen.relative.overflow-hidden(
	style="background-color: {$gameBackgroundColor};"
	tabindex="-1",
	on:mousedown!="{onMousedown}"
	on:keydown!="{onKeydown}"
	)

	//- Header
	+if('$gameStatus == "playing" || $gameStatus == "paused"')
		.flex.relative(
			tabindex="-1"
			class="z-[20]"
			transition:fade
			)
			Header(
				on:resumePausedGame!="{resumePausedGame}"
				on:resetGame!="{resetGame}"
				)

	//- Ground
	+if('$gameStatus == "playing"')
		.absolute.bottom-0.left-0.w-full.bg-green-500.h-24(
			tabindex="-1"
			transition:fade
			)
			Shooter

	//- Bullets
	.bullets.pointer-events-none
		+each('$bullets as bullet, index')
			+if('(bullet.status == "fired" || bullet.status == "hit" )&& $gameStatus == "playing"')
				BulletComponent("{bullet}")

	//- Donuts
	.donuts.pointer-events-none
		+each('$allDonuts as donut, index')
			+if('donut.status != "spent" && $gameStatus == "playing" ')
				div(transition:fade)
					DonutComponent("{donut}")

	//- Message Overlay
	+if('$gameStatus != "playing"')
		MessageOverlay(
			on:startButtonClick!="{onStartButtonClick}"
			)

</template>
