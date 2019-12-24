import { GameObject, Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Game } from "../../game";

export class Exit extends GameObject {
    protected position: Position;
    protected spritePosition: SpritePosition;

    public static readonly sprites: Array<SpritePosition> = [[7, 10]];

    constructor(pos: Position) {
        super();
        this.position = pos;
        this.spritePosition = Util.randItem(Exit.sprites);
    }

    public click() {
        Game.nextLevel();
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
            sprite: this.spritePosition
        }
    }
}