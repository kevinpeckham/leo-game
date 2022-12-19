// import svelte functions
import { writable, derived } from 'svelte/store';
import { spring } from 'svelte/motion';

// import stores
import { positionX } from '$stores/positionStore';
import { windowWidth, windowHeight } from '$stores/windowStore';

export const shooterW = writable(8);

const shooterSizeFactor = 1.5;
export const shooterSize = derived([windowHeight], ([$windowHeight]) => {
	return Math.floor($windowHeight * 0.01 * shooterSizeFactor);
});

// derive shooter position from positionX
export const shooterX = derived(
	[positionX, windowWidth, shooterSize],
	([$positionX, $windowWidth, $shooterSize]) => {
		const max = $windowWidth - $shooterSize;
		const min = 0;
		if ($positionX > max) return max;
		if ($positionX < min) return min;
		else return $positionX;
	}
);

export const shooterXMotion = spring(0, {
	stiffness: .5,
	damping: .5
});
