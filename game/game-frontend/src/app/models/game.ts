import { Map } from "./map";
export class Game {
    public map : Map;
    public errors : {[id:number]:number[]} =  {};
    public constructor(m: Map){
        this.map = m;
        //this.errors = [];
    }

    checkCase2(index : number) : boolean {
        if (index in this.errors){
            return true;
        }
        for (let i in this.errors){
            if (this.errors[i].includes(index)){
                return true;
            }
        }
        return false;
    }

    //Ajouter des cas ayant la même value par rapport à la col et ligne dans la liste errors 
    checkCase(index : number, value : number) : void{
        //Compare with values in the same row and column
        var r = Math.floor(index/9);
        var c = index%9;
        if (value == 0){
            if (index in this.errors){
                delete(this.errors[index]);
            }
        }else{
            for (let i=0;i<9;i++){
                if((value == this.map.cas[r*9 + i])&&((r*9+i != index))){
                    if (index in this.errors){
                        this.errors[index].push(r*9+i);
                    }else{
                        this.errors[index] = [r*9+i];
                    }
                }else{
                    if ((index) in this.errors){
                        if (this.errors[index].includes(r*9+i)){
                            this.errors[index].splice(this.errors[index].indexOf(r*9+i),1); 
                        }
                        if (this.errors[index].length == 0){
                            delete(this.errors[index]);
                        } 
                    }
                }
                if((value == this.map.cas[c + i*9])&&((c + i*9 != index))){
                    if ((index) in this.errors){
                        this.errors[index].push(c+i*9);
                    }else{
                        this.errors[index] = [c+i*9];
                    }
                }else{
                    if ((index) in this.errors){
                        if (this.errors[index].includes(c+i*9)){
                            this.errors[index].splice(this.errors[index].indexOf(c+i*9),1);

                        }
                        if (this.errors[index].length == 0){
                            delete(this.errors[index]);
                        }    
                    }
                    
                }
            }
        }
    }
}
