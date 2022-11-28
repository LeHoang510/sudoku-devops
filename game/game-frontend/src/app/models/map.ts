export class Map {
    public cas: number[] ;
    public helpTiles : Set<number>[];

    public constructor() {
        this.cas = new Array(81);
        this.helpTiles = [];
        for (var i = 0; i < 81; i++) {
            var tmp = new Set<number>;
            for (var j = 1; i <= 9; j++){
                tmp.add(i)
            }
            this.helpTiles.push(tmp);
        }
    }
    
}
