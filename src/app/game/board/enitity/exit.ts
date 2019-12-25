import { GameObject, Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Game } from "../../game";

export class Exit extends GameObject {
    protected position: Position;
    protected spritePosition: SpritePosition = [7, 10];
    protected closedSpritePosition: SpritePosition = [8, 10];
    private locked: boolean = true;

    constructor(pos: Position) {
        super();
        this.position = pos;
    }

    public click() {
        if (!this.locked) {
            Game.nextLevel();
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
            sprite: this.locked ? this.closedSpritePosition : this.spritePosition
        }
    }
}