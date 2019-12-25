import { Position, GameObject } from "./board/object";
import { Floor } from "./board/environment/floor";
import { Util } from "../util";
import { Boulder } from "./board/environment/boulder";
import { Wall } from "./board/environment/wall";

export class Board {
    private static instance: Board;
    private objects: Array<Array<GameObject>>;

    private constructor() {
        const layout = Util.randItem(boardLayouts);
        this.objects = [];
        for (let i = 0; i < 7; i++) {
            this.objects[i] = [];
            for(let j = 0; j < 5; j++) {
                if (layout[i][j] === 0) {
                    this.objects[i][j] = new Floor({x: i, y: j});
                } else {
                    this.objects[i][j] = new Boulder({x: i, y: j});
                }
            }
        }
    }

    public static get() {
        if (!this.instance) {
            this.instance = new Board();
        }
        return this.instance;
    }

    public static reset() {
        delete this.instance;
    }

    public static setObject(object: GameObject) {
        const position = object.getPosition();
        Board.get().objects[position!.x][position!.y] = object;
        object.onload();
    }

    public static emptyPositions(): Array<Position> {
        const empty: Array<Position> = [];
        for(let x = 0; x < 7; x ++) {
            for(let y = 0; y < 5; y++) {
                if (Board.get().objects[x][y] instanceof Floor) {
                    empty.push(Board.get().objects[x][y].getPosition());
                }
            }
        }
        return empty;
    }

    public static randomEmptyPosition(): Position {
        const empty = Board.emptyPositions();
        return empty[Math.floor(Math.random() * empty.length)];
    }

    public static handleClick(position: Position) {
        Board.get().objects[position.x][position.y].click();
    }


    public static getSurrounding(position: Position): Array<GameObject>;
    public static getSurrounding(position: Position, corners: boolean): Array<GameObject>;
    public static getSurrounding(position: Position, corners: boolean | undefined = true): Array<GameObject> {
        const surrounding: Array<GameObject> = [];
        for (let i = position.x - 1; i <= position.x + 1; i++) {
            for (let j = position.y - 1; j <= position.y + 1; j++) {
                if (i !== position.x || j !== position.y) {
                    if (corners === false && i !== position.x && j !== position.y) {
                        continue;
                    }

                    try {
                        surrounding.push(Board.get().objects[i][j]);
                    } catch(e) {}
                }
            }
        }
        return surrounding;
    }

    public static getData(): any {
        return Board.get().objects.map(row => row.map(obj => obj.getData()));
    }

    public static getAt(position: Position): GameObject {
        return Board.get().objects[position.x][position.y];
    }

    public static getAllItems<T>(constructor:{new (p: Position, ...x: any):T}, includeHidden: boolean): Array<T> {
        const objects: Array<T> = [];
        for(let i = 0; i < 7 * 5; i++) {
            const obj = Board.getAt({x: Math.floor(i/5), y: i%5});
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
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
], [
    [1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 1, 1, 1]
], [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
], [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0]
]]