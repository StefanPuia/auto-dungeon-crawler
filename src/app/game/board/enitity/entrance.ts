import { GameObject, Position, SpritePosition } from "../object";
import { Util } from "../../../util";

export class Entrance extends GameObject {
    protected position: Position;
    protected spritePosition: SpritePosition;

    public static readonly sprites: Array<SpritePosition> = [[8, 10]];

    constructor(pos: Position) {
        super();
        this.position = pos;
        this.spritePosition = Util.randItem(Entrance.sprites);
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
            type: "entrance",
            sprite: this.spritePosition
        }
    }
}