import { angleMode, AngleMode, abs, sin, cos } from '../lib/math';
import {
	width,
	height,
	noFill,
	CLOSE,
	strokeStyle,
	vertex,
	endShape,
} from '../lib/sketch';
import { background, translate } from '../lib';
import { color } from '../lib/color';
let noiseMax = 1;
let zoff = 0;

let ca: string, cb: string;

let ox: number, oy: number;

let MAX: number;

function setup() {
	angleMode(AngleMode.DEGREES);

	ca = color('#0CCBCFAA');
	cb = color('#FE68B5AA');

	ox = width / 2;
	oy = height;

	MAX = width > height ? width : height;

	noFill();
	background('#E7ECF2');
}

function draw() {
	// background("#E7ECF2");
	// stroke(lerpColor(ca, cb, abs(sin(zoff * 100))));
	// push();
	// translate({ x: ox, y: oy });
	// beginShape();
	// for (let t = 0; t < 360; t++) {
	//   let xoff = map(cos(t), -1, 1, 0, noiseMax);
	//   let yoff = map(sin(t), -1, 1, 0, noiseMax);
	//   let n = noise(xoff, yoff, zoff);
	//   let r = map(n, 0, 1, 0, height * 1.5);
	//   let x = r * cos(t);
	//   let y = r * sin(t);
	//   // let c = lerpColor(ca, cb, n);
	//   vertex({ x, y });
	// }
	// endShape(CLOSE);
	// zoff += 0.005;
}
