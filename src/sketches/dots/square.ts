// a remake of https://www.instagram.com/p/COAAI4InQeS
import {
	System,
	Component,
	Position,
	FillStyle,
} from '../../utils/ecs';
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

enum DirectionType {
	DOWN = 'red',
	UP = 'blue',
	LEFT = 'yellow',
	RIGHT = 'green',
}

type MaybeDirection = DirectionType | undefined;

let Direction: Component<MaybeDirection> = {
	requirements: [],
};

let Radius: Component<number> = {
	requirements: [],
};

let system = new System()
	.registerComponent(Direction)
	.registerComponent(Radius);

export const sketchData: SketchData = {
	name: 'Conveyor',
	debug: DebugLevel.NONE,
};

let margin = 20;
let size = 21;

const getDirection = (x: number, y: number) => {
	let half = Math.floor(size / 2);

	if (
		y < half &&
		((x < half && x + 1 > Math.ceil(y)) ||
			(x >= half && x + y + 1 < size))
	) {
		return DirectionType.RIGHT;
	}

	if (
		x > half &&
		((y <= half && x + y >= size - 1) || (y > half && x > y))
	) {
		return DirectionType.DOWN;
	}

	if (
		y > half &&
		((x >= half && x < y + 1) ||
			(x < half && Math.ceil(x) + y >= size))
	) {
		return DirectionType.LEFT;
	}

	if (
		x < half &&
		((y >= half && x + y < size) || (y < half && x < y))
	) {
		return DirectionType.UP;
	}
};

export const setup = () => {
	background('black');
	let gridSize = margin * size;
	translate(width / 2 - gridSize / 2, height / 2 - gridSize / 2);

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			system
				.createEntity()
				.addComponent(Position, {
					x,
					y,
				})
				.addComponent(FillStyle, 'white')
				.addComponent(Direction, getDirection(x, y))
				.addComponent(Radius, 1);
		}
	}
};

let speed = 0.01;
export const draw = () => {
	background('black');
	let gridSize = margin * size;
	translate(width / 2 - gridSize / 2, height / 2 - gridSize / 2);

	for (let entity of system.entities) {
		let pos = entity.getProps(Position);
		let direction = entity.getProps(Direction);
		let radius = entity.getProps(Radius);

		if (direction === DirectionType.RIGHT) {
			pos.x += speed;
		}
		if (direction === DirectionType.DOWN) {
			pos.y += +speed;
		}
		if (direction === DirectionType.LEFT) {
			pos.x -= speed;
		}
		if (direction === DirectionType.UP) {
			pos.y -= speed;
		}

		entity.setProps(Direction, getDirection(pos.x, pos.y));

		fillStyle('white');
		circle(pos.x * margin, pos.y * margin, radius);
		fill();
	}
};
