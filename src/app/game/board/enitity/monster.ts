import { GameObject, Position, SpritePosition } from "../object";
import { Player } from "../../player";
import { Board } from "../../board";
import { Floor } from "../environment/floor";
import { Util } from "../../../util";
import { Gold } from "../pickable/gold";
import { Game } from "../../game";
import { Potion } from "../pickable/potion";
import { Wall } from "../environment/wall";
import { Attack } from "../pickable/attack";

export class Monster extends GameObject {
    protected position: Position;
    private attack: number;
    private health: number;
    private initiative: number;
    private loot: GameObject;
    private floor: Floor;
    protected sprite: SpritePosition;
    public static readonly sprites: Array<SpritePosition> = Util.spriteMap(0, 3, 63, 5);

    public constructor(position: Position);
    public constructor(position: Position, attack: number, health: number);
    public constructor(position: Position, attack: number | undefined = undefined, health: number | undefined = undefined) {
        super();

        if (!attack) {
            attack = Util.randInt(Game.getModifier() * 1.8, Game.getModifier() * 1)
        }
        if (!health) {
            health = Util.randInt(Game.getModifier() * 2.8, Game.getModifier() * 1)
        }

        this.position = position;
        this.attack = attack;
        this.health = health;
        this.initiative = Util.randInt(Player.getInitiative() * 1.3, Player.getInitiative() * 0.7);
        this.sprite = Util.randItem(Monster.sprites);
        this.floor = new Floor(this.position);

        this.loot = Util.rollReward([{
            object: new Potion(this.position),
            rate: 6
        }, {
            object: new Gold(this.position),
            rate: 10
        }, {
            object: new Attack(this.position),
            rate: 2
        }], 100) || this.floor;
    }

    public onload() {
        Board.getSurrounding(this.position).forEach(obj => {
            if (obj instanceof Wall) obj.lock()
        })
    }
    
    public click() {
        if (Player.getInitiative() > this.initiative) {
            this.health -= Player.getAttack();
            if (!this.checkDead()) {
                Player.setHealth(this.attack, -1);
            }
        } else {
            Player.setHealth(this.attack, -1);
            this.health -= Player.getAttack();
            this.checkDead();
        }
    }

    private checkDead() {
        if (this.health <= 0) {
            Board.setObject(this.loot);
            Board.getSurrounding(this.position).forEach(obj => {
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