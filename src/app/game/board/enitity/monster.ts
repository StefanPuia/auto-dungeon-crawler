import { Util } from "../../../util";
import { GameFactory } from "../../game.factory";
import { Floor } from "../environment/floor";
import { Wall } from "../environment/wall";
import { GameObject, Position, SpritePosition } from "../object";
import { Attack } from "../pickable/attack";
import { Gold } from "../pickable/gold";
import { Potion } from "../pickable/potion";

export class Monster extends GameObject {
    protected position: Position;
    private attack: number;
    private health: number;
    private initiative: number;
    private loot: GameObject;
    private floor: Floor;
    protected sprite: SpritePosition;
    public static readonly sprites: Array<SpritePosition> = Util.spriteMap(0, 3, 63, 5);

    public constructor(key: string, position: Position);
    public constructor(key: string, position: Position, attack: number, health: number);
    public constructor(key: string, position: Position, attack: number | undefined = undefined, health: number | undefined = undefined) {
        super(key);
        const game = GameFactory.get(key);

        if (!attack) {
            attack = Util.randInt(game.getModifier() * 1.8, game.getModifier() * 1)
        }
        if (!health) {
            health = Util.randInt(game.getModifier() * 2.8, game.getModifier() * 1)
        }

        this.position = position;
        this.attack = attack;
        this.health = health;
        this.initiative = Util.randInt(GameFactory.get(this.gameKey).getPlayer().getInitiative() * 1.3, GameFactory.get(this.gameKey).getPlayer().getInitiative() * 0.7);
        this.sprite = Util.randItem(Monster.sprites);
        this.floor = new Floor(this.gameKey, this.position);

        this.loot = Util.rollReward([{
            object: new Potion(this.gameKey, this.position),
            rate: 6
        }, {
            object: new Gold(this.gameKey, this.position),
            rate: 10
        }, {
            object: new Attack(this.gameKey, this.position),
            rate: 2
        }], 100) || this.floor;
    }

    public onload() {
        GameFactory.get(this.gameKey).getBoard().getSurrounding(this.position).forEach(obj => {
            if (obj instanceof Wall) obj.lock()
        })
    }
    
    public click() {
        const player = GameFactory.get(this.gameKey).getPlayer();
        if (player.getInitiative() > this.initiative) {
            this.health -= player.getAttack();
            if (!this.checkDead()) {
                player.setHealth(this.attack, -1);
            }
        } else {
            player.setHealth(this.attack, -1);
            this.health -= player.getAttack();
            this.checkDead();
        }
    }

    private checkDead() {
        if (this.health <= 0) {
            GameFactory.get(this.gameKey).getBoard().setObject(this.loot);
            GameFactory.get(this.gameKey).getBoard().getSurrounding(this.position).forEach(obj => {
                if (obj instanceof Wall) obj.unlock()
            })
            return true;
        }
        return false;
    }

    public overrideLoot(loot: GameObject) {
        this.loot = loot;
    }

    public getDisplay() {
        return `a: ${this.attack} h: ${this.health}`;
    }

    public getPosition() {
        return this.position;
    }
    
    public getData() {
        return {
            type: "monster",
            sprite: this.sprite,
            extra: {
                attack: this.attack,
                health: this.health
            },
            layer: this.floor.getData()
        }
    }
}