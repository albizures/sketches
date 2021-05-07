import { System, Component, Not, Entity } from '../utils/ecs';
import {
	background,
	beginPath,
	closePath,
	lineTo,
	PI,
	restore,
	rotate,
	save,
	SketchData,
	stroke,
	strokeStyle,
	translate,
	Vector,
	center,
} from '../lib';
import { Position } from '../components';

interface HexagonProps {
	radius: number;
}

const Hexagon: Component<HexagonProps> = {
	requirements: [Position],
};

interface State {
	inRadius: number;
	expantion: number;
	rotation: number;
	expantionSpeed: number;
	rotationSpeed: number;
}

const MainHexagon: Component<State> = {
	requirements: [Hexagon],
};

const system = new System();

const sketchData: SketchData = {
	name: 'Hex',
};

const setup = () => {
	let radius = 50;
	let expantionSpeed = 0.1;
	let inRadius = Math.sqrt(3) * (radius / 2) - 7;
	let rotationSpeed = PI / 2 / (inRadius / expantionSpeed);

	system
		.createEntity()
		.addComponent(Position, new Vector(0, 0))
		.addComponent(Hexagon, { radius })
		.addComponent(MainHexagon, {
			inRadius,
			expantion: 0,
			rotation: 0,
			expantionSpeed,
			rotationSpeed,
		});

	for (let index = 0; index < 6; index++) {
		system
			.createEntity()
			.addComponent(Position, new Vector(0, 0))
			.addComponent(Hexagon, { radius });
	}
};

const MainQuery = [MainHexagon];
const HexQuery = [Hexagon, Not(MainHexagon)];

const drawHexagon = (hex: Entity) => {
	const { radius } = hex.getProps(Hexagon);
	const pos = hex.getProps(Position);
	save();
	translate.v(pos);
	beginPath();
	moveTo(radius, 0);
	for (let index = 0; index < 6; index++) {
		rotate(PI / 3);
		lineTo(radius, 0);
	}
	closePath();
	strokeStyle('white');
	stroke();
	restore();
};

const draw = () => {
	background('black');
	center();

	strokeStyle('white');

	const mainHex = system.query(MainQuery).next().value;

	if (!mainHex) {
		return;
	}

	const pos = mainHex.getProps(Position);
	const { radius } = mainHex.getProps(Hexagon);
	const status = mainHex.getProps(MainHexagon);
	translate.v(pos);
	save();
	rotate(PI / 2 + status.rotation);
	for (const hex of system.query(HexQuery)) {
		rotate(PI / 3);
		save();
		translate(radius + status.expantion, 0);
		rotate(-status.rotation);
		drawHexagon(hex);
		restore();
	}

	restore();

	status.rotation += status.rotationSpeed;
	status.expantion += status.expantionSpeed;

	if (status.expantion > status.inRadius || status.expantion < 0) {
		status.expantion -= status.expantionSpeed;

		status.expantionSpeed = -status.expantionSpeed;
	}
};

export default {
	sketchData,
	setup,
	draw,
};
