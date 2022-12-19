<!--
@component
Here's some documentation for this component.
-->

<script lang='ts'>
  import { donutHits } from '$stores/donutStore';
  import { gameStatus } from '$stores/gameStore';
</script>

<template lang='pug'>
.absolute.w-full.px-4.py-2(class="bg-[#233343] bg-opacity-20")
  .text-white.text-lg.flex.items-center 🍩&nbsp;&nbsp;
    // donut hits counter
    .text-sm.mr-4 {$donutHits}

    // game status
    .text-sm {$gameStatus}
</template>