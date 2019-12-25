import { Game } from "./game";
import { GameFactory } from "./game.factory";

export class Player {
    private gameKey: string;
    private health: number = 0;
    private attack: number = 0;
    private gold: number = 0;
    private baseHealth: number = 0;
    private initiative: number = 0;

    constructor(gameKey: string) {
        this.gameKey = gameKey;
    }

    private checkDead() {
        if (this.health <= 0) {
            this.health = 0;
            GameFactory.get(this.gameKey).stop();
        }
    }

    private changeStatus(old: number, val: number, mode: SetMode) {
        if (mode === 0) return val;
        return old + val * mode;
    }

    public getHealth(): number {
        return this.health;
    }

    public getBaseHealth(): number {
        return this.baseHealth;
    }

    public setHealth(n: number): void;
    public setHealth(n: number, mode: SetMode): void;
    public setHealth(n: number, mode: SetMode = 0) {
        n = Math.floor(n);
        this.health = this.changeStatus(this.health, n, mode);
        if (this.getBaseHealth() < this.getHealth()) {
            this.baseHealth = this.getHealth();
        }
        this.checkDead();
    }

    public getAttack(): number {
        return this.attack;
    }

    public setAttack(n: number): void;
    public setAttack(n: number, mode: SetMode): void;
    public setAttack(n: number, mode: SetMode = 0) {
        this.attack = this.changeStatus(this.attack, n, mode);
    }

    public getGold(): number {
        return this.gold;
    }

    public setGold(n: number): void;
    public setGold(n: number, mode: SetMode): void;
    public setGold(n: number, mode: SetMode = 0) {
        this.gold = this.changeStatus(this.gold, n, mode);
    }

    public getInitiative(): number {
        return this.initiative;
    }

    public setInitiative(n: number): void;
    public setInitiative(n: number, mode: SetMode): void;
    public setInitiative(n: number, mode: SetMode = 0) {
        this.initiative = this.changeStatus(this.initiative, n, mode);
    }

    public getData(): any {
        return  {
            health: this.health,
            attack: this.attack,
            gold: this.gold
        }
    }
}

export type SetMode = -1 | 0 | 1;