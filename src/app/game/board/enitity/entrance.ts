import { GameObject, Position, SpritePosition } from "../object";
import { Floor } from "../environment/floor";

export class Entrance extends GameObject {
    protected position: Position;
    protected sprite: SpritePosition = [42, 15];
    private floor: Floor;

    constructor(pos: Position) {
        super();
        this.position = pos;
        this.floor = new Floor(pos);
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
            sprite: this.sprite,
            layer: this.floor.getData()
        }
    }
}