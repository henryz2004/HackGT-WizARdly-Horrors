import { Player } from "./PlayerSingleton";

@component
export class HUD extends BaseScriptComponent {
	@input scoreText: Text;
	@input xpbar: SceneObject;
	@input healthText: Text;
	@input healthbar: SceneObject;

	private player = Player.getInstance();
	onAwake() {
		this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
	}

	onUpdate() {
		let width = 18;
		let maxScore = 10;
		let currentScore = this.player.getScore() % maxScore;

		let maxHealth = 10;
		let currentHealth = this.player.getHealth();

		this.scoreText.text = "XP: " + currentScore;
		this.xpbar
			.getTransform()
			.setLocalScale(new vec3((currentScore / maxScore) * width, 0.4, 0.4));

		this.healthText.text = "Health: " + currentHealth;
		this.healthbar
			.getTransform()
			.setLocalScale(
				new vec3((currentHealth / maxHealth) * width, 0.4, 0.4)
			);
	}
}
