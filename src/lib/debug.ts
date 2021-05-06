export enum DebugLevel {
	NONE,
	INFO,
	ALL,
}

export let debug: DebugLevel = DebugLevel.NONE;

export const setDebug = (level: DebugLevel) => {
	debug = level;
};

export const withDebug = (
	fn: () => void,
	level = DebugLevel.INFO,
) => {
	if (level === debug) {
		fn();
	}
};

export const print = (...values: unknown[]) => {
	console.log(...values);
};

let lazyValue: unknown[] = [];

print.lazy = (...values: unknown[]) => {
	if (values.length === 0) {
		print(lazyValue);
		lazyValue = [];
	} else {
		lazyValue = lazyValue.concat(values);
	}
};
