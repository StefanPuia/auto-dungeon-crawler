import { Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Player } from "../../player";
import { Pickable } from "../pickable";
import { GameFactory } from "../../game.factory";

export class Attack extends Pickable {
    protected position: Position;
    protected sprite: SpritePosition = [21, 28];
    private readonly amount: number;

    constructor(key: string, pos: Position);
    constructor(key: string, pos: Position, amount: number);
    constructor(key: string, pos: Position, amount: number | undefined = undefined) {
        super(key, pos);
        const game = GameFactory.get(key);

        if (!amount) {
            amount = Util.randInt(game.getModifier() * 1.1, game.getModifier() * 1);
        }

        this.position = pos;
        this.amount = amount;
    }

    public click() {
        super.click();
        GameFactory.get(this.gameKey).getPlayer().setAttack(this.amount, 1);
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