import { Singleton } from "SpectaclesInteractionKit/Decorators/Singleton";

@Singleton
@component
export class Player extends BaseScriptComponent {
    public static getInstance: () => Player;

    private score: number;
    private health: number;
    private activePowerup: string;

    getScore() {
        if (isNaN(this.score)) {
            this.score = 0;
        }
        return this.score;
    }

    setScore(score: number) {
        this.score = score;
    }

    getHealth() {
        if (isNaN(this.health)) {
            this.health = 10;
        }
        return this.health;
    }

    setHealth(health: number) {
        this.health = health;
    }

    getActivePowerup() {
        if (this.activePowerup == null) {
            this.activePowerup = "RightHandXP";
        }
        return this.activePowerup;
    }

    setActivePowerup(powerup: string) {
        this.activePowerup = powerup;
    }


}
