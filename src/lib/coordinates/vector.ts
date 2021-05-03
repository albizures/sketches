import { PolarVector } from './common';

interface PlainVector {
	x: number;
	y: number;
}

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

	static zero(): Vector {
		return new Vector(0, 0);
	}

	static new(x: number, y: number) {
		return new Vector(x, y);
	}

	static obj({ y, x }: PlainVector) {
		return new Vector(x, y);
	}
}
