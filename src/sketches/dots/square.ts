// a remake of https://www.instagram.com/p/COAAI4InQeS

import {
	background,
	circle,
	DebugLevel,
	fill,
	fillStyle,
	height,
	SketchData,
	translate,
	width,
} from '../../lib';

export const sketchData: SketchData = {
	name: 'Tattoo',
	debug: DebugLevel.NONE,
};

interface Vector {
	x: number;
	y: number;
}

enum Direction {
	DOWN = 'red',
	UP = 'blue',
	LEFT = 'yellow',
	RIGHT = 'green',
}

interface Dot {
	pos: Vector;
	radius: number;
	color: string;
	direction: Direction | undefined;
}

const createDot = (
	pos: Vector,
	direction?: Direction,
	radius = 1,
	color = 'white',
): Dot => {
	return {
		pos,
		radius,
		color,
		direction,
	};
};

let dots: Dot[][] = [];
let margin = 20;
let size = 21;

const getDirection = (x: number, y: number) => {
	let half = Math.floor(size / 2);

	if (
		y < half &&
		((x < half && x + 1 > Math.ceil(y)) ||
			(x >= half && x + y + 1 < size))
	) {
		return Direction.RIGHT;
	}

	if (
		x > half &&
		((y <= half && x + y >= size - 1) || (y > half && x > y))
	) {
		return Direction.DOWN;
	}

	if (
		y > half &&
		((x >= half && x < y + 1) ||
			(x < half && Math.ceil(x) + y >= size))
	) {
		return Direction.LEFT;
	}

	if (
		x < half &&
		((y >= half && x + y < size) || (y < half && x < y))
	) {
		return Direction.UP;
	}
};

export const setup = () => {
	background('black');
	let gridSize = margin * size;
	translate(width / 2 - gridSize / 2, height / 2 - gridSize / 2);

	for (let y = 0; y < size; y++) {
		let row: Dot[] = [];
		for (let x = 0; x < size; x++) {
			const pos = {
				x,
				y,
			};

			let direction = getDirection(x, y);

			const dot = createDot(pos, direction, 1, direction);

			row.push(dot);
		}

		dots.push(row);
	}
};

let shift = 1;
let speed = 0.01;
export const draw = () => {
	background('black');
	let gridSize = margin * size;
	translate(width / 2 - gridSize / 2, height / 2 - gridSize / 2);

	for (let y = 0; y < dots.length; y++) {
		let row = dots[y];
		for (let x = 0; x < row.length; x++) {
			let dot = row[x];

			if (dot.direction === Direction.RIGHT) {
				dot.pos.x += speed;
			}
			if (dot.direction === Direction.DOWN) {
				dot.pos.y += +speed;
			}
			if (dot.direction === Direction.LEFT) {
				dot.pos.x -= speed;
			}
			if (dot.direction === Direction.UP) {
				dot.pos.y -= speed;
			}

			dot.direction = getDirection(dot.pos.x, dot.pos.y);

			fillStyle('white');
			circle(dot.pos.x * margin, dot.pos.y * margin, dot.radius);
			fill();
		}
	}
};
