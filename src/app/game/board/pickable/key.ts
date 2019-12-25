import { Board } from "../../board";
import { Exit } from "../enitity/exit";
import { Position, SpritePosition } from "../object";
import { Pickable } from "../pickable";

export class Key extends Pickable {
    protected position: Position;
    protected sprite: SpritePosition = [54, 45];

    constructor(pos: Position) {
        super(pos);
        this.position = pos;
    }

    public click() {
        super.click();
        const exits = Board.getAllItems(Exit, true);
        if (exits.length) {
            exits[0].unlock();
        }
    }

    public onload() { }

    public getDisplay() {
        return "";
    }

    public getPosition() {
        return this.position;
    }

    public getData() {
        return Object.assign(super.getData(), {
            type: "key",
            sprite: this.sprite
        });
    }
}