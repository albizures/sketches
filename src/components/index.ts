import { PolarVector, Vector } from '../coordinates';
import { Component } from '../utils/ecs';

export let Radius: Component<number> = {
	requirements: [],
	utils: {},
};

export let PolarPosition: Component<PolarVector> = {
	requirements: [],
	utils: {},
};

export let Position: Component<Vector> = {
	requirements: [],
	utils: {},
};

export let FillStyle: Component<string> = {
	requirements: [],
	utils: {},
};

export let PolarVelocity: Component<PolarVector> = {
	requirements: [],
	utils: [],
};
