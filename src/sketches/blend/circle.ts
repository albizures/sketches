import {
	background,
	SketchData,
	strokeStyle,
	center,
	DebugLevel,
	noise,
	beginPath,
	moveTo,
	endShape,
	lineTo,
	stroke,
	globalCompositeOperation,
	lineWidth,
	rotate,
	TAU,
	circle,
	translate,
	sin,
	Vector,
	cos,
} from '../../lib';
import { Position, Radius } from '../../components';
import { System, Component } from '../../utils/ecs';

export const sketchData: SketchData = {
	name: 'Tattoo',
	debug: DebugLevel.NONE,
};

const Color: Component<string> = {
	requirements: [],
};
const Speed: Component<number> = {
	requirements: [],
};
const Acceleration: Component<number> = {
	requirements: [],
};

const system = new System();

export const setup = () => {
	globalCompositeOperation('lighter');

	system
		.createEntity()
		.addComponent(Position, new Vector(0, 0))
		.addComponent(Color, 'red')
		.addComponent(Speed, 0)
		.addComponent(Acceleration, 0.2)
		.addComponent(Radius, 100);
	system
		.createEntity()
		.addComponent(Position, new Vector(0, 0))
		.addComponent(Color, 'blue')
		.addComponent(Speed, 0)
		.addComponent(Acceleration, 0.5)
		.addComponent(Radius, 100);
	system
		.createEntity()
		.addComponent(Position, new Vector(0, 0))
		.addComponent(Color, 'green')
		.addComponent(Speed, 0)
		.addComponent(Acceleration, 0.7)
		.addComponent(Radius, 100);
};

let diff = 1;
export const draw = () => {
	background('black');
	center();

	lineWidth(10);

	for (const item of system.entities) {
		const { x, y } = item.getProps(Position);
		const acceleration = item.getProps(Acceleration);
		const radius = item.getProps(Radius) + acceleration;
		const color = item.getProps(Color);

		strokeStyle(color);
		circle(x, y, radius);
		item.setProps(Radius, radius);
		item.setProps(Acceleration, sin(acceleration + diff));
	}

	diff += 0.05;
};
