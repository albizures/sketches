interface Vector {
	x: number;
	y: number;
}

export interface Component<T> {
	requirements: string[];
}

export let Position: Component<Vector> = {
	requirements: [],
};

export let FillStyle: Component<string> = {
	requirements: [],
};

export class Entity {
	components = new Map<Component<unknown>, unknown>();

	addComponent<T>(component: Component<T>, props: T) {
		this.components.set(component, props);
		return this;
	}

	getProps<T>(component: Component<T>): T {
		let props = this.components.get(component);

		return props as T;
	}

	setProps<T>(component: Component<T>, props: T) {
		this.components.set(component, props);

		return this;
	}
}

export class System {
	name?: string;
	components = new Set<Component<unknown>>();
	entities = new Set<Entity>();

	registerComponent<T>(component: Component<T>) {
		if (this.components.has(component)) {
			throw new Error('Component already added');
		}

		this.components.add(component);

		return this;
	}

	createEntity() {
		let entity = new Entity();

		this.entities.add(entity);

		return entity;
	}
}
