import {
	SketchData,
	DebugLevel,
	background,
	loadImage,
	createGraphics,
	width,
	height,
	fill,
	quad,
	noise,
} from '../../lib';
//@ts-ignore
import image from '../../../public/girl.jpeg';
import { setSeed } from 'canvas-sketch-util/random';
import { parse, Color } from 'canvas-sketch-util/color';

const { sqrt, sin, cos } = Math;

setSeed('dot');

const sketchData: SketchData = {
	name: 'dotte',
	debug: DebugLevel.NONE,
};

let img: CanvasRenderingContext2D;

const preload = async () => {
	img = await loadImage(image);

	resize();
};

const resize = () => {
	const scaleFactor = 0.2;
	const { width, height } = img.canvas;
	const temp = createGraphics(width, height);

	temp.drawImage(
		img.canvas,
		0,
		0,
		width,
		height,
		0,
		0,
		width * scaleFactor,
		height * scaleFactor,
	);

	img = temp;
};

let pallete = ['rgb(23,48,57)', 'rgb(19,135,205)'];

let unit = 6;

let halfWidth = width / 2;
let halfHeight = height / 2;
let biggerHalf = Math.max(halfWidth, halfHeight);
let radius = 0.7;

let waveSpeed = 0.1;

const getWave = (x: number, y: number) => {
	waveSpeed = 0.1;

	let tickx = frameCount * waveSpeed + x;
	let ticky = (frameCount * waveSpeed + y) * 1;

	let funcx = sin(cos(tickx * 4)) * 0.1;
	return sin(ticky + funcx) * 2 - 1;
};

const renderPixel = (color: Color, x: number, y: number) => {
	let brightess = color.hsl[2] + getWave(x, y) * 3;
	let chances = noise(x, y) * 100;

	if (brightess < 20 && brightess < chances) {
		return;
	}

	let shift = 1;

	if (brightess < 40) {
		let sy = 1;
		let sx = 0.2;
		quad(
			x - unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y + unit * shift * sy,
			x - unit * shift * sx,
			y + unit * shift * sy,
		);
		fill(pallete[0]);
	} else if (brightess < 60) {
		fill(pallete[0]);
		let sy = 1;
		let sx = 0.6;
		quad(
			x - unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y + unit * shift * sy,
			x - unit * shift * sx,
			y + unit * shift * sy,
		);

		fill(pallete[1]);
		sy = 1;
		sx = 0.3;
		quad(
			x - unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y + unit * shift * sy,
			x - unit * shift * sx,
			y + unit * shift * sy,
		);
	} else if (brightess < 80) {
		// render smaller
		let sy = 1;
		let sx = 0.4;
		quad(
			x - unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y + unit * shift * sy,
			x - unit * shift * sx,
			y + unit * shift * sy,
		);
	} else {
		// Render as fill

		fill(pallete[1]);
		let sy = 1;
		let sx = 0.6;
		quad(
			x - unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y - unit * shift * sy,
			x + unit * shift * sx,
			y + unit * shift * sy,
			x - unit * shift * sx,
			y + unit * shift * sy,
		);
	}
};

const randomPixel = (x: number, y: number) => {
	let sideX = (halfWidth - x) / (biggerHalf * 0.6);
	let sideY = (halfHeight - y) / biggerHalf;

	let hypho = sqrt(sideX ** 2 + sideY ** 2);

	let noice = noise(x, y);

	return radius * noice > hypho;
};

let frameCount = 0;

const draw = () => {
	background(pallete[0]);

	// drawImage(img, 0, 0);

	for (let y = 0; y < height; y += unit) {
		for (let x = 0; x < width; x += unit) {
			// circle(x, y, 1);
			// fillStyle('gray');
			// fill();

			const [r, g, b, a] = img.getImageData(
				x - 300,
				y + 100,
				1,
				1,
			).data;
			const color = parse([r, g, b, a]);
			// const brightess = parse([r, g, b, a]).hsl[2];
			// if (brightess > 20) {
			// 	square(x, y, unit, unit);
			// 	fillStyle(color.hex);
			// 	fill();
			// }

			if (randomPixel(x, y)) {
				// fillStyle('white');
				// fillStyle(color.hex);
				// rectangle(x, y, unit, unit);
				// fill('blue');

				renderPixel(color, x, y);
			}
		}
	}

	frameCount += 1;
};

export default {
	sketchData,
	draw,
	preload,
};
