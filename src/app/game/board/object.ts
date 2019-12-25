export abstract class GameObject {
    protected abstract position: Position;
    protected abstract sprite: SpritePosition;
    protected gameKey: string;

    constructor(key: string) {
        this.gameKey = key;
    } 

    abstract click(): void;
    abstract getDisplay(): string;
    abstract getPosition(): Position;
    abstract getData(): ObjectData;
    abstract onload(): void;
}

export type Position = {
    x: number,
    y: number
}

export type ObjectData = {
    type: string,
    sprite: SpritePosition,
    extra?: any
}

export type SpritePosition = [number, number];