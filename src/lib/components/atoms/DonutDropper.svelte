
<!--
@component
Logic for dropping donuts.
-->

<script lang='ts'>

// stores
import { allDonuts, donutCount, donutMisses, donutDropTimer } from "$stores/donutStore";
import { timeBetweenDonuts } from "$stores/settingsStore";
import { gameStatus } from "$stores/gameStore";

// types
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
	// if timer is not cleared, set donut status to "spent"
	donut.dropTimer = setTimeout(() => {
		if ($gameStatus == "playing") $donutMisses++;
		donut.status = "spent";
	}, $timeBetweenDonuts);

	// increase donut count
	$donutCount = $donutCount + 1;

}

// start timer
$: {
	if ($gameStatus == "playing" && $donutDropTimer == undefined) {
		$donutDropTimer = setInterval(dropDonut, 2000);
	}
	else if (($gameStatus == "paused" || $gameStatus == "over") && $donutDropTimer) {
		clearInterval($donutDropTimer);
		$donutDropTimer = undefined;
	}

}
</script>

<template lang='pug'>
</template>