import { GameObject, Position, SpritePosition } from "../object";
import { GameFactory } from "../../game.factory";

export class Exit extends GameObject {
    protected position: Position;
    protected sprite: SpritePosition = [4, 45];
    protected closedSprite: SpritePosition = [25, 42];
    private locked: boolean = true;

    constructor(key: string, pos: Position) {
        super(key);
        this.position = pos;
    }

    public click() {
        if (!this.locked) {
            GameFactory.get(this.gameKey).nextLevel();
        }
    }

    public unlock() {
        this.locked = false;
    }

    public onload() { }

    public getDisplay() {
        return "";
    }

    public getPosition() {
        return this.position;
    }

    public getData() {
        return {
            type: "exit",
            sprite: this.locked ? this.closedSprite : this.sprite
        }
    }
}