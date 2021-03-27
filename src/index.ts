import { init } from './lib';

import { setup } from './sketches/tattoo';

// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept(function () {
		location.reload();
	});
}

init({ setup })();
