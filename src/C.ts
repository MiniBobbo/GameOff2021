export class C {
    static LocationWidth = 32;
    static LocationHeight = 32;

    static CAM_SCROLL_SPEED:number = 100;

    static ID:number = 0;

    //Tile to world coordinates.
    static TtW(tile:number):number {
        return tile * C.LocationHeight;
    }
}