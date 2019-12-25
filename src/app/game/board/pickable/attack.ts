import { Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Player } from "../../player";
import { Game } from "../../game";
import { Pickable } from "../pickable";

export class Attack extends Pickable {
    protected position: Position;
    protected sprite: SpritePosition = [21, 28];
    private readonly amount: number;

    constructor(pos: Position);
    constructor(pos: Position, amount: number);
    constructor(pos: Position, amount: number | undefined = undefined) {
        super(pos);

        if (!amount) {
            amount = Util.randInt(Game.getModifier() * 1.1, Game.getModifier() * 1);
        }

        this.position = pos;
        this.amount = amount;
    }

    public click() {
        super.click();
        Player.setAttack(this.amount, 1);
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
            type: "attack",
            sprite: this.sprite,
            display: this.getDisplay()
        });
    }
}