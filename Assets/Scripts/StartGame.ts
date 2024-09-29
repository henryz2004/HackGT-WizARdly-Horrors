import { Player } from "./PlayerSingleton";

@component
export class StartGame extends BaseScriptComponent {

	@input levelContainer: SceneObject;

	onAwake() {
		
	}

	public startLevel1() {
		print("Starting level 1")
		this.getSceneObject().getParent().enabled = false;
		this.levelContainer.enabled = true;
	}
}
