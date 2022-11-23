import { Map } from "./map";
export class Game {
    public map : Map;
    public errors : number[];
    public constructor(m: Map){
        this.map = m;
        this.errors = [];
    }

}
