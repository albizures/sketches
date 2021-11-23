/**
 * The author of this code is u/lighterleg and their original sketch
 * can be found here: https://www.reddit.com/r/processing/comments/p4z6cf/good_or_bad_p5js/
 */
import {
	SketchData,
	DebugLevel,
	background,
	millis,
	translate,
	width,
	height,
	vertex,
	endShape,
	beginShape,
	Vector,
	save,
	rotate,
	scale,
	restore,
	rect,
	noStroke,
	rectMode,
	CLOSE,
	fillMode,
	fillStyle,
} from '../../lib';
import { elasticInOut } from 'eases';

export const sketchData: SketchData = {
	name: 'name',
	debug: DebugLevel.NONE,
};

export const setup = () => {};

const constrain = (n: number, low: number, high: number) => {
	return Math.max(Math.min(n, high), low);
};
const lerp = function (start: number, stop: number, amt: number) {
	return amt * (stop - start) + start;
};

const map = (
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

const easeInOutQuart = (t: number) =>
	t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

function circ(R: number, W: number, T = 1) {
	beginShape();
	let N = 100;
	for (let i = 0; i < N; i++) {
		let t = (T * Math.PI * 2 * i) / (N - 1);
		vertex(Vector.new((R / 2) * Math.cos(t), (R / 2) * Math.sin(t)));
	}
	for (let i = N - 1; i >= 0; i--) {
		let t = (T * Math.PI * 2 * i) / (N - 1);
		vertex(
			Vector.new(
				(R / 2 - W) * Math.cos(t),
				(R / 2 - W) * Math.sin(t),
			),
		);
	}

	endShape(CLOSE);
}

export const draw = () => {
	background('plum');

	let tw = (millis() * 0.001 * 0.5) % 2;
	if (tw > 1) tw = 2 - tw;
	let twh = easeInOutQuart(map(tw, 1 / 4, 0.9, 0, 1, true));
	tw = easeInOutQuart(tw);

	translate(width / 2, height / 2);
	let R = 100;
	let X1 = 200;
	let X0 = (X1 / 3) * 2;

	rectMode(rectMode.CENTER);
	noStroke();
	fillMode(fillMode.FILL);
	fillStyle('blue');

	{
		// G/D
		let x = lerp(-X0, -X1, tw);
		save();
		translate(x, 0);
		circ(R, R / 4);
		rect(
			-R / 2 + R / 8,
			((-R * 0.5) / 2) * (1 - tw),
			R / 4,
			R * 1.5 * (1 - tw),
		);
		{
			save();
			scale(1, -1);
			fillStyle('crimson');
			circ(R, R / 4, twh);
			restore();
		}

		fillStyle('crimson');
		rect(R / 2 - R / 8, 1, R / 4, R * 1 * tw);
		translate(0, (R / 2) * tw);
		circ(R, R / 4, tw / 2);
		restore();
	}

	{
		let x = lerp(0, -X1 / 3, tw);
		save();
		translate(x, 0);
		rotate(Math.PI * (1 - 1 / 4));
		scale(-1, 1);
		circ(R, R / 4, 0.5);
		fillStyle('crimson');
		rotate(Math.PI);
		circ(R, R / 4, twh);
		restore();
	}

	{
		let x = lerp(0, X1 / 3, tw);
		save();
		translate(x, 0);
		rect(
			R / 2 - R / 8,
			R * 0.25 * (1 - tw),
			R / 4,
			R * 0.5 * (1 - tw),
		);
		rotate(-Math.PI / 4);
		scale(-1, 1);
		circ(R, R / 4, 0.5);
		fillStyle('crimson');
		rotate(Math.PI);
		circ(R, R / 4, twh);
		restore();
	}

	{
		let x = lerp(X0, X1, tw);
		save();
		translate(x, 0);
		circ(R, R / 4);
		{
			save();
			rotate(Math.PI);
			fillStyle('crimson');
			circ(R, R / 4, tw);
			restore();
		}
		rotate(Math.PI * tw);
		rect(
			R / 2 - R / 8,
			((-R * 0.5) / 2) * (1 - tw),
			R / 4,
			R * 1.5 * (1 - tw),
		);
		fillStyle('crimson');
		rotate(Math.PI);
		rect(R / 2 - R / 8, ((-R * 0.5) / 2) * tw, R / 4, R * 1.5 * tw);
		restore();
	}
};
