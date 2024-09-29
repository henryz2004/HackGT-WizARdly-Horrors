@component
export class Spawner extends BaseScriptComponent {

    @input enemyPrefab: ObjectPrefab
    @input spawnDelayRange: vec2 = new vec2(1, 3)
    @input spawnRadius: number = 50;
    @input spawnHeight: number = 0;

    spawnTimer: number = 0;

    onAwake() {
        this.createEvent('UpdateEvent').bind(this.onUpdate.bind(this))
    }

    onUpdate() {
        this.spawnTimer -= getDeltaTime();
        if (this.spawnTimer <= 0) {
            this.spawnTimer = Math.random() * (this.spawnDelayRange.y - this.spawnDelayRange.x) + this.spawnDelayRange.x;
            this.spawnEnemy();
        }
    }

    spawnEnemy() {
        let enemy = this.enemyPrefab.instantiate(this.getSceneObject());
        let angle = Math.random() * Math.PI * 2;
        let x = Math.cos(angle) * this.spawnRadius;
        let z = Math.sin(angle) * this.spawnRadius;
        enemy.getTransform().setWorldPosition(new vec3(x, this.spawnHeight, z));
    }
}
