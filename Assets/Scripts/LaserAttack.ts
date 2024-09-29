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

    cursorController = SIK.CursorController;


    onAwake() {
        this.createEvent('UpdateEvent').bind(this.onUpdate.bind(this))
    }

    onUpdate(){

        let cursors = this.cursorController.getAllCursors()
        if (cursors.length > 0) {
            let cursorPos = cursors[0].cursorPosition;
            this.targetObj.getTransform().setWorldPosition(cursorPos);
        }
        
        const start = this.originObj.getTransform().getWorldPosition();
        const end = this.targetObj.getTransform().getWorldPosition();

        const direction = end.sub(start).normalize();
        const distance = end.distance(start);

        this.cylinderRef.getTransform().setWorldPosition(start.add(direction.uniformScale(distance / 2)));
        this.cylinderRef.getTransform().setWorldScale(new vec3(0.1, 0.1, distance));
        this.cylinderRef.getTransform().setWorldRotation(quat.lookAt(direction, vec3.up()));
    }
}
