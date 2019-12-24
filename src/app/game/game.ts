import { Board } from "./board";
import { Util } from "../util";
import { Monster } from "./board/enitity/monster";
import { Wall } from "./board/environment/wall";
import { Player } from "./player";
import { Floor } from "./board/environment/floor";
import { Position } from "./board/object";
import { Gold } from "./board/pickable/gold";
import { Fountain } from "./board/pickable/fountain";
import { Exit } from "./board/enitity/exit";
import { Entrance } from "./board/enitity/entrance";
import { Attack } from "./board/pickable/attack";

export class Game {
    private static instance: Game;
    private level: number = 1;
    private running: boolean = false;

    private constructor() {}

    private static get(): Game {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    }

    public static stop() {
        if (Game.get().running) {
            Game.get().running = false;
        }
    }

    public static start() {
        if (Game.get().running) return;

        Game.get().level = 1;
        Player.setHealth(20);
        Player.setAttack(3);
        Player.setGold(0);
        Player.setInitiative(20);
        
        this.newBoard();
        Game.get().running = true;
    }

    public static nextLevel() {
        Game.get().level++;
        this.newBoard();
    }

    public static newBoard() {
        Board.reset();

        const entrancePos = Board.randomEmptyPosition();
        if (entrancePos) {
            Board.setObject(new Entrance(entrancePos));
        }

        const exitPos = Board.randomEmptyPosition();
        if (exitPos) {
            Board.setObject(new Wall(new Exit(exitPos)));
        }

        const monsters: Array<Monster> = [];
        for (let i = 0; i < Util.randInt(10, 5); i++) {
            const pos = Board.randomEmptyPosition();
            if (pos) {
                Board.setObject(new Wall(new Monster(pos)));
            }
        }

        for (const pos of Board.emptyPositions()) {
            let pickups = [{
                object: new Gold(pos),
                rate: 10
            }, {
                object: new Attack(pos),
                rate: 10
            }, {
                object: new Fountain(pos),
                rate: 1
            }]
            Board.setObject(new Wall(new Floor(pos)));

            const roll = Util.randInt(100);
            let current = 0;
            for (let pickup of pickups) {
                current += pickup.rate;
                if (roll <= current) {
                    Board.setObject(new Wall(pickup.object));
                    break;
                }
                
            }
        }
    }

    public static handleClick(position: Position) {
        if (Game.get().running) {
            Board.handleClick(position);
        }
    }

    public static getData(): any {
        const gameData: any = {
            player: Player.getData(),
            board: Board.getData(),
            running: Game.get().running,
            level: Game.get().level,
            modifier: Game.getModifier()
        };
        if (Player.getHealth() === 0) {
            gameData.message = "Game Over: You Died";
        }
        return gameData;
    }

    public static getModifier(): number {
        return 1 + (Game.get().level / 10)
            + Math.floor(Game.get().level / 5)
            + Math.floor(Game.get().level / 10);
    }
}