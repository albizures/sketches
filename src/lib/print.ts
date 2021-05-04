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
