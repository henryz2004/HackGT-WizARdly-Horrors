@component
export class EnemyBehaviour extends BaseScriptComponent {
    
    @input
    forwardSpeed: number

    @input
    turnSpeed: number

    @input
    playerObj: SceneObject

    @input
    maxHealth: number

    health: number

    enemy = this.getSceneObject()

    


    onAwake() {
        this.health = this.maxHealth;
        this.createEvent('UpdateEvent').bind(this.onUpdate.bind(this))
    }


    public takeDamage(n: number){
        print(this.health)
        this.health -=n   
        print(this.health)
    }

    onUpdate(){
        this.move()
        //print("HAHAHAH")
    }

    private move(): void{

        //Get vector from enemy to player
        let playerPos: vec3 = this.playerObj.getTransform().getWorldPosition()
        
        let currPos: vec3 = this.enemy.getTransform().getWorldPosition()

        let dir_vec: vec3 = playerPos.sub(currPos)

        dir_vec = dir_vec.normalize()

        //go to new position

        let newPos = currPos.add(this.enemy.getTransform().forward.uniformScale(this.forwardSpeed * getDeltaTime()))

        this.enemy.getTransform().setWorldPosition(newPos)

        //rotate toward player a bit

        let newRot = quat.lookAt(dir_vec, vec3.up());


        this.enemy.getTransform().setWorldRotation(quat.slerp(this.enemy.getTransform().getWorldRotation(), newRot, this.turnSpeed * getDeltaTime()))

        
    }
}
