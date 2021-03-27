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
} from '../../lib';

const leaf = (width: number, height: number, bg: string) => {
	withDebug(() => {
		rect(-width / 2, 0, width, height);
		stroke();
	});

	const start = {
		x: 0,
		y: 0,
	};
	const control = {
		x: width,
		y: height / 2,
	};
	const end = {
		x: 0,
		y: height,
	};

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
	translate(0, 12);
	lineWidth(2);
	leaf(width * 0.8, height * 0.8, bg);
	restore();
};
