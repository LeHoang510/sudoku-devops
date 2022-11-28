export class Map {
    public cas: number[] ;
    public helpTiles : Set<number>[];

    public constructor() {
        this.cas = new Array(81);
        this.helpTiles = [];
        for (var i = 0; i < 81; i++) {
            this.helpTiles.push(new Set<number>);
        }
    }
    
}
