let millisStart = -1;

export const millis = () => {
	if (millisStart === -1) {
		return 0;
	} else {
		return window.performance.now() - millisStart;
	}
};

export const resetMillisStart = () => {
	millisStart = window.performance.now();
};
