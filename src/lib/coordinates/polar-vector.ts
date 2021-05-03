import { Vector } from './common';

export class PolarVector {
	r: number;
	angle: number;

	constructor(r: number, angle: number) {
		this.r = r;
		this.angle = angle;
	}

	rotate(delta: number) {
		this.angle += delta;
	}

	static fromCartesian(vector: Vector): PolarVector {
		let { x, y } = vector;

		if (x === 0 && y === 0) {
			return new PolarVector(0, 0);
		}

		let fix = 0;

		if (x < 0) {
			fix = Math.PI;
		} else if (y < 0) {
			fix = Math.PI * 2;
		}

		return new PolarVector(
			Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
			Math.atan(y / x) + fix,
		);
	}
}
