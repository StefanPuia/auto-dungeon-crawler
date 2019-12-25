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
    protected spritePosition: SpritePosition;
    protected lockedSpritePosition: SpritePosition;
    protected unclickableSpritePosition: SpritePosition;
    private contains: GameObject;
    private locked: boolean = false;

    public static readonly sprites: Array<SpritePosition> = Util.array(10).map((x, i) => { return [i+1, 3] });
    public static readonly lockedSprites: Array<SpritePosition> = Util.array(6).map((x, i) => { return [i+1, 11] });
    public static readonly unclickableSprites: Array<SpritePosition> = Util.array(10).map((x, i) => { return [i+1, 0] });

    constructor(contains: GameObject) {
        super();
        this.position = contains.getPosition();
        this.contains = contains;
        this.spritePosition = Util.randItem(Wall.sprites);
        this.lockedSpritePosition = Util.randItem(Wall.lockedSprites);
        this.unclickableSpritePosition = Util.randItem(Wall.unclickableSprites);
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
            sprite: this.unclickableSpritePosition
        }

        if (this.clickable()) {
            data.sprite = this.spritePosition;
        }

        if (this.locked) {
            data.sprite = this.lockedSpritePosition;
        }

        return data;
    }
}