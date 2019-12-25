import { Position, SpritePosition } from "../object";
import { Util } from "../../../util";
import { Pickable } from "../pickable";
import { GameFactory } from "../../game.factory";

export class Gold extends Pickable {
    protected position: Position;
    protected sprite: SpritePosition = [59, 23];
    private readonly amount: number;

    constructor(key: string, pos: Position);
    constructor(key: string, pos: Position, amount: number);
    constructor(key: string, pos: Position, amount: number | undefined = undefined) {
        super(key, pos);
        const game = GameFactory.get(key);

        if (!amount) {
            amount = Util.randInt(game.getModifier() * 5, game.getModifier() * 1);
        }

        this.position = pos;
        this.amount = amount;
    }

    public click() {
        super.click();
        GameFactory.get(this.gameKey).getPlayer().setGold(this.amount, 1);
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