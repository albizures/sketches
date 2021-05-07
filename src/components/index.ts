import { PolarVector, Vector } from '../lib/coordinates';
import { Component } from '../utils/ecs';

export let Radius: Component<number> = {
	requirements: [],
};

export let PolarPosition: Component<PolarVector> = {
	requirements: [],
};

export let Position: Component<Vector> = {
	requirements: [],
};

export let FillStyle: Component<string> = {
	requirements: [],
};

export let PolarVelocity: Component<PolarVector> = {
	requirements: [],
};
