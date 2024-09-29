import { EnemyBehaviour } from "./EnemyBehaviour"

@component
export class ProjectileDamage extends BaseScriptComponent {
	@input
	projDamage: number;
	rb = this.getSceneObject().getComponent("Physics.BodyComponent");

	onAwake() {

		this.rb.onCollisionEnter.add((e: CollisionEnterEventArgs) => {
			print("COLLISION HAPPENED");
			let collision: Collision = e.collision;

			let collider: ColliderComponent = e.collision.collider;

			if (collider.getSceneObject().name.startsWith("Enemy")) {
				
                let other : SceneObject = collider.getSceneObject();
                let otherScripts: ScriptComponent[] =
					other.getComponents("ScriptComponent");

				otherScripts = otherScripts.filter((val, i) => {
					return val instanceof EnemyBehaviour;
				});
				let otherScript: EnemyBehaviour =
					otherScripts[0] as EnemyBehaviour;

				if (this.isEnemy(otherScript)) {
					print("Found EnemyBehavior script");
					otherScript.takeDamage(this.projDamage);
				}

				this.getSceneObject().enabled = false;
			}
		});
	}

    isEnemy(script: ScriptComponent) : script is EnemyBehaviour {
        return script instanceof EnemyBehaviour
    }
}
