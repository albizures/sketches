import {
	background,
	Vector,
	beginPath,
	moveTo,
	stroke,
	bezierCurveTo,
	rect,
	save,
	restore,
	translate,
	height,
	width,
	strokeStyle,
	lineWidth,
	rotate,
	scale,
	line,
	circle,
	fill,
	fillStyle,
	withContext,
	drawImage,
	PI,
	autoSave,
	lineTo,
	quadraticCurveTo,
	lineCap,
	strokeRect,
	fillRect,
	withDebug,
	SketchData,
	DebugLevel,
	createGraphics,
} from '../lib';

export const sketchData: SketchData = {
	name: 'Tattoo',
	debug: DebugLevel.NONE,
};

const bg = '#fdfbeb';

const drawQuadraticBezier = (
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

const drawBezier = (
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

const halfHeadLessMushroom = (height: number) => {
	const bottomWidth = height * 0.06;
	const topWidth = height * 0.5;

	drawBezier(
		{ x: bottomWidth / 2, y: 0 },
		{ x: bottomWidth / 2, y: height * 0.5 },
		{ x: topWidth / 2, y: height },
		{ x: 0, y: height },
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

const headlessMushroom = autoSave((height: number) => {
	rotate(PI);
	halfHeadLessMushroom(height);
	scale(-1, 1);
	halfHeadLessMushroom(height);
});

const circlePacking = (position: Vector, size: number) => {
	const context = createGraphics(size, size);
	const circles: Circle[] = [];
	let radius = 14;
	for (let i = 0; i < 200; i++) {
		for (let index = 0; index < circleCreateAttempts; index++) {
			if (index !== 0 && index % 100 === 0 && !(radius < 5)) {
				radius -= 1;
			}
			const circ = createCircle(size, radius);

			if (checkCircle(circ, circles, size)) {
				expandCircle(circ, circles, size, radius);
				circles.push(circ);
				break;
			}
		}
	}

	withContext(() => {
		lineWidth(4);

		for (let index = 0; index < circles.length; index++) {
			const circ = circles[index];
			circle(circ.x, circ.y, circ.radius);
		}
	}, context);

	save();
	translate(-size / 2, -size / 2);
	drawImage.v(context, position);
	restore();
};

const leaf = (width: number, height: number) => {
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

	drawQuadraticBezier(start, control, end);
	fillStyle(bg);
	fill();
	drawQuadraticBezier(start, control, end);
	scale(-1, 1);
	drawQuadraticBezier(start, control, end);
	fillStyle(bg);
	fill();
	drawQuadraticBezier(start, control, end);
};

const prettyLeaf = (width: number, height: number) => {
	save();
	lineWidth(4);
	leaf(width, height);
	translate(0, 12);
	lineWidth(2);
	leaf(width * 0.8, height * 0.8);
	restore();
};

const onionDome = (center: Vector, width: number, height: number) => {
	save();
	const sideWidth = width / 2;
	translate(center.x, center.y);
	scale(-1, 1);
	const start = { x: sideWidth * 0.96, y: 0 };
	const end = { x: 0, y: height };
	const control1 = { x: sideWidth, y: height * 0.78 };
	const control2 = { x: sideWidth * 0.36, y: height * 0.54 };
	drawBezier(start, control1, control2, end);

	scale(-1, 1);

	drawBezier(start, control1, control2, end);

	restore();
};

const doubleOnionDome = (size: number) => {
	save();
	lineWidth(4);

	const height = size / 2;
	const width = size * 0.9;

	onionDome(
		{
			x: 0,
			y: height,
		},
		width,
		height,
	);

	lineWidth(1);
	onionDome(
		{
			x: 0,
			y: height,
		},
		width * 0.8,
		height * 0.8,
	);

	withDebug(() => {
		rect(-size / 2, size / 2, size, height);
	});

	stroke();
	restore();
};

const cube = (size: number) => {
	save();
	strokeStyle('black');
	fillStyle(bg);
	fillRect(0 - size / 2, 0 - size / 2, size, size);
	strokeRect(0 - size / 2, 0 - size / 2, size, size);
	restore();
};

interface Circle {
	x: number;
	y: number;
	radius: number;
}

const createCircle = (size: number, radius?: number): Circle => {
	return {
		x: Math.floor(Math.random() * size),
		y: Math.floor(Math.random() * size),
		radius: radius ?? 2,
	};
};

const checkCircle = (
	circle: Circle,
	circles: Circle[],
	size: number,
): boolean => {
	for (let index = 0; index < circles.length; index++) {
		const otherCircle = circles[index];
		const a = circle.radius + otherCircle.radius;
		const x = circle.x - otherCircle.x;
		const y = circle.y - otherCircle.y;

		if (a >= Math.sqrt(x * x + y * y)) {
			return false;
		}
	}

	return true;
};

const expandCircle = (
	circle: Circle,
	circles: Circle[],
	size: number,
	maxRadius?: number,
) => {
	while (true) {
		if (circle.radius >= maxRadius) {
			break;
		}

		circle.radius += 1;
		if (!checkCircle(circle, circles, size)) {
			circle.radius = circle.radius - 3;
			break;
		}
	}
};

const circleCreateAttempts = 500;

const packOfMushroom = (size: number) => {
	const shift = 24;
	save();
	translate(0, -100);
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

export const final = () => {
	const rectSize = 200;

	const lineStart = (rectSize * 0.6) / 2;
	const lineEnd = (rectSize * 0.8) / 2;

	cube(rectSize);
	cube(rectSize * 0.8);

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
		prettyLeaf(60, 120);
		restore();
	}
	restore();

	cube(rectSize * 0.5);
	cube(rectSize * 0.6);

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
