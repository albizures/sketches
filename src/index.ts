import { init, setDebug } from './lib';

import { setup, sketchData } from './sketches/tattoo';

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

init({ setup })();
