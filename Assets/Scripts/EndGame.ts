import { Player } from "./PlayerSingleton";

@component
export class StartGame extends BaseScriptComponent {

	@input levelContainer: SceneObject;
	@input endContainer: SceneObject;

	onAwake() {
		this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
	}

	onUpdate() {
		if (Player.getInstance().getHealth() <= 0) {
			this.getSceneObject().enabled = false;
			this.levelContainer.enabled = false;
			this.endContainer.enabled = true;
		}
	}
}
