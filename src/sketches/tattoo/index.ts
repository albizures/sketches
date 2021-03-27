import {
	background,
	save,
	restore,
	translate,
	height,
	width,
	strokeStyle,
	lineWidth,
	rotate,
	line,
	lineCap,
	withDebug,
	SketchData,
	DebugLevel,
} from '../../lib';
import { doubleOnionDome } from './onion-dome';
import { packOfMushroom } from './mushroom';
import { prettyLeaf } from './leaf';
import { cube, circlePacking } from './shapes';

export const sketchData: SketchData = {
	name: 'Tattoo',
	debug: DebugLevel.NONE,
};

const bg = '#fdfbeb';

export const final = () => {
	const rectSize = 200;

	const lineStart = (rectSize * 0.6) / 2;
	const lineEnd = (rectSize * 0.8) / 2;

	cube(rectSize, bg);
	cube(rectSize * 0.8, bg);

	save();
	for (let index = 0; index < 4; index++) {
		rotate(Math.PI / 2);
		for (let index = -lineStart; index <= lineStart; index += 10) {
			line(lineStart, index, lineEnd, index);
		}

		packOfMushroom(rectSize);
		doubleOnionDome(rectSize);
	}
	restore();
	save();
	for (let index = 0; index < 4; index++) {
		rotate(Math.PI / 2);
		save();
		translate(40, 40);
		rotate(-Math.PI / 4);
		prettyLeaf(60, 120, bg);
		restore();
	}
	restore();

	cube(rectSize * 0.5, bg);
	cube(rectSize * 0.6, bg);

	circlePacking(
		{
			x: 0,
			y: 0,
		},
		rectSize * 0.6,
	);
};

export const setup = () => {
	lineCap('round');
	background(bg);
	strokeStyle('black');
	lineWidth(4);

	translate(width / 2, height / 2);

	withDebug(() => {
		lineWidth(1);
		line(0, -height / 2, 0, height / 2);
		line(-width / 2, 0, width / 2, 0);
		lineWidth(4);
	});

	rotate(Math.PI / 4);

	final();
};
