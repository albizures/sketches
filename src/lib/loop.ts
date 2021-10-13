const loop = {
	fps: 0,
	lastFrameTime: Date.now(),
};

export const updateFPS = () => {
	const delta = (Date.now() - loop.lastFrameTime) / 1000;
	loop.lastFrameTime = Date.now();
	loop.fps = 1 / delta;
};

export const fps = () => {
	return loop.fps;
};
