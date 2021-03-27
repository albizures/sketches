import { center, mouse, width, fill } from '../lib/sketch';
import { translate, circle, background } from '../lib';
import { text, textSize } from '../lib/text';
import { cos, PI, map, polarToCartesian } from '../lib/math';

interface PolarCircle {
	angle: number;
	position: number;
	radius: number;
}

interface RangeConfig {
	start?: number;
	end: number;
}

type RangeRun = (index: number) => void;

const range = (config: RangeConfig) => {
	const { start = 0, end } = config;
	return (run: RangeRun) => {
		for (let index = start; index < end; index++) {
			run(index);
		}
	};
};

const dots: PolarCircle[] = [];

const basePosition = 100;

range({ end: ((2 * PI * basePosition) / 40) * 5 })((index) => {
	dots.push({
		angle: index,
		position: basePosition,
		radius: 2,
	});
});

export const draw = () => {
	background('white');
	textSize(30);
	const modifier = map(mouse.x, 0, width, 0, 100);
	text(modifier, { y: 30, x: 10 });
	translate.v(center);

	circle.v(polarToCartesian(0, 0), basePosition);

	for (let index = 0; index < dots.length; index++) {
		const dot = dots[index];
		const position = polarToCartesian(dot.angle, dot.position);

		circle.v(position, dot.radius);
		fill();
		const isEven = index % 2 == 0;
		dot.angle += 0.02;
		dot.position =
			basePosition +
			(isEven ? 1 : -1) * cos(dot.angle * 4 + dot.angle) * 40;
	}
};
