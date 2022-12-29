import { writable, derived } from 'svelte/store';
import { windowHeight } from '$stores/windowStore';
import type { Donut } from '$types/donutTypes';

// variable
const donutSizeFactor = 6;

// stores
// donut drop timer
export const donutDropTimer = writable<NodeJS.Timeout | undefined>(undefined);

// donut hits and misses
export const donutHits = writable(0);
export const donutMisses = writable(0);

// donut size -- derived from window height
export const donutSize = derived(windowHeight, ($windowWidth) => {
	return Math.floor($windowWidth * 0.01 * donutSizeFactor);
});

// donut count -- keeps track of how many donuts have been dropped
export const donutCount = writable(0);

// donuts -- all the donut elements in the game
const emptyDonutArray: Donut[] = [];
export const allDonuts = writable(emptyDonutArray);
