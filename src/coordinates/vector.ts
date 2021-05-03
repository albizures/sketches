import { PolarVector } from './common';

export class Vector {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	scale(magnitud: number) {
		return new Vector(this.x * magnitud, this.y * magnitud);
	}

	static fromPolar(vector: PolarVector): Vector {
		let { r, angle } = vector;

		return new Vector(r * Math.cos(angle), r * Math.sin(angle));
	}
}
