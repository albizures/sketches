interface Vector {
	x: number;
	y: number;
}

enum ComponentType {
	POSITION,
	STROKE_COLOR,
	FILL_COLOR,
	CIRCLE,
}

interface Component {
	type: ComponentType;
	requirements: ComponentType[];
}

interface PositionComponent extends Component {
	type: Component.POSITION;
	pos: Vector;
}

interface CircleComponent extends Component {
	type: Component.CIRCLE;
	radius: number;
}

interface Entity {
	id: string;
	components: Component[];
}

export let components = {
	createPosition(x: number, y, number): PositionComponent {
		return {
			type: ComponentType.POSITION,
			requirements: [],
			pos: {
				x,
				y,
			},
		};
	},
	createCircle(radius: number) {
		return {
			type: ComponentType.CIRCLE,
			requirements: [ComponentType.POSITION],
			radius,
		};
	},
};

export let entities: Entity[] = [];

export let createEntity = (
	id: string,
	components: Component[],
): Entity => {
	let missingRequirements = components.reduce(
		(requirements, component) => {
			component.requirements.forEach(requirements.add);
			if (requirements.has(component.type)) {
				requirements.delete(component.type);
			}
		},
		new Set<ComponentType>(),
	);

	if (missingRequirements.size() > 0) {
		throw new Error('Missing requirements, check your components');
	}

	let entity = {
		id,
		components,
	};

	entities.push(entity);

	return entity;
};
