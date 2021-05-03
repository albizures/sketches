import { init, setDebug } from './lib';

import { setup, sketchData } from './sketches/image/dotte';

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

init({ setup })();
