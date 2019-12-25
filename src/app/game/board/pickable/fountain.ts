import { Position, SpritePosition } from "../object";
import { Pickable } from "../pickable";
import { GameFactory } from "../../game.factory";

export class Fountain extends Pickable {
    protected position: Position;
    protected sprite: SpritePosition = [20, 11];

    constructor(key: string, pos: Position) {
        super(key, pos);
        this.position = pos;
    }

    public click() {
        super.click();
        const game = GameFactory.get(this.gameKey);
        const player = GameFactory.get(this.gameKey).getPlayer();
        if (player.getHealth() - player.getBaseHealth()) {
            player.setHealth(player.getBaseHealth() + game.getModifier() * 5)
        } else {
            player.setHealth(game.getModifier() * 23, 1)
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