import { Position, SpritePosition } from "../object";
import { Player } from "../../player";
import { Game } from "../../game";
import { Pickable } from "../pickable";

export class Fountain extends Pickable {
    protected position: Position;
    protected sprite: SpritePosition = [20, 11];

    constructor(pos: Position) {
        super(pos);
        this.position = pos;
    }

    public click() {
        super.click();
        if (Player.getHealth() - Player.getBaseHealth()) {
            Player.setHealth(Player.getBaseHealth() + Game.getModifier() * 5)
        } else {
            Player.setHealth(Game.getModifier() * 23, 1)
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
            type: "fountain",
            sprite: this.sprite
        });
    }
}