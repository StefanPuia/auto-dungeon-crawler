import { GameObject, Position, SpritePosition } from "../object";
import { Util } from "../../../util";

export class Floor extends GameObject {
    protected position: Position;
    protected sprite: SpritePosition;

    public static readonly sprites: Array<SpritePosition> = Util.spriteMap(25, 14, 34, 14)

    constructor(pos: Position) {
        super();
        this.position = pos;
        this.sprite = Util.randItem(Floor.sprites);
    }

    public click() { }
    public onload() { }

    public getDisplay() {
        return "";
    }

    public getPosition() {
        return this.position;
    }

    public getData() {
        return {
            type: "floor",
            sprite: this.sprite
        }
    }
}