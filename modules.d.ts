declare module 'canvas-sketch-util/random' {
	export function noise1D(
		x: number,
		frequency?: number,
		amplitude?: number,
	): number;
	export function range(min: number, max?: number): number;
	export function rangeFloor(min: number, max?: number): number;
}

declare module 'nice-color-palettes' {
	let Palette: string[];
	export default Palette;
}
