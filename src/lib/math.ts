import {
	noise1D,
	noise2D,
	noise3D,
	value,
	range,
} from 'canvas-sketch-util/random';

export const { PI, abs } = Math;
export const TAU = PI * 2;
export const TO_RADIANS = TAU / 360;

export enum AngleMode {
	RADIANS,
	DEGREES,
}

let currentAngleMode = AngleMode.RADIANS;

export const getAngle = (angle: number) =>
	currentAngleMode === AngleMode.RADIANS ? angle : TO_RADIANS * angle;

export const angleMode = (mode: AngleMode) => {
	currentAngleMode = mode;
};

export const acos = (angle: number) => Math.acos(angle);
export const asin = (angle: number) => Math.asin(angle);
export const atan = (angle: number) => Math.atan(angle);
export const atan2 = (x: number, y: number) =>
	getAngle(Math.atan2(x, y));
export const cos = (angle: number) => Math.cos(angle);
export const tan = (angle: number) => Math.tan(angle);
export const sin = (angle: number) => Math.sin(getAngle(angle));

export const constrain = (n: number, low: number, high: number) => {
	return Math.max(Math.min(n, high), low);
};

export const map = (
	n: number,
	start1: number,
	stop1: number,
	start2: number,
	stop2: number,
	withinBounds = false,
) => {
	const newval =
		((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
	if (!withinBounds) {
		return newval;
	}
	if (start2 < stop2) {
		return constrain(newval, start2, stop2);
	} else {
		return constrain(newval, stop2, start2);
	}
};

export const noise = (x: number, y?: number, z?: number): number => {
	if (y && z) {
		return noise3D(x, y, z);
	}

	if (y) {
		return noise2D(x, y);
	}

	return noise1D(x);
};

export const random = (min = 0, max = 1) => range(min, max);
