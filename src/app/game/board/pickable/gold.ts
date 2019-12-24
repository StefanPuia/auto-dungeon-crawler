import { Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Player } from "../../player";
import { Board } from "../../board";
import { Floor } from "../environment/floor";
import { Game } from "../../game";
import { Pickable } from "../pickable";

export class Gold extends Pickable {
    protected position: Position;
    protected spritePosition: SpritePosition;
    private readonly amount: number;
    public static readonly sprites: Array<SpritePosition> = [[9, 12]];

    constructor(pos: Position);
    constructor(pos: Position, amount: number);
    constructor(pos: Position, amount: number | undefined = undefined) {
        super();

        if (!amount) {
            amount = Util.randInt(Game.getModifier() * 5, Game.getModifier() * 1);
        }

        this.position = pos;
        this.spritePosition = Util.randItem(Gold.sprites);
        this.amount = amount;
    }

    public click() {
        Player.setGold(this.amount, 1);
        Board.setObject(new Floor(this.position));
    }
    public onload() { }

    public getDisplay() {
        return this.amount.toString();
    }

    public getPosition() {
        return this.position;
    }

    public getData() {
        return {
            type: "gold",
            sprite: this.spritePosition,
            display: this.getDisplay()
        }
    }
}