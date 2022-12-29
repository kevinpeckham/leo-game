import { writable } from 'svelte/store';
export const gameInterval = writable<NodeJS.Timeout | undefined>(undefined);
export const gameStatus = writable('ready');
export const gameScore = writable(0);
export const gameLevel = writable(1);
export const gameLevelMax = writable(10);
export const gameLevels = writable({
	1: {
		goal: 10,
		health: 3,
		speed: 2000
	},
	2: {
		goal: 20
	}
});
