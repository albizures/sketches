import { context } from './context';
import { Vector } from './coordinates';
import { noop } from './utils';
import { DebugLevel } from './debug';

import { width, height, save, restore } from './sketch';

context.canvas.width = width;
context.canvas.height = height;

export interface SketchData {
	name?: string;
	debug?: DebugLevel;
}

export const autoSave = <T, D>(fn: (d: D) => T) => (d: D) => {
	save();
	fn(d);
	restore();
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

export const createGraphics = (width: number, height: number) => {
	const canvas = document.createElement('canvas');
	if (width) {
		canvas.width = width;
	}
	if (height) {
		canvas.height = height;
	}
	const context = canvas.getContext('2d');

	if (!context) {
		throw new Error('Something bad happend');
	}

	return context;
};

type CompositeOperation =
	| 'normal'
	| 'multiply'
	| 'screen'
	| 'overlay'
	| 'darken'
	| 'lighten'
	| 'lighter'
	| 'color-dodge'
	| 'color-burn'
	| 'hard-light'
	| 'soft-light'
	| 'difference'
	| 'exclusion'
	| 'hue'
	| 'saturation'
	| 'color'
	| 'luminosity';

export const globalCompositeOperation = (
	value: CompositeOperation,
) => {
	context.globalCompositeOperation = value;
};

export const scale = (x: number, y: number) => {
	context.scale(x, y);
};

export const center = (offsetX = 0, offsetY = offsetX) => {
	translate(width / 2 + offsetX, height / 2 + offsetY);
};

export const background = (color: string) => {
	context.clearRect(
		0,
		0,
		context.canvas.width,
		context.canvas.height,
	);
	context.save();
	context.fillStyle = color;
	context.fillRect(0, 0, width, height);
	context.restore();
};

export const getImageData = (
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	return context.getImageData(x, y, width, height);
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
type Preload = () => Promise<unknown>;

interface Config {
	draw?: Draw;
	setup?: Setup;
	preload?: Preload;
}

export const init = async (config: Config) => {
	const { draw, setup, preload } = config;

	if (preload) {
		await preload();
	}

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

export * from './context';
export * from './sketch';
export * from './math';
export * from './shapes';
export * from './utils';
export * from './coordinates';
export * from './files';
export * from './debug';
