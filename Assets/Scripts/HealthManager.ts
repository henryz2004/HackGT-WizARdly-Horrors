import { Singleton } from "SpectaclesInteractionKit/Decorators/Singleton";

@Singleton
@component
export class HealthManager extends BaseScriptComponent {
	public static getInstance: () => HealthManager;

	health: number;

	getHealth() {
		if (isNaN(this.health)) {
			this.health = 10;
		}
		return this.health;
	}

	setHealth(health: number) {
		this.health = health;
	}
}
