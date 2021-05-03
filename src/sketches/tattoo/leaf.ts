import {
	stroke,
	rect,
	save,
	restore,
	translate,
	lineWidth,
	fill,
	fillStyle,
	withDebug,
	drawQuadraticBezier,
	mirror,
	rotate,
	remap,
	circle,
	strokeStyle,
	Vector,
} from '../../lib';
// @ts-ignore
import { Bezier } from 'bezier-js';

const leaf = (width: number, height: number, bg: string) => {
	withDebug(() => {
		rect(-width / 2, 0, width, height);
		stroke();
	});

	const start = Vector.zero();
	const control = Vector.new(width, height);
	const end = Vector.new(0, height);

	mirror(() => {
		drawQuadraticBezier(start, control, end);
		fillStyle(bg);
		fill();
		drawQuadraticBezier(start, control, end);
	});
};

export const prettyLeaf = (
	width: number,
	height: number,
	bg: string,
) => {
	save();
	lineWidth(4);
	leaf(width, height, bg);
	translate(0, height / 10);
	lineWidth(2);
	leaf(width * 0.82, height * 0.82, bg);

	const scaleFactor = 0.6;
	const dotArea = height * scaleFactor;

	lineWidth(1);
	rotate(Math.PI / 2);
	translate((height * scaleFactor) / 6, -2);
	const curve = new Bezier(0, 0, dotArea / 2, dotArea / 2, height, 0);
	const dotFrequency = 5;
	for (let x = 0; x < height; x += dotFrequency) {
		const size = curve.get(remap(x, 0, dotArea, 0, 1)).y;

		for (let y = -size; y < size; y += dotFrequency) {
			const radius = 1 - remap(Math.abs(y), 0, size, 0, 100) / 100;
			save();

			fillStyle(`rgba(0, 0, 0, ${radius})`);
			strokeStyle(`rgba(0, 0, 0, ${radius})`);
			const diff = Math.random() * 5;
			const direction = Math.random() > 0.5 ? -1 : 1;
			circle(x + diff * direction, y + diff, radius + diff / 6);
			fill();

			restore();
		}
	}

	restore();
};
