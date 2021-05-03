export interface Component<T, U = {}> {
	requirements: string[];
	utils: U;
}

export class Entity {
	components = new Map<Component<unknown>, unknown>();

	addComponent<T>(component: Component<T>, props: T) {
		this.components.set(component, props);
		return this;
	}

	hasComponent<T>(component: Component<T>): boolean {
		return this.components.has(component);
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
	entities = new Set<Entity>();

	createEntity() {
		let entity = new Entity();

		this.entities.add(entity);

		return entity;
	}

	*query(components: Component<unknown>[]) {
		for (const entity of this.entities) {
			if (
				components.every((component) =>
					entity.hasComponent(component),
				)
			) {
				yield entity;
			}
		}
	}
}
