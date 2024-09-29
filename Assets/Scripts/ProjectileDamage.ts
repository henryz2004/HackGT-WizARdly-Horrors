@component
export class ProjectileDamage extends BaseScriptComponent {
    rb = this.getSceneObject().getComponent('Physics.BodyComponent');

    onAwake() {
        let store = global.persistentStorageSystem.store;
		let scoreKey = "totalScore";

        this.rb.onCollisionEnter.add((e: CollisionEnterEventArgs) => {

            print("COLLISION HAPPENED")
            let collision: Collision = e.collision;
            
            let collider: ColliderComponent = e.collision.collider

            if(collider.getSceneObject().name.startsWith("Enemy")){
                
                let currentScore = store.getInt(scoreKey);
				currentScore += 1;
				store.putInt(scoreKey, currentScore);

                collision.collider.getSceneObject().destroy()
                print('destroyed enemy')
                this.getSceneObject().enabled = false;
                
            }
          });
    }
}
