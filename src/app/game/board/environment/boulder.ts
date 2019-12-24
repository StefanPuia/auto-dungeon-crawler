import { GameObject, Position, SpritePosition } from "../object";
import { Util } from "../../../util";

export class Boulder extends GameObject {
    protected position: Position;
    protected spritePosition: SpritePosition;

    public static readonly sprites: Array<SpritePosition> = [[0, 15]];

    constructor(pos: Position) {
        super();
        this.position = pos;
        this.spritePosition = Util.randItem(Boulder.sprites);
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
            type: "boulder",
            sprite: this.spritePosition
        }
    }
}