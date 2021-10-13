import { Vector } from './coordinates';
import { context } from '../lib';

export const text = (str: unknown, x: number, y: number) => {
	context.fillText(String(str), x, y);
};

text.v = (str: unknown, position: Vector) => {
	text(str, position.x, position.y);
};

export const textSize = (size: number) => {
	context.font = `${size}px serif`;
};
