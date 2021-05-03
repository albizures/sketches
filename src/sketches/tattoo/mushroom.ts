import {
	beginPath,
	moveTo,
	stroke,
	rotate,
	fill,
	PI,
	autoSave,
	lineTo,
	drawBezier,
	translate,
	save,
	restore,
	mirror,
	scale,
	Vector,
} from '../../lib';

export const halfHeadLessMushroom = (height: number) => {
	const bottomWidth = height * 0.06;
	const topWidth = height * 0.5;

	drawBezier(
		Vector.new(bottomWidth / 2, 0),
		Vector.new(bottomWidth / 2, height * 0.5),
		Vector.new(topWidth / 2, height),
		Vector.new(0, height),
	);
	fill();
	beginPath();
	moveTo(0, height);
	lineTo(0, 0);
	lineTo(bottomWidth / 2, 0);
	stroke();
	fill();
	stroke();
};

export const headlessMushroom = autoSave((height: number) => {
	rotate(PI);
	mirror(() => halfHeadLessMushroom(height));
});

export const packOfMushroom = (size: number) => {
	const shift = size / 10;
	save();
	translate(0, -size / 2);
	scale(0.8, 0.8);
	save();
	headlessMushroom(size * 0.3);
	translate(shift, 0);
	headlessMushroom(size * 0.2);
	translate(shift, 0);
	headlessMushroom(size * 0.15);
	restore();
	translate(-shift, 0);
	headlessMushroom(size * 0.2);
	translate(-shift, 0);
	headlessMushroom(size * 0.15);

	restore();
};
