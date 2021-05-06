const canvas = document.getElementById('sketch') as HTMLCanvasElement;
export let context = canvas.getContext(
	'2d',
) as CanvasRenderingContext2D;

interface WithContext<T> {
	(): T;
}

export const withContext = <T>(
	fn: WithContext<T>,
	ctx: CanvasRenderingContext2D,
): T => {
	const temp = context;
	context = ctx;
	const result = fn();
	context = temp;
	return result;
};
