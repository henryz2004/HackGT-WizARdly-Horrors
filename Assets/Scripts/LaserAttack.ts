import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK"

@component
export class LaserAttack extends BaseScriptComponent {
    private gestureModule: GestureModule = require('LensStudio:GestureModule');

    @input
    cylinderRef: SceneObject

    @input
    originObj: SceneObject;

    @input
    targetObj: SceneObject;

    onAwake() {
        this.createEvent("OnStartEvent").bind(() => {
            this.onStart();
        }
        )

        this.createEvent('UpdateEvent').bind(this.onUpdate.bind(this))
    }

    onStart() {
        let cursorController = SIK.CursorController;
        let cursors = cursorController.getAllCursors();
        let cursor = cursors[0];
        
    }

    onUpdate(){

        
        
        const start = this.originObj.getTransform().getWorldPosition();
        const end = this.targetObj.getTransform().getWorldPosition();

        const direction = end.sub(start).normalize();
        const distance = end.distance(start);

        this.cylinderRef.getTransform().setWorldPosition(start.add(direction.uniformScale(distance / 2)));
        this.cylinderRef.getTransform().setWorldScale(new vec3(0.1, 0.1, distance));
        this.cylinderRef.getTransform().setWorldRotation(quat.lookAt(direction, vec3.up()));
    }
}
