<!--
@component
Tracks cursor position.
-->

<script lang='ts'>

	// stores
	import { positionX, positionXLast, positionY, positionYLast } from "$stores/positionStore";
	import { windowWidth } from "$stores/windowStore";


	// local functions
	function onMouseMove(e:MouseEvent) {
		const x = Math.floor(e.x);
		const y = Math.floor(e.y);
		const xCorrectedMin = (x < 0) ? 0 : x;
		const xCorrectedMax = (xCorrectedMin > $windowWidth) ? $windowWidth : xCorrectedMin;

		$positionXLast = $positionX;
		$positionX = (xCorrectedMax ? xCorrectedMax : 0);

		$positionYLast = $positionY;
		$positionY = (y ? y : 0);
	}

	function onMouseOut(e:MouseEvent) {
		const x = Math.floor(e.x);
		const y = Math.floor(e.y);
		// if y is in range && x is out of range



		if ( x < 0) {
			$positionX = 0;
		}
		else if ( x > $windowWidth) {
			$positionX = $windowWidth;
		}


	};

</script>

<template lang='pug'>
svelte:window(
	on:mousemove!="{onMouseMove}"
	on:mouseout!="{onMouseOut}"
	)
</template>