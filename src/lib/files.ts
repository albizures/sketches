import { createGraphics } from '.';

export const loadImage = async (url: string) => {
	let img = new Image();
	img.src = url;

	await new Promise((resolve, reject) => {
		img.onload = resolve;
		img.onerror = reject;
	});

	const context = createGraphics(img.width, img.height);

	context.drawImage(img, 0, 0);

	return context;
};
