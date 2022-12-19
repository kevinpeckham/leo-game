import { writable, derived } from 'svelte/store';
import type { Bullet } from '$types/bulletTypes';

export const allBullets = writable(makeBullets(40));
export const activeBulletId = writable(0);
export const nextBulletId = derived([activeBulletId, allBullets],([$activeBulletId, $allBullets]) => {
	if ($activeBulletId == $allBullets.length - 1) return 0;
	else return $activeBulletId + 1;
});

export const activeBullet = derived(
	[allBullets, activeBulletId],
	([$allBullets, $activeBulletId]) => {
		return $allBullets[$activeBulletId];
		//return bullet && bullet.div ? bullet.div : $allBullets[0].div;
	}
);



// functions
function makeBullets(quantity: number) {
	const bullets: Bullet[] = [];
	let i = 0;
	while (i < quantity) {
		bullets.push({
			color: '#fff',
			id: i,
			status: 'ready',
			x: -20,
		});
		i++;
	}
	return bullets;
}
