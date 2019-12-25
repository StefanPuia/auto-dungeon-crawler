import { Position, GameObject } from "./board/object";
import { Floor } from "./board/environment/floor";
import { Util } from "../util";
import { Boulder } from "./board/environment/boulder";
import { Wall } from "./board/environment/wall";

export class Board {
    private objects: Array<Array<GameObject>>;
    private gameKey: string;

    public constructor(gameKey: string) {
        this.gameKey = gameKey;
        const layout = Util.randItem(boardLayouts);
        this.objects = [];
        for (let i = 0; i < 14; i++) {
            this.objects[i] = [];
            for(let j = 0; j < 10; j++) {
                if (layout[i][j] === 0) {
                    this.objects[i][j] = new Floor(gameKey, {x: i, y: j});
                } else {
                    this.objects[i][j] = new Boulder(gameKey, {x: i, y: j});
                }
            }
        }
    }

    public setObject(object: GameObject) {
        const position = object.getPosition();
        this.objects[position!.x][position!.y] = object;
        object.onload();
    }

    public emptyPositions(): Array<Position> {
        const empty: Array<Position> = [];
        for(let x = 0; x < 14; x ++) {
            for(let y = 0; y < 10; y++) {
                if (this.objects[x][y] instanceof Floor) {
                    empty.push(this.objects[x][y].getPosition());
                }
            }
        }
        return empty;
    }

    public randomEmptyPosition(): Position {
        const empty = this.emptyPositions();
        return empty[Math.floor(Math.random() * empty.length)];
    }

    public handleClick(position: Position) {
        this.objects[position.x][position.y].click();
    }


    public getSurrounding(position: Position): Array<GameObject>;
    public getSurrounding(position: Position, corners: boolean): Array<GameObject>;
    public getSurrounding(position: Position, corners: boolean | undefined = true): Array<GameObject> {
        const surrounding: Array<GameObject> = [];
        for (let i = position.x - 1; i <= position.x + 1; i++) {
            for (let j = position.y - 1; j <= position.y + 1; j++) {
                if (i !== position.x || j !== position.y) {
                    if (corners === false && i !== position.x && j !== position.y) {
                        continue;
                    }

                    try {
                        surrounding.push(this.objects[i][j]);
                    } catch(e) {}
                }
            }
        }
        return surrounding;
    }

    public getData(): any {
        return this.objects.map(row => row.map(obj => obj.getData()));
    }

    public getAt(position: Position): GameObject {
        return this.objects[position.x][position.y];
    }

    public getAllItems<T>(constructor:{new (k: string, p: Position, ...x: any):T}, includeHidden: boolean): Array<T> {
        const objects: Array<T> = [];
        for(let i = 0; i < 14 * 10; i++) {
            const obj = this.getAt({x: Math.floor(i/10), y: i%10});
            if (obj instanceof constructor) {
                objects.push(obj);
            } else if (obj instanceof Wall && includeHidden) {
                if (obj.getContains() instanceof constructor) {
                    objects.push(obj.getContains() as unknown as T);
                }
            }
        }
        return objects;
    }
}

const boardLayouts = [[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
], [
    [1,1,1,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,1,1,0,0],
    [1,0,0,0,0,0,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,1,1,1],
    [0,0,0,0,0,0,1,1,0,0],
    [0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,1,1],
    [0,0,1,1,1,0,0,1,1,1]
], [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,1,1,1],
    [0,1,1,1,1,0,0,0,1,1],
    [0,1,0,0,1,1,0,0,0,0],
    [0,1,0,0,1,1,0,0,0,0],
    [0,1,1,0,1,1,1,0,0,0],
    [0,0,0,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,1,0,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,1,1,0],
    [0,1,0,0,0,0,1,1,1,0]
], [
    [0,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0],
    [1,0,0,0,1,1,1,0,0,0],
    [1,0,0,0,0,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,1,0,0],
    [0,1,1,1,0,0,0,1,0,0],
    [0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,1,1,0],
    [0,0,0,0,0,0,1,1,1,0],
    [0,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,1,1,1,0,0]
]]