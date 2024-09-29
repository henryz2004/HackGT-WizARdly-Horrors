import { EnemyBehaviour } from "./EnemyBehaviour"
import { EnemyBatBehaviour } from "bat_prefab/Scripts/EnemyBatBehaviour";

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

                // Ghost
				let ghostScripts = otherScripts.filter((val, i) => {
					return val instanceof EnemyBehaviour;
				});
                if (ghostScripts.length > 0) {
                    let ghostScript: EnemyBehaviour =
						ghostScripts[0] as EnemyBehaviour;

					print("Found GHOST EnemyBehavior script");
					ghostScript.takeDamage(this.projDamage);
                }

                // Bat
                let batScripts = otherScripts.filter((val, i) => {
					return val instanceof EnemyBatBehaviour;
				});
                if (batScripts.length > 0) {
                    let batScript: EnemyBatBehaviour =
                        batScripts[0] as EnemyBatBehaviour;

                    print("Found BAT EnemyBehavior script");
                    batScript.takeDamage(this.projDamage);
                }

				this.getSceneObject().enabled = false;
			}
		});
	}
}
