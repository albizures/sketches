import { components, createEntity } from './utils/ecs'
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

try {
	createEntity('1', [
		components.createPosition(10, 20),
		components.createCircle(20),
	])
} catch(e: Error) {
	alert(e)
}