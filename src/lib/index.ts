import { Vector } from './math';
import { noop } from './utils';
import { width, height, save, restore } from './sketch';

export interface SketchData {
	name?: string;
	debug?: DebugLevel;
}

export const canvas = document.getElementById(
	'sketch',
) as HTMLCanvasElement;
export let context = canvas.getContext('2d');
export enum DebugLevel {
	NONE,
	INFO,
	ALL,
}
export let debug: DebugLevel = DebugLevel.NONE;

canvas.width = width;
canvas.height = height;

type WithContext = () => void;

export const autoSave = <T, D>(fn: (d: D) => T) => (d: D) => {
	save();
	fn(d);
	restore();
};

export const withDebug = (
	fn: () => void,
	level = DebugLevel.INFO,
) => {
	if (level === debug) {
		fn();
	}
};

export const withContext = (
	fn: WithContext,
	ctx: CanvasRenderingContext2D,
) => {
	const temp = context;
	context = ctx;
	fn();
	context = temp;
};

export const drawImage = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
) => {
	context.drawImage(ctx.canvas, x, y);
};

drawImage.v = (ctx: CanvasRenderingContext2D, position: Vector) =>
	drawImage(ctx, position.x, position.y);

export const circle = (x: number, y: number, radius: number) => {
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI);
	context.stroke();
};

circle.v = (vector: Vector, radius: number) => {
	circle(vector.x, vector.y, radius);
};

export const translate = (x: number, y: number) => {
	context.translate(x, y);
};

translate.v = (position: Vector) => {
	translate(position.x, position.y);
};

translate.toMiddle = (width: number, height?: number) => {
	height = height ?? width;

	translate(width / 2, height / 2);
};

export const rotate = (angle: number) => {
	context.rotate(angle);
};

export const createGraphics = (width: number, height: number) => {
	const canvas = document.createElement('canvas');
	if (width) {
		canvas.width = width;
	}
	if (height) {
		canvas.height = height;
	}
	const context = canvas.getContext('2d');

	return context;
};

export const scale = (x: number, y: number) => {
	context.scale(x, y);
};

export const background = (color: string) => {
	context.save();
	context.fillStyle = color;
	context.fillRect(0, 0, width, height);
	context.restore();
};

export const rect = (
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	context.rect(x, y, width, height);
};

rect.v = (anchor: Vector, width: number, height: number) => {
	context.rect(anchor.x, anchor.y, width, height);
};

export const strokeRect = (
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	return context.strokeRect(x, y, width, height);
};

type Draw = () => void;
type Setup = () => void;

interface Config {
	draw?: Draw;
	setup?: Setup;
}

export const init = (config: Config) => {
	const { draw, setup } = config;

	if (setup) {
		setup();
	}

	if (draw) {
		const runDraw = () => {
			context.save();
			draw();
			context.restore();
			window.requestAnimationFrame(runDraw);
		};

		return runDraw;
	}

	return noop;
};

export * from './sketch';
export * from './math';
