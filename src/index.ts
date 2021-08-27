import Navigo from 'navigo';
import { init, setDebug, SketchData } from './lib';

// @ts-ignore
import sketches from 'sketches/**/*.ts';

// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept(() => {
		location.reload();
	});
}

const router = new Navigo('/');

interface Sketch {
	__esModule: boolean;
	setup?: () => void;
	draw?: () => void;
	preload?: () => Promise<void>;
	sketchData: SketchData;
}

type Sketches = Record<string, Sketch | unknown>;

const isSketch = (sketch: Sketch | unknown): sketch is Sketch => {
	return (sketch as Sketch).__esModule;
};

const routes: string[] = [];

const readSketches = (sketches: Sketches, parent = '') => {
	for (const key in sketches) {
		const sketch = sketches[key];

		const route = `${parent}/${key}`;
		if (isSketch(sketch)) {
			routes.push(route);

			router.on(route, () => {
				const { sketchData } = sketch;

				if (sketchData && sketchData.debug) {
					setDebug(sketchData.debug);
				}

				init(sketch).then((t) => t());
			});
		} else {
			readSketches(sketch as Sketches, route);
		}
	}
};

readSketches(sketches);

router.on('/', () => {
	const ul = document.createElement('ul');

	routes.forEach((route) => {
		const li = document.createElement('ul');
		const link = document.createElement('a');

		link.href = route;
		link.textContent = route;
		li.appendChild(link);

		ul.appendChild(li);
	});

	document.getElementById('sketch')?.replaceWith(ul);
});

router.resolve();
