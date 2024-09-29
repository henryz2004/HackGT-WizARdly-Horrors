@component
export class NewScript extends BaseScriptComponent {
	@input
	forwardSpeed: number;

	@input
	turnSpeed: number;

	@input
	playerObj: SceneObject;

	@input
	animation: AnimationCurveTrack;


	enemy = this.getSceneObject();


	frame = 0;

	justSpawned = true;
	jumpscare = false;

    onAwake() {
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
    }

    onUpdate() {
		if (this.getSceneObject() === null) {
			return;
		}
        this.move();
        // print("movement")
    }

    private move(): void {
		this.frame += 1;
		if (this.frame == 31) this.frame = 0;

		//Get vector from enemy to player
		let playerPos: vec3 = this.playerObj.getTransform().getWorldPosition();

		let currPos: vec3 = this.enemy.getTransform().getWorldPosition();

		let dir_vec: vec3 = playerPos.sub(currPos);

		dir_vec = dir_vec.normalize();

		//go to new position

		let newPos = currPos.add(
			this.enemy
				.getTransform()
				.forward.uniformScale(this.forwardSpeed * getDeltaTime())
		);

		this.enemy.getTransform().setWorldPosition(newPos);

		//rotate toward player a bit

		let newRot = quat.lookAt(dir_vec, vec3.up());

		this.enemy
			.getTransform()
			.setWorldRotation(
				quat.slerp(
					this.enemy.getTransform().getWorldRotation(),
					newRot,
					this.turnSpeed * getDeltaTime()
				)
			);
        // bob up and down
		let bobbing = this.enemy.getTransform().getWorldPosition().add(this.animation.evaluateVec3(this.frame/30).mult(new vec3(0,5,0)));
		this.enemy.getTransform().setWorldPosition(bobbing);
	}
}
