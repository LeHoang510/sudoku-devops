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
        //this.map.cas[index] = value;
        var valideCase = true;
        var index_ligne = Math.floor(index/9); //11 1 
        var index_col = index % 9; // du 2
        for(let i = 0; i<9; i++){
            if (value == this.map.cas[index_ligne*9+i] && index != index_ligne*9+i ){
                this.errors.add(index);
                this.errors.add(index_ligne*9+i);
                console.log("index " + index +  " value " + value.toString());
                console.log("index " + index +  " value " + this.map.cas[index].toString());
                console.log("Cas ligne "  + (index_ligne).toString() + " "+ i.toString() + " value " + this.map.cas[index_ligne*9+i].toString());
                valideCase = false;
            } 
        }
        for(let i = 0; i<9; i++){
            if (value == this.map.cas[i*9+index_col] && index != i*9+index_col){
                this.errors.add(index);
                this.errors.add(i*9+index_col);
                console.log("index " + index +" value " + value.toString());
                console.log("Cas col " + i.toString() + " " + index_col.toString() + " value " + this.map.cas[i*9+index_col].toString());
                valideCase = false;
            } 
        }
        if (valideCase){
            this.errors.delete(index);
            for(let i = 0; i<9; i++){
                if (value != this.map.cas[index_ligne*9+i] && index != index_ligne*9+i){
                    this.errors.delete(index_ligne*9+i);
                    console.log("index " + index +  " value " + value.toString());
                    console.log("Del cas ligne " + (index_ligne*9+i).toString());
                } 
            }
            for(let i = 0; i<9; i++){
                if (value != this.map.cas[i*9+index_col] && index != i*9+index_col){
                    this.errors.delete(i*9+index_col);
                    console.log("index " + index +" value " + this.map.cas[index].toString());
                    console.log("Del cas col " + (i*9+index_col).toString());
                } 
            }
        } 

        // if (valideCase){
        //     this.errors.delete(index);
        // }
    }

    // checkLine(index_ligne : number, index :number){
    //     var valide = true;
    //     for(let i = 0; i<9; i++){
    //         for(let j = i+1; j<9; j++){
    //             if (this.map.cas[index_ligne*9+i] == this.map.cas[index_ligne*9+j] && index != index_ligne*9+i)
    //                 valide = false;
    //             console.log("Check " +(index_ligne*9+i).toString() + " vs " + (index_ligne*9+j).toString());
    //         }
    //         if (valide) this.errors.delete(index_ligne*9+i);
    //         console.log("Del " + (index_ligne*9+i).toString());
          
    //     }
    // }
}
