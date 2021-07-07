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

export const map = (
	value: number,
	min: number,
	max: number,
	start: number,
	end: number,
) => {
	return ((value - min) / (max - start)) * (end - start) + start;
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
