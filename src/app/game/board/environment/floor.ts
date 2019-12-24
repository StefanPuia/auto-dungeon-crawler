import { GameObject, Position, SpritePosition } from "../object";
import { Util } from "../../../util";

export class Floor extends GameObject {
    protected position: Position;
    protected spritePosition: SpritePosition;

    public static readonly sprites: Array<SpritePosition> = [[7, 5], [8, 5], [9, 5]];

    constructor(pos: Position) {
        super();
        this.position = pos;
        this.spritePosition = Util.randItem(Floor.sprites);
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
            sprite: this.spritePosition
        }
    }
}