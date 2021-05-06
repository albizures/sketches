import { context } from '../lib';
import { Vector } from './coordinates';

export const CLOSE = 'CLOSE';

export let fills = true;
export let { innerWidth: width, innerHeight: height } = window;
export let mouse: Vector = new Vector(0, 0);

window.addEventListener('mousemove', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

export const center: Vector = new Vector(width / 2, height / 2);

export const noFill = () => {};

export const fill = (value?: string) => {
	value && fillStyle(value);
	context.fill();
};

export const save = () => {
	context.save();
};

export const restore = () => {
	context.restore();
};

export const strokeStyle = (style: string) => {
	context.strokeStyle = style;
};

export const lineWidth = (width: number) => {
	context.lineWidth = width;
};

export const beginPath = () => {
	context.beginPath();
};

export const arc = (
	x: number,
	y: number,
	radius: number,
	startAngle: number,
	endAngle: number,
	anticlockwise?: boolean | undefined,
) => {
	context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
};

export const stroke = () => {
	context.stroke();
};

export const moveTo = (x: number, y: number) => {
	context.moveTo(x, y);
};

export const lineTo = (x: number, y: number) => {
	context.lineTo(x, y);
};

export const closePath = () => {
	context.closePath();
};

export const endShape = (close?: string) => {
	if (close === CLOSE) {
		context.closePath();
	}
	context.stroke();
};

export const vertex = (point: Vector) => {
	context.lineTo(point.x, point.y);
};

export const fillRect = (
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	context.fillRect(x, y, width, height);
};

export const strokeRect = (
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	context.strokeRect(x, y, width, height);
};

export const lineCap = (cap: CanvasLineCap) => {
	context.lineCap = cap;
};

export const quadraticCurveTo = (
	controlX: number,
	controlY: number,
	endX: number,
	endY: number,
) => {
	context.quadraticCurveTo(controlX, controlY, endX, endY);
};

export const bezierCurveTo = (
	control1X: number,
	control1Y: number,
	control2X: number,
	control2Y: number,
	endX: number,
	endY: number,
) => {
	context.bezierCurveTo(
		control1X,
		control1Y,
		control2X,
		control2Y,
		endX,
		endY,
	);
};

export const fillStyle = (style: string) => {
	context.fillStyle = style;
};

export const rotate = (angle: number) => {
	context.rotate(angle);
};
