import {
	SketchData,
	DebugLevel,
	background,
	bezierCurveTo,
	center,
	lineWidth,
	strokeStyle,
	stroke,
	beginPath,
	endShape,
} from '../../lib';

const sketchData: SketchData = {
	name: 'name',
	debug: DebugLevel.NONE,
};

const setup = () => {};

let step = 0;
let speed = 0.01;
let target = -100;

function easeOutQuart(x: number): number {
	return 1 - Math.pow(1 - x, 4);
}

const draw = () => {
	background('black');
	center();

	strokeStyle('white');
	lineWidth(10);
	beginPath();
	moveTo(step, 0);

	const position = easeOutQuart(step) * target;
	console.log(position);

	bezierCurveTo(0, 0, -position, -150, 0, -300);
	stroke();
	endShape();

	step += speed;

	if (step >= 1) {
		step = 0;
		target = -target;
	}
};

export default {
	sketchData,
	setup,
	draw,
};
