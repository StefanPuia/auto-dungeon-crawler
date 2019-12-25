import { GameObject, Position } from "./object";
import { Floor } from "./environment/floor";
import { Board } from "../board";

export abstract class Pickable extends GameObject {
    protected floor: Floor;

    constructor(position: Position) {
        super();
        this.floor = new Floor(position);
    }
    
    public click() {
        Board.setObject(this.floor);
    }

    public getData(): any {
        return {
            layer: this.floor.getData()
        }
    }
}