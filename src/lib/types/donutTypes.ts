// stores
import { donutCount, donutSize } from '$stores/donutStore';
import { windowWidth } from '$stores/windowStore';

// svelte store functions
import { get } from 'svelte/store';

// helper functions
import { getRandomInt } from '$utils/helpers';

// types
export class Donut {
	// index signature
	[key: string]: NodeJS.Timeout | number | string | undefined | HTMLDivElement;
	content: string;
	contentTime?: NodeJS.Timeout;
	dropTimer?: NodeJS.Timeout;
	element?: HTMLDivElement;
	hitTimer?: NodeJS.Timeout;
	id: number;
	label: string;
	missTimer?: NodeJS.Timeout;
	opacity: number;
	rotate?: number;
	status: string;
	x: number;
	y: number;
	constructor(id?: number, status?: string, x?: number) {
		this.element = undefined;
		// if id is passed, use it, otherwise use donutCount
		this.id = id ? id : get(donutCount);
		// if x is passed, use it, otherwise use a random x coordinate
		this.x = x ? x : getRandomInt(0, get(windowWidth) - get(donutSize));
		// if status is passed, use it, otherwise use 'dropped'
		this.status = status ? status : 'loaded';
		this.opacity = 1;
		this.rotate = 0;
		this.content = '🍩';
		this.y = 0;
		this.label = '';
	}
}
