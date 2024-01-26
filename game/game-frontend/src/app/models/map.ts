export class Map { //value of each tiles with associated suggestion
    public cas: number[] ;
    public helpTiles : Set<number>[];

    constructor() {
        this.cas = new   Array(81);
        this.helpTiles = [];
        for (let i = 0; i < 81; i++) {
            this.helpTiles.push(new Set<number>);
        }
    }

    /*
    constructor(map: String) {
        for (let i = 0; i < 81; i++){
            this.m.cas[i]=parseInt(data.charAt(i));
        }
    }
    */
    
}
