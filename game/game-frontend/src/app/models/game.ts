import { Map } from "./map";
export class Game {
    public map : Map;
    public errors =  new Set<number>();
    
    public constructor(m: Map){
        this.map = m;
        //this.errors = [];
    }

    //Ajouter des cas ayant la même value par rapport à la col et ligne dans la liste errors 
    checkCase(index : number, value : number) : void{
        //Vérifier ligne = phan nguyen col = phan du 
        
        var index_ligne = index/9; //11 1 
        var index_col = index % 9; // du 2
        for(let i = 0; i<9; i++){
            if (value == this.map.cas[index_ligne*9+i] && index != index_ligne*9+i ){
                this.errors.add(index);
                this.errors.add(index_ligne*9+i);
                console.log("index " + index +  " value " + this.map.cas[index].toString());

                console.log("index ligne " + (index_ligne*9+i).toString() + " value " + this.map.cas[index].toString());
            } 
        }
        for(let i = 0; i<9; i++){
            if (value == this.map.cas[i*9+index_col]){
                this.errors.add(index);
                this.errors.add(i*9+index_col);
                console.log("index" + index);
                console.log("index col" + i*9+index_col);
            } 
        }
    }

}
