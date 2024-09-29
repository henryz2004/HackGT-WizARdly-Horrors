import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK"

@component
export class LaserAttack extends BaseScriptComponent {
	private gestureModule: GestureModule = require("LensStudio:GestureModule");

	@input
	cylinderRef: SceneObject;

	@input
	originObj: SceneObject;

	@input
	targetObj: SceneObject;

    // @input
    // rightHandTracker: HandTracking3DAsset;

    @input
    rightHandInteractor: HandInteractor;

	// cursorController = SIK.CursorController;

	onAwake() {

        this.rightHandInteractor.startPoint
        this.gestureModule
            .getTargetingDataEvent(GestureModule.HandType.Right)
            .add((targetArgs: TargetingDataArgs) => {

                let origin = this.rightHandInteractor.startPoint;//targetArgs.rayOriginInWorld;
                let target = this.rightHandInteractor.endPoint;
                let direction = target.sub(origin).normalize();// targetArgs.rayDirectionInWorld.normalize();

                this.originObj.getTransform().setWorldPosition(origin);
                this.targetObj.getTransform().setWorldPosition(origin.add(direction.uniformScale(100)));

            }
        )
		this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
	}

	onUpdate() {

		const start = this.originObj.getTransform().getWorldPosition();
		const end = this.targetObj.getTransform().getWorldPosition();

		const direction = end.sub(start).normalize();
		const distance = end.distance(start);

		this.cylinderRef
			.getTransform()
			.setWorldPosition(start.add(direction.uniformScale(distance / 2)));
		this.cylinderRef
			.getTransform()
			.setWorldScale(new vec3(0.1, 0.1, distance));
		this.cylinderRef
			.getTransform()
			.setWorldRotation(quat.lookAt(direction, vec3.up()));
	}
}
