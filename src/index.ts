import { init, setDebug } from './lib';

import { setup, draw, sketchData } from './sketches/dots/square';

// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept(function () {
		location.reload();
	});
}

if (sketchData && sketchData.debug) {
	setDebug(sketchData.debug);
}

init({ setup, draw })();
