import { PolarVector } from './common';

interface PlainVector {
	x: number;
	y: number;
}

export class Vector {
	x: number;
	y: number;

	constructor(x: number, y = x) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return `x: ${this.x} y: ${this.y}`;
	}

	scale(magnitud: number) {
		return new Vector(this.x * magnitud, this.y * magnitud);
	}

	set(x: number, y = x) {
		this.x = x;
		this.y = y;
	}

	add(vec: Vector) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}

	addX(x: number) {
		this.x += x;
		return this;
	}

	subt(vec: Vector | number) {
		if (typeof vec === 'number') {
			this.x -= vec;
			this.y -= vec;
		} else {
			this.x -= vec.x;
			this.y -= vec.y;
		}
		return this;
	}

	subtX(x: number) {
		this.x -= x;
		return this;
	}

	mult(vec: Vector | number) {
		if (typeof vec === 'number') {
			this.x *= vec;
			this.y *= vec;
		} else {
			this.x *= vec.x;
			this.y *= vec.y;
		}
		return this;
	}

	div(vec: Vector | number) {
		if (typeof vec === 'number') {
			this.x /= vec;
			this.y /= vec;
		} else {
			this.x /= vec.x;
			this.y /= vec.y;
		}
		return this;
	}

	clone() {
		return Vector.new(this.x, this.y);
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
