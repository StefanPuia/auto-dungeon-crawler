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
import { Key } from "./board/pickable/key";

export class Game {
    private level: number = 1;
    private running: boolean = false;
    private key: string;
    private board: Board;
    private player: Player;

    constructor(key: string) {
        this.key = key;
        this.board = new Board(key);
        this.player = new Player(key);
    }

    public stop() {
        if (this.running) {
            this.running = false;
        }
    }

    public start() {
        if (this.running) return;

        this.level = 1;
        this.player.setHealth(20);
        this.player.setAttack(3);
        this.player.setGold(0);
        this.player.setInitiative(20);
        
        this.newBoard();
        this.running = true;
    }

    public nextLevel() {
        this.level++;
        this.newBoard();
    }

    public getBoard() {
        return this.board;
    }

    public getPlayer() {
        return this.player;
    }

    public newBoard() {
        delete this.board;
        this.board = new Board(this.key);

        const entrancePos = this.board.randomEmptyPosition();
        if (entrancePos) {
            this.board.setObject(new Entrance(this.key, entrancePos));
        }

        const exitPos = this.board.randomEmptyPosition();
        if (exitPos) {
            this.board.setObject(new Wall(this.key, new Exit(this.key, exitPos)));
        }

        for (let i = 0; i < Util.randInt(20, 10); i++) {
            const pos = this.board.randomEmptyPosition();
            if (pos) {
                this.board.setObject(new Wall(this.key, new Monster(this.key, pos)));
            }
        }

        const keyMonster = Util.randItem(this.board.getAllItems(Monster, true));
        keyMonster.overrideLoot(new Key(this.key, keyMonster.getPosition()));

        for (const pos of this.board.emptyPositions()) {
            this.board.setObject(new Wall(this.key, Util.rollReward([{
                object: new Gold(this.key, pos),
                rate: 6
            }, {
                object: new Attack(this.key, pos),
                rate: 2
            }, {
                object: new Fountain(this.key, pos),
                rate: 0.2
            }], 100) || new Floor(this.key, pos)));
        }
    }

    public handleClick(position: Position) {
        if (this.running) {
            this.board.handleClick(position);
        }
    }

    public getData(): any {
        const gameData: any = {
            player: this.player.getData(),
            board: this.board.getData(),
            running: this.running,
            level: this.level,
            modifier: this.getModifier()
        };
        if (this.running && this.player.getHealth() === 0) {
            gameData.message = "Game Over: You Died";
        }
        return gameData;
    }

    public getModifier(): number {
        return 1 + (this.level / 10)
            + Math.floor(this.level / 5)
            + Math.floor(this.level / 10);
    }
}