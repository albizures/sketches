import {
	background,
	beginPath,
	closePath,
	lineCap,
	lineTo,
	lineWidth,
	map,
	PI,
	restore,
	rotate,
	save,
	sin,
	stroke,
	strokeStyle,
	TAU,
	translate,
} from '../../lib';

export const setup = () => {
	lineCap('square');
	lineWidth(3);
};

const size = 20;
const spacing = 19;

let delta = 0;

function corner(r: number) {
	beginPath();
	moveTo(0, 0);
	lineTo(size, size);
	lineTo(size, 0);

	lineTo(0, 0);
	stroke();
	closePath();
}

export const draw = () => {
	background('black');

	strokeStyle('white');
	translate(50, 50);

	for (let x = 0; x < 10; x++) {
		for (let y = 0; y < 10; y++) {
			save();
			translate(x * (10 + spacing), y * (10 + spacing));
			let r = sin(map(x + y, 0, 20, 0, PI) + delta);
			strokeStyle(
				`rgb(${r * 255}, ${255 - r * 255}, ${((x + y) / 20) * 255})`,
			);
			rotate(r * PI);
			corner(r);
			restore();
		}
	}

	delta += 0.01;
};
