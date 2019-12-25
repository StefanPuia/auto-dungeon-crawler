import { GameObject, Position, SpritePosition } from "../object";
import { Util } from "../../../util";

export class Boulder extends GameObject {
    protected position: Position;
    protected sprite: SpritePosition;

    public static readonly sprites: Array<SpritePosition> = Util.spriteMap(29, 13, 36, 13);

    constructor(key: string, pos: Position) {
        super(key);
        this.position = pos;
        this.sprite = Util.randItem(Boulder.sprites);
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
            sprite: this.sprite
        }
    }
}