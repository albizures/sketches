import {
	width,
	height,
	save,
	translate,
	restore,
	rotate,
	lineTo,
	stroke,
	beginPath,
	strokeRect,
	line,
	background,
	noise,
} from '../lib';

const getValue = (x: number, y: number) => {
	const scale = 0.008;

	return noise(x * scale, y * scale) * Math.PI * 2;
};

export const setup = () => {
	// const res = 18;
	// for (let x = 0; x < width; x += res) {
	//   for (let y = 0; y < height; y += res) {
	//     const value = getValue(x, y);
	//     save();
	//     translate(x, y);
	//     rotate(value);
	//     line(0, 0, res * 1.5, 0);
	//     restore();
	//   }
	// }
};
const size = 5;
let offset = 0;

export const draw = () => {
	background('white');
	offset++;
	for (let x = 0; x < width; x += size) {
		const n = (noise((x + offset) * 0.01, 0) + 1) / 2;

		line(x, 0, x, height * n);
	}
};
