import { map } from './math';
import { millis } from './time';

interface Step<T> {
	(pos: number, reversed: boolean): T;
}

type StepDescriptor<T> = [number, Step<T>];
interface StepResult<T> {
	duration: number;
	payload: T;
}

const runStep = <T>(
	time: number,
	start: number,
	end: number,
	step: Step<T>,
	reversed = false,
) => {
	const pos = map(time, start, end, 0, 1);

	if (reversed) {
		return step(Math.abs(pos - 1), reversed);
	}

	return step(pos, reversed);
};

export enum TimelapseType {
	// from 0 to 1 and back to 0
	LOOP,
	// from 0 to 1 to 0
	PERFECT_LOOP,
	// from 0 to 1 and stop
	ONCE,
	ONCE_BACK,
}

type Steps<T> = StepDescriptor<T>[];

interface Config<T> {
	type?: TimelapseType;
	steps: Steps<T>;
}

const getDuraction = <T>(steps: Steps<T>, type: TimelapseType) => {
	const duration = steps.reduce((sum, step) => {
		return sum + step[0];
	}, 0);

	return duration;
};

export const timelapse = <T>(config: Config<T>) => {
	const { steps: originalSteps, type = TimelapseType.LOOP } = config;

	if (originalSteps.length === 0) {
		throw new Error('Empty timelapse');
	}

	const reversedPoint = originalSteps.length - 1;

	let steps: Steps<T>;
	if (
		type === TimelapseType.PERFECT_LOOP ||
		type === TimelapseType.ONCE_BACK
	) {
		steps = [...originalSteps, ...originalSteps.slice().reverse()];
	} else {
		steps = originalSteps;
	}

	const duration = getDuraction(steps, type);

	let runnedOnce = false;
	let lastResult: StepResult<T>;

	return (): StepResult<T> => {
		if (
			(type === TimelapseType.ONCE ||
				type === TimelapseType.ONCE_BACK) &&
			runnedOnce
		) {
			return lastResult;
		}

		const time = (millis() * 0.001 * 0.5) % duration;

		let prevStepDuraction = 0;

		for (let index = 0; index < steps.length; index++) {
			const [stepDuration, step] = steps[index];
			const stepTime = prevStepDuraction + stepDuration;
			if (time <= stepTime) {
				lastResult = {
					payload: runStep(
						time,
						prevStepDuraction,
						stepTime,
						step,
						index > reversedPoint,
					),
					duration,
				};
				break;
			}
			prevStepDuraction = stepTime;
		}

		if (
			type === TimelapseType.ONCE ||
			type === TimelapseType.ONCE_BACK
		) {
			runnedOnce = true;
		}

		return lastResult;
	};
};
