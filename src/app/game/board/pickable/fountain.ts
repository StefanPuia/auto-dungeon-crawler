import { Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Player } from "../../player";
import { Game } from "../../game";
import { Board } from "../../board";
import { Floor } from "../environment/floor";
import { Pickable } from "../pickable";

export class Fountain extends Pickable {
    protected position: Position;
    protected spritePosition: SpritePosition;

    public static readonly sprites: Array<SpritePosition> = [[8, 5]];

    constructor(pos: Position) {
        super();
        this.position = pos;
        this.spritePosition = Util.randItem(Fountain.sprites);
    }

    public click() {
        if (Player.getHealth() - Player.getBaseHealth()) {
            Player.setHealth(Player.getBaseHealth() + Game.getModifier() * 5)
        } else {
            Player.setHealth(Game.getModifier() * 23, 1)
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
            type: "fountain",
            sprite: this.spritePosition
        }
    }
}