import {
	SketchData,
	DebugLevel,
	background,
	circle,
	fillStyle,
	fill,
	center,
	text,
	width,
	height,
	PI,
} from '../../lib';
import { mapRange } from 'canvas-sketch-util/math';
import { System } from '../../utils/ecs';
import {
	PolarPosition,
	Radius,
	FillStyle,
	PolarVelocity,
} from '../../components';
import { PolarVector, Vector } from '../../coordinates';

export let sketchData: SketchData = {
	name: 'Polar Grid',
	debug: DebugLevel.NONE,
};

const { pow, sin } = Math;

let system = new System();

let size = 20;
let midSize = size / 2;
let margin = 20;
let speed = 0.002;
let radius = 0;

export let setup = () => {
	background('black');

	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			let pos = new Vector(x - midSize, y - midSize);
			let polarPos = PolarVector.fromCartesian(pos);
			let currentSpeed = 0.001 * polarPos.r;
			system
				.createEntity()
				.addComponent(Radius, 2)
				.addComponent(FillStyle, 'white')
				.addComponent(PolarVelocity, new PolarVector(0, currentSpeed))
				.addComponent(PolarPosition, polarPos);

			speed = Math.max(currentSpeed, speed);
			radius = Math.max(radius, polarPos.r);
		}
	}

	for (let dot of system.query([PolarPosition])) {
		const pos = dot.getProps(PolarPosition);
		const vel = dot.getProps(PolarVelocity);
		pos.angle += vel.angle * (-PI / speed);
	}
};

function easeInOutElastic(x: number): number {
	const c5 = (2 * Math.PI) / 4.5;

	return x === 0
		? 0
		: x === 1
		? 1
		: x < 0.5
		? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
		: (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
}

let rotation = 0;
let direction = 1;

export let draw = () => {
	background('black');
	center();

	circle(0, 0, midSize);

	let something =
		easeInOutElastic(mapRange(rotation, -PI, PI, 0, 1)) * direction;

	for (let dot of system.query([PolarPosition])) {
		let pos = dot.getProps(PolarPosition);
		let vel = dot.getProps(PolarVelocity);
		let vec = Vector.fromPolar(pos);
		let radius = dot.getProps(Radius);
		let color = dot.getProps(FillStyle);

		circle.v(vec.scale(margin), radius);
		fillStyle(color);
		fill();

		pos.angle += vel.angle * something;
	}

	rotation += speed * direction;

	// text(`rotation=${rotation}`, -width / 2 + 100, -height / 2 + 100);
	// text(`something=${something}`, -width / 2 + 100, -height / 2 + 130);
	// text(`direction=${direction}`, -width / 2 + 100, -height / 2 + 160);

	if (rotation > PI * 2 || rotation < 0) {
		direction = -direction;
	}
};
