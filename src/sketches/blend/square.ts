import {
	background,
	SketchData,
	strokeStyle,
	center,
	DebugLevel,
	noise,
	beginPath,
	moveTo,
	endShape,
	lineTo,
	stroke,
	globalCompositeOperation,
	lineWidth,
	rotate,
	TAU,
	translate,
} from '../../lib';

export const sketchData: SketchData = {
	name: 'Tattoo',
	debug: DebugLevel.NONE,
};

const steps = 10;
const size = 300;

export const setup = () => {
	console.log(noise(1));
};

const line = (color: string, diff: number) => {
	strokeStyle(color);
	lineWidth(5);
	beginPath();
	moveTo(0, 0);
	for (let index = 0; index < size; index += size / steps) {
		lineTo(index, noise(index + diff) * 5);
	}
	lineTo(size, noise(size + diff) * 5);
	endShape();
	stroke();
};

let diff = 0;

const drawSquare = () => {
	for (let index = 0; index < 4; index++) {
		translate(0, -size);
		line('red', diff);
		line('blue', 1 + diff);
		line('green', 2 + diff);
		rotate(TAU / 4);
	}
};

export const draw = () => {
	background('black');
	center(-size / 2, size / 2);

	globalCompositeOperation('lighter');
	drawSquare();

	diff += 0.1;
};
