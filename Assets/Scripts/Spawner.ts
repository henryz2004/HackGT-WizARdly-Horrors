import { Player } from "./PlayerSingleton";

@component
export class Spawner extends BaseScriptComponent {
	@input enemyPrefab: ObjectPrefab;
	@input spawnDelay1: vec2;
	@input spawnDelay2: vec2;
	@input spawnDelay3: vec2;
	@input spawnRadius: number = 50;
	@input spawnHeight: number = 0;
	@input camera: Camera;

	spawnTimer: number = 0;
    private player = Player.getInstance();

	onAwake() {
		this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
	}

	onUpdate() {
		this.spawnTimer -= getDeltaTime();
		if (this.spawnTimer <= 0) {
            let level = Math.floor(this.player.getScore() / 10);
            var spawnDelayRange: vec2;
            if (level < 1) {
                spawnDelayRange = this.spawnDelay1;
            } else if (level < 2) {
                spawnDelayRange = this.spawnDelay2;
            }
            else {
                spawnDelayRange = this.spawnDelay3;
            }
			this.spawnTimer =
				Math.random() * (spawnDelayRange.y - spawnDelayRange.x) +
				spawnDelayRange.x;
			this.spawnEnemy();
		}
	}

	spawnEnemy() {
		let enemy = this.enemyPrefab.instantiate(this.getSceneObject());
		let angle = Math.random() * Math.PI * 2;
		let x = Math.cos(angle) * this.spawnRadius;
		let z = Math.sin(angle) * this.spawnRadius;
		let camPosition = this.camera.getTransform().getWorldPosition();
		enemy
			.getTransform()
			.setWorldPosition(
				camPosition.add(new vec3(x, this.spawnHeight, z))
			);
	}
}
