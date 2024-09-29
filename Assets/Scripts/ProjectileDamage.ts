import { EnemyBehaviour } from "./EnemyBehaviour";

@component
export class ProjectileDamage extends BaseScriptComponent {

    @input 
    projDamage: number
    
    rb = this.getSceneObject().getComponent('Physics.BodyComponent');


    isEnemy(script:ScriptComponent ): script is EnemyBehaviour {
        print(script instanceof EnemyBehaviour)
        return script instanceof EnemyBehaviour;
    }
    
    onAwake() {
        let store = global.persistentStorageSystem.store;
		let scoreKey = "totalScore";

        this.rb.onCollisionEnter.add((e: CollisionEnterEventArgs) => {

            //print("COLLISION HAPPENED")
            let collision: Collision = e.collision;
            
            let collider: ColliderComponent = e.collision.collider

            if(collider.getSceneObject().name.startsWith("Enemy")){
                
                let currentScore = store.getInt(scoreKey);
				currentScore += 1;
				store.putInt(scoreKey, currentScore);

                let other: SceneObject = collider.getSceneObject()

                let otherScripts: ScriptComponent [] = other.getComponents('ScriptComponent')
                
                otherScripts = otherScripts.filter((val, i)=>{
                    return val instanceof EnemyBehaviour
                })
                let otherScript: EnemyBehaviour = (otherScripts[0] as EnemyBehaviour)
                print('Check Check health is:')
                print((otherScript as EnemyBehaviour).health)
                print(otherScript instanceof EnemyBehaviour)
                
                if(this.isEnemy(otherScript)){
                    print('MADE IT')
                    otherScript.takeDamage(this.projDamage)

                }


                this.getSceneObject().enabled = false;
                
            }
          });
    }
}
