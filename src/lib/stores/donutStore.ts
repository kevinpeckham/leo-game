import { writable, derived } from 'svelte/store';
import { windowHeight } from '$stores/windowStore';
import type { Donut } from '$types/donutTypes';

// variable
const donutSizeFactor = 6;

// stores

// donut hits
export const donutHits = writable(0);

// donut size -- derived from window height
export const donutSize = derived([windowHeight], ([$windowHeight]) => {
	return Math.floor($windowHeight * 0.01 * donutSizeFactor);
});

// donut count -- keeps track of how many donuts have been dropped
export const donutCount = writable(0);

// donuts -- all the donut elements in the game
export const allDonuts= writable(makeDonuts(20));

// donut - id of the donut that is currently ready to be dropped
export const activeDonutId = writable(0);

// donut - id of the donut that is next after the active donut
export const nextDonutId = derived([activeDonutId, allDonuts],([$activeDonutId, $allDonuts]) => {
	if ($activeDonutId == $allDonuts.length - 1) return 0;
	else return $activeDonutId + 1;
});


// functions
function makeDonuts(quantity: number) {
	const donuts: Donut[] = [];
	let i = 0;
	while (i < quantity) {
		donuts.push({
			color: 'pink',
			id: i,
			status: 'ready',
			x: 0,
		});
		i++;
	}
	return donuts;
}
