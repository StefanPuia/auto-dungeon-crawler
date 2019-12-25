import { Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Player } from "../../player";
import { Game } from "../../game";
import { Pickable } from "../pickable";

export class Gold extends Pickable {
    protected position: Position;
    protected sprite: SpritePosition = [59, 23];
    private readonly amount: number;

    constructor(pos: Position);
    constructor(pos: Position, amount: number);
    constructor(pos: Position, amount: number | undefined = undefined) {
        super(pos);

        if (!amount) {
            amount = Util.randInt(Game.getModifier() * 5, Game.getModifier() * 1);
        }

        this.position = pos;
        this.amount = amount;
    }

    public click() {
        super.click();
        Player.setGold(this.amount, 1);
    }
    public onload() { }

    public getDisplay() {
        return this.amount.toString();
    }

    public getPosition() {
        return this.position;
    }

    public getData() {
        return Object.assign(super.getData(), {
            type: "gold",
            sprite: this.sprite,
            display: this.getDisplay()
        });
    }
}