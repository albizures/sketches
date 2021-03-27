import {
	Vector,
	createGraphics,
	withContext,
	lineWidth,
	save,
	restore,
	strokeRect,
	strokeStyle,
	circle,
	translate,
	drawImage,
	fillRect,
	fillStyle,
} from '../../lib';

const circleCreateAttempts = 500;

export const circlePacking = (position: Vector, size: number) => {
	const context = createGraphics(size, size);
	const circles: Circle[] = [];
	let radius = 14;
	for (let i = 0; i < 200; i++) {
		for (let index = 0; index < circleCreateAttempts; index++) {
			if (index !== 0 && index % 100 === 0 && !(radius < 5)) {
				radius -= 1;
			}
			const circ = createCircle(size, radius);

			if (checkCircle(circ, circles)) {
				expandCircle(circ, circles, radius);
				circles.push(circ);
				break;
			}
		}
	}

	withContext(() => {
		lineWidth(3);
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

export const cube = (size: number, bg: string) => {
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

const checkCircle = (circle: Circle, circles: Circle[]): boolean => {
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
	maxRadius?: number,
) => {
	while (true) {
		if (circle.radius >= maxRadius) {
			break;
		}

		circle.radius += 1;
		if (!checkCircle(circle, circles)) {
			circle.radius = circle.radius - 3;
			break;
		}
	}
};
