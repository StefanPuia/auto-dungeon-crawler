import { GameObject, Position, SpritePosition } from "../object";
import { Board } from "../../board";
import { Util } from "../../../util";
import { Monster } from "../enitity/monster";
import { Entrance } from "../enitity/entrance";
import { Floor } from "./floor";
import { Pickable } from "../pickable";
import { Exit } from "../enitity/exit";

export class Wall extends GameObject {
    protected position: Position;
    protected sprite: SpritePosition;
    protected lockedSprite: SpritePosition;
    protected unclickableSprite: SpritePosition;
    private contains: GameObject;
    private locked: boolean = false;

    public static readonly sprites: Array<SpritePosition> = Util.spriteMap(0, 14, 7, 14);
    public static readonly lockedSprites: Array<SpritePosition> = Util.spriteMap(7, 13, 13, 13);
    public static readonly unclickableSprites: Array<SpritePosition> = Util.spriteMap(41, 12, 52, 12);

    constructor(contains: GameObject) {
        super();
        this.position = contains.getPosition();
        this.contains = contains;
        this.sprite = Util.randItem(Wall.sprites);
        this.lockedSprite = Util.randItem(Wall.lockedSprites);
        this.unclickableSprite = Util.randItem(Wall.unclickableSprites);
    }

    public click() {
        if (!this.locked && this.clickable()) {
            Board.setObject(this.contains);
        }
    }
    public onload() { }

    private clickable(): boolean {
        for (const obj of Board.getSurrounding(this.position, false)) {
            if (obj instanceof Entrance || obj instanceof Exit
                    || obj instanceof Floor || obj instanceof Pickable) {
                return true;
            }
        }
        return false;
    }

    public getContains(): GameObject {
        return this.contains;
    }

    public getDisplay() {
        return "wall";
    }

    public getPosition() {
        return this.position;
    }

    public lock() {
        this.locked = true;
    }

    public unlock() {
        let monsters = 0;
        Board.getSurrounding(this.position).forEach(obj => {
            if (obj instanceof Monster) monsters++;
        })

        if (monsters === 0) {
            this.locked = false;
        }
    }

    public getData() {
        const data: any = {
            type: "wall",
            sprite: this.unclickableSprite
        }

        if (this.clickable()) {
            data.sprite = this.sprite;
        }

        if (this.locked) {
            data.sprite = this.lockedSprite;
        }

        return data;
    }
}