import { Position } from '../components';
import { System, Component, Entity } from '../utils/ecs';
import {
	SketchData,
	DebugLevel,
	Vector,
	width,
	height,
	background,
	circle,
	fillMode,
	fillStyle,
} from '../lib';

export const sketchData: SketchData = {
	name: 'following',
	debug: DebugLevel.NONE,
};

// TODO add a bounce effect
// TODO add a offset limit

const system = new System();

const End: Component = {
	requirements: [],
};

interface HeadProps {}

const Head: Component<HeadProps> = { requirements: [] };

interface TailProps {
	prev: Entity;
	maxDist: number;
	index: number;
}

const Tail: Component<TailProps> = {
	requirements: [],
};

const Velocity: Component<Vector> = {
	requirements: [],
};

const sizeTail = 10;

export const setup = () => {
	const head = system
		.createEntity()
		.addComponent(Head, {
			history: [],
		})
		.addComponent(Position, new Vector(width / 2, height / 2))
		.addComponent(Velocity, new Vector(10, 0));

	let prev = head;
	let preMaxDist = 100;

	for (let index = 0; index < sizeTail; index++) {
		preMaxDist = preMaxDist * 0.4;
		prev = system
			.createEntity()
			.addComponent(Tail, { prev, index, maxDist: preMaxDist })
			.addComponent(Position, new Vector(width / 2, height / 2));
	}

	preMaxDist = preMaxDist * 0.4;
	system
		.createEntity()
		.addComponent(End, null)
		.addComponent(Tail, {
			prev,
			index: sizeTail,
			maxDist: preMaxDist,
		})
		.addComponent(Position, new Vector(width / 2, height / 2));

	fillMode(fillMode.FILL);
};

export const draw = () => {
	background('black');

	fillStyle('blue');
	let part = system.query([End]).next().value;

	while (part) {
		const { prev, index, maxDist } = part.getProps(Tail);
		const position = part.getProps(Position);
		const prevPosition = prev.getProps(Position);

		circle.v(position, 10 - index);
		part.setProps(Position, prevPosition.clone());
		if (prev.hasComponent(Tail)) {
			part = prev;
		} else {
			part = undefined;
		}
	}

	fillStyle('red');
	for (const particle of system.query([Head])) {
		const pos = particle.getProps(Position);
		const vel = particle.getProps(Velocity);

		circle.v(pos, 10);
		pos.addX(vel.x);

		if (pos.x + 10 > width) {
			pos.x = 0;
		}

		if (vel.x < 0) {
			vel.set(10, vel.y);
		}

		particle.setProps(Velocity, vel.subtX(0.1));
	}
};
