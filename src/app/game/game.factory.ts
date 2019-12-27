import { Game } from "./game"
import { Util } from "../util";

export class GameFactory {
    private static instances: GameInstances = {};

    public static get(key: string) {
        if (!this.instances[key]) {
            const game = new Game(key);
            this.instances[key] = {
                key: key,
                access: 0,
                instance: game
            }
            game.start();
        }
        this.instances[key].access = new Date().getTime(); 
        return this.instances[key].instance;
    }

    public static delete(key: string) {
        delete this.instances[key];
    }

    public static cleanup(t: number) {
        const now = new Date().getTime();
        for(const key of Object.keys(this.instances)) {
            if (this.instances[key].access + t < now) {
                delete this.instances[key];
                console.log("deleted " + key);
            }
        }
    }

    public static generateKey() {
        return Util.randHash(10);
    }

    public static getAll() {
        return this.instances;
    }

    public static getStats() {
        const stats = [];
        for (const inst of Object.values(this.instances)) {
            stats.push({
                key: inst.key,
                access: new Date(inst.access),
                modifier: inst.instance.getModifier()
            })
        }

        return stats;
    }
}

type GameInstances = {
    [key: string]: {
        access: number,
        key: string,
        instance: Game
    }
}