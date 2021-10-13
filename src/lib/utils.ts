import { scale } from '.';
import { restore, save } from './sketch';
import { constrain } from './math';

const remap = (
	value: number,
	start1: number,
	stop1: number,
	start2: number,
	stop2: number,
	withinBounds = false,
) => {
	const newval =
		((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
	if (!withinBounds) {
		return newval;
	}
	if (start2 < stop2) {
		return constrain(newval, start2, stop2);
	} else {
		return constrain(newval, stop2, start2);
	}
};

export const mirror = (fn: () => void, vertical = true) => {
	save();
	fn();
	if (vertical) {
		scale(-1, 1);
	} else {
		scale(1, -1);
	}
	fn();
	restore();
};

const noop = () => {};

export { remap, constrain, noop };
