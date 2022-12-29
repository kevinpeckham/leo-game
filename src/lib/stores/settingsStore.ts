import { readable, writable, derived, get } from 'svelte/store';
import { windowHeight } from '$stores/windowStore';
import { donutSize } from '$stores/donutStore';

// set falls speed -- pixels per millisecond
export const donutFallSpeed = writable(0.5);

export const headerHeight = readable(52);
export const bottomHeight = readable(100);

// derive max travel distance
export const donutMaxTravelDistance = derived(
	[windowHeight, headerHeight, bottomHeight, donutSize],
	([$windowHeight, $headerHeight, $bottomHeight, $donutSize]) => {
		return $windowHeight - $headerHeight - $bottomHeight - $donutSize;
	}
);

// derive max travel duration
export const donutMaxTravelDuration = derived(
	[donutFallSpeed, donutMaxTravelDistance],
	([$donutFallSpeed, $donutMaxTravelDistance]) => {
		return $donutMaxTravelDistance / $donutFallSpeed;
	}
);

// drop interval
export const timeBetweenDonuts = readable(3200);

export const timeBeforeHitDonutTurnsToSmoke = readable(200);
export const timeBeforeHitDonutDisappears = readable(200);

const midnight = '#233343';
// colors
export const gameBackgroundColor = writable(midnight);
export const headerBackgroundColor = writable('#394856');
export const messageOverlayBackgroundColor = readable('transparent');
export const messageOverlayBackgroundOpacity = readable(0.1);
export const messageOverlayTextColor = readable('#fff');
