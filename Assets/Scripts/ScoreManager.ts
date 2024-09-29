import { Singleton } from "SpectaclesInteractionKit/Decorators/Singleton";

@Singleton
@component
export class ScoreManager extends BaseScriptComponent {
	public static getInstance: () => ScoreManager;

	score: number;

	getScore() {
		if (isNaN(this.score)) {
			this.score = 4;
		}
		return this.score;
	}

	setScore(score: number) {
		this.score = score;
	}
}
