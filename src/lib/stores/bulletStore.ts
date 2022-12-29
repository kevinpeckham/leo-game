import { writable } from 'svelte/store';
import type { Bullet } from '$types/bulletTypes';

export const emptyBulletArray: Bullet[] = [];
export const bullets = writable(emptyBulletArray);
export const bulletCount = writable(0);
