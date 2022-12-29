import { writable } from 'svelte/store';

export const players = writable([
	{
		name: 'Player 1',
		score: 0,
		health: 3
	}
]);
