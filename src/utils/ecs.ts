export interface Component<T = null> {
	requirements: Component<unknown>[];
}

export class Entity {
	components = new Map<Component<unknown>, unknown>();

	addComponent<T>(component: Component<T>, props: T) {
		if (
			!component.requirements.every((requirement) => {
				return this.components.has(requirement);
			})
		) {
			throw new Error('Missing requirement');
		}
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

export const Not = <T>(component: Component<T>) => (
	entity: Entity,
) => {
	return !entity.hasComponent(component);
};

type Query = ReturnType<typeof Not> | Component<unknown>;

export class System {
	name?: string;
	entities = new Set<Entity>();

	createEntity() {
		let entity = new Entity();

		this.entities.add(entity);

		return entity;
	}

	*query(components: Query[]) {
		for (const entity of this.entities) {
			if (
				components.every((query) => {
					if (typeof query === 'function') {
						return query(entity);
					}
					return entity.hasComponent(query);
				})
			) {
				yield entity;
			}
		}
	}
}
