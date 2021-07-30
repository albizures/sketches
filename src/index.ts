import { init, setDebug } from './lib';

import sketch from './sketches/easings/stiff';

const { sketchData } = sketch;

// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept(() => {
		location.reload();
	});
}

if (sketchData && sketchData.debug) {
	setDebug(sketchData.debug);
}

init(sketch).then((t) => t());
