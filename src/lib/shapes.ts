import {
	beginPath,
	moveTo,
	stroke,
	bezierCurveTo,
	save,
	restore,
	strokeStyle,
	circle,
	fill,
	fillStyle,
	quadraticCurveTo,
	withDebug,
} from '../lib';
import { Vector } from '../lib/coordinates';
import { closePath, lineTo } from './sketch';

export const drawQuadraticBezier = (
	start: Vector,
	control: Vector,
	end: Vector,
) => {
	save();

	beginPath();
	moveTo(start.x, start.y);
	quadraticCurveTo(control.x, control.y, end.x, end.y);
	stroke();

	withDebug(() => {
		fillStyle('blue');
		strokeStyle('blue');
		circle.v(control, 4);
		fill();
	});

	restore();
};

export const drawBezier = (
	start: Vector,
	control1: Vector,
	control2: Vector,
	end: Vector,
) => {
	save();

	beginPath();
	moveTo(start.x, start.y);
	bezierCurveTo(
		control1.x,
		control1.y,
		control2.x,
		control2.y,
		end.x,
		end.y,
	);
	stroke();

	withDebug(() => {
		fillStyle('red');
		strokeStyle('red');
		circle.v(control1, 4);
		fill();

		strokeStyle('green');
		fillStyle('green');
		circle.v(control2, 4);
		fill();
	});

	restore();
};

export const quad = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	x3: number,
	y3: number,
	x4: number,
	y4: number,
) => {
	beginPath();
	moveTo(x1, y1);
	lineTo(x2, y2);
	lineTo(x3, y3);
	lineTo(x4, y4);
	closePath();
};

export const square = (
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	quad(x, y, x + width, y, x + width, y + height, x, y + height);
};
