import {
	Vector,
	stroke,
	drawBezier,
	save,
	translate,
	restore,
	lineWidth,
	withDebug,
	rect,
	mirror,
	circle,
	fill,
} from '../../lib';

export const onionDome = (
	center: Vector,
	width: number,
	height: number,
) => {
	save();
	const sideWidth = width / 2;
	translate(center.x, center.y);

	const start = { x: sideWidth * 0.96, y: 0 };
	const end = { x: 0, y: height };
	const control1 = { x: sideWidth, y: height * 0.78 };
	const control2 = { x: sideWidth * 0.36, y: height * 0.54 };

	mirror(() => drawBezier(start, control1, control2, end));

	restore();
};

export const doubleOnionDome = (size: number) => {
	save();
	lineWidth(4);

	const height = (size / 2) * 0.8;
	const width = size * 0.7;

	translate(0, size / 2);
	onionDome(
		{
			x: 0,
			y: 0,
		},
		width,
		height,
	);

	lineWidth(1);
	onionDome(
		{
			x: 0,
			y: 0,
		},
		width * 0.8,
		height * 0.8,
	);

	withDebug(() => {
		rect(-size / 2, 10, size, height);
	});

	stroke();
	restore();
};
