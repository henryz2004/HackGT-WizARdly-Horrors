const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

@component
export class NewScript extends BaseScriptComponent {
	@input
	forwardSpeed: number;

	@input
	turnSpeed: number;

	@input
	playerObj: SceneObject;

	@input
	animBob: AnimationCurveTrack;

    @input
    animJuke: AnimationCurveTrack;

    x = randomInt(0,5);
    z = randomInt(0,5);

	enemy = this.getSceneObject();


	frameBob = 0;
    frameJuke = 0;

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
		this.frameBob += 1;
		if (this.frameBob == 31) this.frameBob = 0;

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
		let bobbing = this.enemy.getTransform().getWorldPosition().add(this.animBob.evaluateVec3(this.frameBob/30).mult(new vec3(0,5,0)));
		this.enemy.getTransform().setWorldPosition(bobbing);
        
        this.juke();
        
	}

    private juke(): void {
        this.frameJuke += 1;
		if (this.frameJuke == 31) {
            this.frameJuke = 0;
            this.x = randomInt(-3,3);
            this.z = randomInt(-3,3);
        }
            
        let juking = this.enemy.getTransform().getWorldPosition().add(this.animJuke.evaluateVec3(this.frameJuke/30).mult(new vec3(this.x,0,this.z)));
		this.enemy.getTransform().setWorldPosition(juking);

    }

    
}


