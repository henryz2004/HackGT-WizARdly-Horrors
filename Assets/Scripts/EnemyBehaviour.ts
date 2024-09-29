@component
export class EnemyBehaviour extends BaseScriptComponent {
    
    // Movement and rotation speeds
    @input
    forwardSpeed: number = 5; // Default forward speed

    @input
    strafeSpeed: number = 3; // Default strafing speed

    @input
    turnSpeed: number = 2; // Default turn speed

    // Random movement scaling factor
    @input
    randomMovementScale: number = 1; // Default random movement scale

    // Health properties
    @input
    maxHealth: number = 100; // Default maximum health

    health: number;

    // Reference to the player object
    @input
    playerObj: SceneObject;

    // Reference to the enemy's scene object
    enemy = this.getSceneObject();

    // Optional: Add evasion strength if implementing evasive maneuvers
    @input
    evasionStrength: number = 2; // Default evasion strength

    onAwake() {
        // Initialize health
        this.health = this.maxHealth;

        // Bind the onUpdate method to the UpdateEvent
        this.createEvent('UpdateEvent').bind(this.onUpdate.bind(this));
    }

    /**
     * Method to handle taking damage
     * @param n - Amount of damage to take
     */
    public takeDamage(n: number) {
        print(`Enemy Health Before Damage: ${this.health}`);
        this.health -= n;
        print(`Enemy Health After Damage: ${this.health}`);

        if (this.health <= 0) {
            this.onDeath();
        }
    }

    /**
     * Method called when the enemy's health reaches zero
     */
    private onDeath() {
        // Handle enemy death (e.g., play animation, remove from scene)
        print("Enemy has been defeated!");
        this.enemy.destroy(); // Assuming a destroy method exists
    }

    /**
     * Update method called every frame
     */
    onUpdate() {
        this.move();
        // Additional behaviors can be added here
    }

    /**
     * Generates a random normalized vec3
     * @returns A normalized random vec3
     */
    private getRandomNormalizedVec3(): vec3 {
        // Generate random components between -1 and 1
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const z = Math.random() * 2 - 1;

        const randomVec = new vec3(x, y, z);

        // Normalize the vector to ensure uniform scaling
        return randomVec.normalize();
    }

    /**
     * Handles the enemy's movement logic
     */
    private move(): void {
        const playerPos: vec3 = this.playerObj.getTransform().getWorldPosition();
        const currPos: vec3 = this.enemy.getTransform().getWorldPosition();
    
        // Calculate direction vector towards the player
        let dir_vec: vec3 = playerPos.sub(currPos).normalize();
    
        // Calculate a perpendicular vector for strafing (right or left)
        const perpendicular: vec3 = dir_vec.cross(vec3.up()).normalize();
    
        // Determine strafing direction with smooth oscillation
        const strafingDirection = Math.sin(Date.now() * 0.002) > 0 ? 1 : -1;
    
        // Combine forward and strafing movement with speed variation
        const speedVariation = 1 + Math.sin(Date.now() * 0.005) * 0.3; // Varies between 0.7 and 1.3
        const forwardMovement = dir_vec.uniformScale(this.forwardSpeed * speedVariation * getDeltaTime());
        const strafeMovement = perpendicular.uniformScale(this.strafeSpeed * strafingDirection * getDeltaTime());
        let movement = forwardMovement.add(strafeMovement);
    
        // Add random movement offset for unpredictability
        const randomOffset = this.getRandomNormalizedVec3().uniformScale(this.randomMovementScale * getDeltaTime());
        movement = movement.add(randomOffset);
    
        // Update position
        const newPos = currPos.add(movement);
        this.enemy.getTransform().setWorldPosition(newPos);
    
        // Rotate toward the new direction smoothly
        const newRot = quat.lookAt(dir_vec, vec3.up());
        const currentRot = this.enemy.getTransform().getWorldRotation();
        const smoothedRot = quat.slerp(currentRot, newRot, this.turnSpeed * getDeltaTime());
        this.enemy.getTransform().setWorldRotation(smoothedRot);
    }
}
