import {
	beginPath,
	moveTo,
	stroke,
	bezierCurveTo,
	save,
	restore,
	strokeStyle,
	fill,
	fillStyle,
	quadraticCurveTo,
	withDebug,
} from '../lib';
import { settings, FillMode, StrokeMode, RectMode } from './settings';
import { context } from './context';
import { Vector } from '../lib/coordinates';
import { closePath, lineTo, arc } from './sketch';

// TODO: move this variable to settings
export const CLOSE = 'CLOSE';

export const beginShape = () => {
	context.beginPath();
};

export const endShape = (close?: string) => {
	if (close === CLOSE) {
		context.closePath();
	}

	if (settings.strokeMode === StrokeMode.STROKE) {
		context.stroke();
	}

	if (settings.fillMode === FillMode.FILL) {
		fill();
	}
};

export const drawQuadraticBezier = (
	start: Vector,
	control: Vector,
	end: Vector,
) => {
	save();

	beginPath();
	moveTo(start.x, start.y);
	quadraticCurveTo(control.x, control.y, end.x, end.y);
	stroke();

	withDebug(() => {
		fillStyle('blue');
		strokeStyle('blue');
		circle.v(control, 4);
		fill();
	});

	restore();
};

export const drawBezier = (
	start: Vector,
	control1: Vector,
	control2: Vector,
	end: Vector,
) => {
	save();

	beginPath();
	moveTo(start.x, start.y);
	bezierCurveTo(
		control1.x,
		control1.y,
		control2.x,
		control2.y,
		end.x,
		end.y,
	);
	stroke();

	withDebug(() => {
		fillStyle('red');
		strokeStyle('red');
		circle.v(control1, 4);
		fill();

		strokeStyle('green');
		fillStyle('green');
		circle.v(control2, 4);
		fill();
	});

	restore();
};

export const quad = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	x3: number,
	y3: number,
	x4: number,
	y4: number,
) => {
	beginPath();
	moveTo(x1, y1);
	lineTo(x2, y2);
	lineTo(x3, y3);
	lineTo(x4, y4);
	closePath();
};

export const rectangle = (
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	quad(x, y, x + width, y, x + width, y + height, x, y + height);
};

export const circle = (x: number, y: number, radius: number) => {
	beginShape();
	arc(x, y, radius, 0, 2 * Math.PI);
	endShape();
};

circle.v = (vector: Vector, radius: number) => {
	circle(vector.x, vector.y, radius);
};

export const rect = (
	x: number,
	y: number,
	width: number,
	height: number,
) => {
	context.beginPath();
	if (RectMode.CORNER === settings.rectMode) {
		context.rect(x, y, width, height);
	} else if (RectMode.CENTER === settings.rectMode) {
		const halfWidth = width / 2;
		const halfHeight = height / 2;
		context.rect(x - halfWidth, y - halfHeight, width, height);
	}
	context.fill();
	context.closePath();
};

rect.v = (anchor: Vector, width: number, height: number) => {
	context.rect(anchor.x, anchor.y, width, height);
};

export const line = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
) => {
	beginPath();
	moveTo(x1, y1);
	lineTo(x2, y2);
	closePath();
	stroke();
};

line.v = (start: Vector, end: Vector) => {
	line(start.x, start.y, end.x, end.y);
};
