export class C {
    static LocationWidth = 20;
    static LocationHeight = 20;

    static BLUE_HIGHLIGHT:number = 0xff8888;
    static RED_HIGHLIGHT:number = 0x6666ff;

    static CAM_SCROLL_SPEED:number = 100;

    static ID:number = 0;

    //Tile to world coordinates.
    static TtW(tile:number):number {
        return tile * C.LocationHeight;
    }
}