import palettes from 'nice-color-palettes';
import { noise1D, rangeFloor } from 'canvas-sketch-util/random';
import {
	SketchData,
	DebugLevel,
	line,
	translate,
	width,
	height,
	beginPath,
	moveTo,
	lineTo,
	stroke,
	strokeStyle,
} from '../lib';

export const sketchData: SketchData = {
	name: 'Tattoo',
	debug: DebugLevel.NONE,
};

const colors = palettes[0];

const getRandomColor = () => {
	console.log(rangeFloor(0, colors.length));

	return colors[rangeFloor(0, colors.length)];
};

const fiber = (shift: number) => {
	let steps = width / 5;
	beginPath();
	moveTo(0, 0);
	lineTo(0, 0);
	for (let index = steps; index < width; index += steps) {
		const delta = noise1D(index + shift);
		lineTo(index, delta * 100);
	}
	lineTo(width, 0);
	stroke();
};
export const setup = () => {
	translate(0, height / 2);
	line(0, 0, width, 0);

	let amoutOfFibers = 5;
	for (let index = 0; index < amoutOfFibers; index++) {
		console.log(getRandomColor(), colors);

		strokeStyle(getRandomColor());
		fiber(index);
	}
};

export const draw = () => {};
