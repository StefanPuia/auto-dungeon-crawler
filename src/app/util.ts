export class Util {
    public static array(n: number) {
        const array = [];
        for(let i = 0; i < n; i++) {
            array.push(0);
        }
        return array;
    }

    public static randInt(max: number): number;
    public static randInt(max: number, min: number): number;
    public static randInt(max: number, min: number = 0): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static between(a: any, x: any, b: any): boolean {
        return a <= x && x <= b;
    }

    public static randItem(array: Array<any>) {
        return array[this.randInt(array.length - 1)]
    }
}