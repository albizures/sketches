declare module 'canvas-sketch-util/math' {
	export function mapRange(
		value: number,
		inputMin: number,
		inputMax: number,
		ouptutMin: number,
		outputMax: number,
		clamp = false,
	): number;
}

declare module 'canvas-sketch-util/random' {
	export function noise1D(
		x: number,
		frequency?: number,
		amplitude?: number,
	): number;
	export function range(min: number, max?: number): number;
	export function rangeFloor(min: number, max?: number): number;
	export function noise1D(x: number, frequency = 1, amplitude = 1);
	export function noise2D(
		x: number,
		y: number,
		frequency = 1,
		amplitude = 1,
	);
	export function noise3D(
		x: number,
		y: number,
		z: number,
		frequency = 1,
		amplitude = 1,
	);
	export function noise4D(
		x: number,
		y: number,
		w: number,
		frequency = 1,
		amplitude = 1,
	);
}

declare module 'nice-color-palettes' {
	let Palette: string[];
	export default Palette;
}
