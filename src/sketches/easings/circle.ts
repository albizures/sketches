import eases from 'eases';
import {
	SketchData,
	DebugLevel,
	Setup,
	Draw,
	arc,
	center,
	stroke,
	beginPath,
	background,
	strokeStyle,
	fillStyle,
	map,
	lineWidth,
	timelapse,
	TimelapseType,
} from '../../lib';

export const sketchData: SketchData = {
	name: 'Circle',
	debug: DebugLevel.NONE,
};

export const setup: Setup = () => {};

interface Payload {
	lineSize: number;
	arcSize: number;
}

const run = timelapse<Payload>({
	type: TimelapseType.PERFECT_LOOP,
	steps: [
		[
			1.5,
			(pos) => {
				return {
					lineSize: 1,
					arcSize: map(eases.quintInOut(pos), 0, 1, 0, 2) * Math.PI,
				};
			},
		],
		[
			0.5,
			(pos) => {
				return {
					lineSize: map(eases.expoIn(pos), 0, 1, 1, 10),
					arcSize: 2 * Math.PI,
				};
			},
		],
	],
});

export const draw: Draw = () => {
	background('black');
	center();

	strokeStyle('white');
	fillStyle('white');

	const {
		payload: { lineSize, arcSize },
	} = run();

	beginPath();
	lineWidth(lineSize);
	arc(0, 0, 100, 0, arcSize);
	stroke();
};
