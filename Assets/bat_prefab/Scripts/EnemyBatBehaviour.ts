import { Player } from "../../Scripts/PlayerSingleton"

@component
export class EnemyBatBehaviour extends BaseScriptComponent {
	@input
	forwardSpeed: number = 5; // Default forward speed

	@input
	strafeSpeed: number = 20; // Default strafing speed

	// Random movement scaling factor

	// Health properties
	@input
	maxHealth: number = 4; // Default maximum health

	health: number;

	@input
	damageRange: number;

	@input
	damage: number;

	// Reference to the player object
	@input
	playerObj: SceneObject;

	private player = Player.getInstance();

	// Reference to the enemy's scene object
	enemy = this.getSceneObject();

	onAwake() {
		// Initialize health
		this.health = this.maxHealth;

		// Bind the onUpdate method to the UpdateEvent
		this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
	}

	/**
	 * Method to handle taking damage
	 * @param n - Amount of damage to take
	 */
	public takeDamage(n: number) {
		print(`Enemy Health Before Damage: ${this.health}`);
		this.health -= n;
		print(`Enemy Health After Damage: ${this.health}`);

		if (this.health <= 0) {
			this.onDeath();
		}
	}

	/**
	 * Method called when the enemy's health reaches zero
	 */
	private onDeath() {
        this.player.addScore(1);
		// Handle enemy death (e.g., play animation, remove from scene)
		if (this.enemy) {
			print("Enemy has been defeated!");
			this.enemy.destroy(); // Assuming a destroy method exists
		}
	}

	onUpdate() {
		this.move();
		// Additional behaviors can be added here

		this.pollPlayer();
	}

	private pollPlayer(): void {
		let playerPos: vec3 = this.playerObj.getTransform().getWorldPosition();
		let currPos: vec3 = this.enemy.getTransform().getWorldPosition();
		let dist = playerPos.distance(currPos);
		if (dist < this.damageRange) {
			this.player.takeDamage(this.damage);
			this.onDeath();
		}
	}

	private move(): void {
		const playerPos: vec3 = this.playerObj
			.getTransform()
			.getWorldPosition();
		const currPos: vec3 = this.enemy.getTransform().getWorldPosition();

		let dir_vec: vec3 = playerPos.sub(currPos).normalize();

		const perpendicular: vec3 = dir_vec.cross(vec3.up()).normalize();

		const newPos: vec3 = currPos.add(
			dir_vec
				.uniformScale(this.forwardSpeed * getDeltaTime())
				.add(
					perpendicular.uniformScale(
						this.strafeSpeed * getDeltaTime()
					)
				)
		);

		this.enemy.getTransform().setWorldPosition(newPos);

		this.enemy
			.getTransform()
			.setWorldRotation(quat.lookAt(dir_vec, vec3.up()));
	}
}
