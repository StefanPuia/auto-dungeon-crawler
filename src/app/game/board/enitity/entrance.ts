import { GameObject, Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Floor } from "../environment/floor";

export class Entrance extends GameObject {
    protected position: Position;
    protected spritePosition: SpritePosition;

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
            type: "entrance",
            sprite: this.spritePosition
        }
    }
}