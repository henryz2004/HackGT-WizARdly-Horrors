import { ScoreManager } from "./ScoreManager";

@component
export class NewScript extends BaseScriptComponent {
	@input scoreText: Text;
	@input xpbar: SceneObject;

	private scoreManager = ScoreManager.getInstance();

	onAwake() {
		this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
	}

	onUpdate() {
		let maxScore = 10;
		let currentScore = this.scoreManager.getScore() % maxScore;

		this.scoreText.text = "XP: " + currentScore;
		this.xpbar
			.getTransform()
			.setLocalScale(new vec3((currentScore / maxScore) * 18, 0.4, 0.4));
	}
}
