import { Game } from "./game";

export class Player {
    private static instance: Player;
    private health: number = 0;
    private attack: number = 0;
    private gold: number = 0;
    private baseHealth: number = 0;
    private initiative: number = 0;

    private constructor() { }

    private static get() {
        if (!this.instance) {
            this.instance = new Player();
        }
        return this.instance;
    }

    public static reset() {
        delete this.instance;
    }

    private checkDead() {
        if (this.health <= 0) {
            this.health = 0;
            Game.stop();
        }
    }

    private static changeStatus(old: number, val: number, mode: SetMode) {
        if (mode === 0) return val;
        return old + val * mode;
    }

    public static getHealth(): number {
        return Player.get().health;
    }

    public static getBaseHealth(): number {
        return Player.get().baseHealth;
    }

    public static setHealth(n: number): void;
    public static setHealth(n: number, mode: SetMode): void;
    public static setHealth(n: number, mode: SetMode = 0) {
        n = Math.floor(n);
        Player.get().health = Player.changeStatus(Player.get().health, n, mode);
        if (Player.getBaseHealth() < Player.getHealth()) {
            Player.get().baseHealth = Player.getHealth();
        }
        Player.get().checkDead();
    }

    public static getAttack(): number {
        return Player.get().attack;
    }

    public static setAttack(n: number): void;
    public static setAttack(n: number, mode: SetMode): void;
    public static setAttack(n: number, mode: SetMode = 0) {
        Player.get().attack = Player.changeStatus(Player.get().attack, n, mode);
    }

    public static getGold(): number {
        return Player.get().gold;
    }

    public static setGold(n: number): void;
    public static setGold(n: number, mode: SetMode): void;
    public static setGold(n: number, mode: SetMode = 0) {
        Player.get().gold = Player.changeStatus(Player.get().gold, n, mode);
    }

    public static getInitiative(): number {
        return Player.get().initiative;
    }

    public static setInitiative(n: number): void;
    public static setInitiative(n: number, mode: SetMode): void;
    public static setInitiative(n: number, mode: SetMode = 0) {
        Player.get().initiative = Player.changeStatus(Player.get().initiative, n, mode);
    }

    public static getData(): any {
        return  {
            health: Player.get().health,
            attack: Player.get().attack,
            gold: Player.get().gold
        }
    }
}

export type SetMode = -1 | 0 | 1;