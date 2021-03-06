import {
	Vector,
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
