import { Board } from "../../board";
import { Exit } from "../enitity/exit";
import { Position, SpritePosition } from "../object";
import { Pickable } from "../pickable";
import { Floor } from "../environment/floor";

export class Key extends Pickable {
    protected position: Position;
    protected spritePosition: SpritePosition = [5, 0];

    constructor(pos: Position) {
        super();
        this.position = pos;
    }

    public click() {
        const exits = Board.getAllItems(Exit, true);
        if (exits.length) {
            exits[0].unlock();
        }
        Board.setObject(new Floor(this.position));
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
            type: "key",
            sprite: this.spritePosition
        }
    }
}