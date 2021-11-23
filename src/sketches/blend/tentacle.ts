import { System, Component } from '../../utils/ecs';
import {
	background,
	SketchData,
	strokeStyle,
	DebugLevel,
	random,
	sin,
	map,
	circle,
	PI,
	width,
} from '../../lib';

export const sketchData: SketchData = {
	name: 'Tattoo',
	debug: DebugLevel.NONE,
};

const steps = 10;
const size = 400;
const SPACING = 4;
const NUM_TENTACLES = 10;
const TWO_PI = PI * 2;

const Tentacle: Component<Tentacle> = {
	requirements: [],
};

class MySystem extends System {
	constructor() {
		super();
		for (let i = 0; i < NUM_TENTACLES; i++) {
			let x = width / 2 + random(-80, 80);
			let length = random(250, 400);
			this.createEntity().addComponent(Tentacle, {
				x: x,
				length: length,
				frequency: random(40, 100),
				amplitude: random(0.025, 0.225),
				phi: 0,
			});
		}
	}

	drawEach() {
		for (const tentacle of this.entities) {
			let { length, phi, amplitude, frequency, x } =
				tentacle.getProps(Tentacle);
			for (let y = -10; y < length; y += SPACING) {
				const offset = sin(y / frequency + phi) * (y * amplitude);
				const diameter = map(y, 0, length, 20, 4);
				circle(x + offset, y, diameter);
			}

			phi += 0.05;
			if (phi > TWO_PI) {
				phi -= TWO_PI;
			}

			tentacle.setProps(Tentacle, {
				length,
				phi,
				amplitude,
				frequency,
				x,
			});
		}
	}
}

const system = new MySystem();

interface Tentacle {
	x: number;
	length: number;
	frequency: number;
	amplitude: number;
	phi: number;
}

export const setup = () => {
	strokeStyle('white');
};

export const draw = () => {
	background('black');

	system.drawEach();
};
