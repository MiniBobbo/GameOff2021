export class C {
    static LocationWidth = 32;
    static LocationHeight = 32;

    //Tile to world coordinates.
    static TtW(tile:number):number {
        return tile * C.LocationHeight;
    }
}