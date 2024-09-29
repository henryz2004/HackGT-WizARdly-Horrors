import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK"

@component
export class LaserAttack extends BaseScriptComponent {
    private gestureModule: GestureModule = require('LensStudio:GestureModule');

    @input 
    attack_cooldown: number = 1.0;

    @input
    projectile_obj: ObjectPrefab;
    
    @input
    launch_velocity: number;

    @input
    projectile_container: SceneObject

    attack_timer = this.attack_cooldown;

    projectile_list: SceneObject[] = [];

    onAwake() {
        this.createEvent('UpdateEvent').bind(this.onUpdate.bind(this))

    this.gestureModule
        .getTargetingDataEvent(GestureModule.HandType.Right)
        .add((targetArgs: TargetingDataArgs) => {

        
        if(this.attack_timer > 0){
            print('ON COOLDOWN')
            
            return
        }

        this.attack_timer = this.attack_cooldown;
        print('SHOT FIRED')


        let curr_proj = this.projectile_obj.instantiate(this.projectile_container)
        this.projectile_list.push(curr_proj)
        print("PROJECTILE LIST LENGTH: " + this.projectile_list.length)
        curr_proj.getTransform().setWorldPosition(targetArgs.rayOriginInWorld)
        //curr_proj.getTransform().setWorldPosition(new vec3(0,0,-300))

        let rb = curr_proj.getComponent('Physics.BodyComponent');

        if(rb === null){
            print('NO RIGIDBODY AHHH')
        }

        //rb.velocity = targetArgs.rayDirectionInWorld.normalize().uniformScale(this.launch_velocity)
        //let test: vec3 = new vec3(0,10000,0)
        
        
        rb.addForce(targetArgs.rayDirectionInWorld.normalize().uniformScale(this.launch_velocity), Physics.ForceMode.VelocityChange)
        
        
        //rb.addForce(new vec3(0,1,-300), Physics.ForceMode.VelocityChange)
        //rb.velocity = test

        
        //print(rb.velocity)
        
        /*
        let probe = Physics.createGlobalProbe();
        probe.debugDrawEnabled = true
        probe.filter.includeStatic = true;
        probe.filter.includeDynamic = false;

        let end = targetArgs.rayOriginInWorld.add(targetArgs.rayDirectionInWorld.uniformScale(100));
        
        probe.rayCast(targetArgs.rayOriginInWorld, end, function (hit){
            if(hit === null){
                print('SHOT MISSED')
                return;
            }
            print('SHOT HIT')
            let thing_I_shot = hit.collider.getSceneObject()

            thing_I_shot.destroy()
        })
        */
        });
        
        

    
    }

    onUpdate(){


        this.attack_timer -= getDeltaTime();

        this.projectile_list = this.projectile_list.filter((proj) => {
                if (!proj.enabled || proj.getTransform().getWorldPosition().y < -250) {
                    proj.destroy()
                    return false
                }
                return true
            }
        )
    }
}
