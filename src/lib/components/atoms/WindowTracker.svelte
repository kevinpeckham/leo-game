<!--
@component
Keeps track of window width and height.
-->

<script lang='ts'>

	// stores
	import { windowWidth, windowHeight } from "$stores/windowStore";

</script>

<template lang='pug'>
svelte:window(
	bind:innerWidth!="{$windowWidth}"
	bind:innerHeight!="{$windowHeight}"
	)
</template>