import { settings, FillMode, StrokeMode } from '../settings';
import { context, arc, Vector } from '../../lib';
import { fill } from '../sketch';

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

export const circle = (x: number, y: number, radius: number) => {
	beginShape();
	arc(x, y, radius, 0, 2 * Math.PI);
	endShape();
};

circle.v = (vector: Vector, radius: number) => {
	circle(vector.x, vector.y, radius);
};
