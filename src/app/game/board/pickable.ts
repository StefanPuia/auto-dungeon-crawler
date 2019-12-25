import { GameObject, Position } from "./object";
import { Floor } from "./environment/floor";
import { GameFactory } from "../game.factory";

export abstract class Pickable extends GameObject {
    protected floor: Floor;

    constructor(key: string, position: Position) {
        super(key);
        this.floor = new Floor(key, position);
    }
    
    public click() {
        GameFactory.get(this.gameKey).getBoard().setObject(this.floor);
    }

    public getData(): any {
        return {
            layer: this.floor.getData()
        }
    }
}