import {
	background,
	Vector,
	beginPath,
	moveTo,
	stroke,
	bezierCurveTo,
	rect,
	save,
	restore,
	translate,
	height,
	width,
	strokeStyle,
	lineWidth,
	rotate,
	scale,
	line,
	circle,
	fill,
	fillStyle,
} from '../lib';

interface Line {
	position: number;
	anchor: number;
	vertical: boolean;
}

const lines: Line[] = [];

const size = 20;

export const setup = () => {
	for (let index = 0; index < width; index += size) {
		lines.push({
			position: index,
			anchor: index,
			vertical: true,
		});
	}
	for (let index = 0; index < height; index += size) {
		lines.push({
			position: index,
			anchor: index,
			vertical: false,
		});
	}

	// lineWidth(0.5);
	for (let index = 0; index < lines.length; index++) {
		const current = lines[index];
		if (current.vertical) {
			line(current.position, 0, current.position, height);
		} else {
			line(0, current.position, width, current.position);
		}

		circle(current.position, current.position, 10);
	}
};

export const draw = () => {};
