import { Map } from "./map";
export class Game {
    public map : Map;
    public map2 : Map;
    public errors : {[id:number]:number[]} =  {};
    public constructor(m: Map, m2: Map){
        this.map = m;
        this.map2 = m2;
        // for(let i=0;i<81;i++){
        //     console.log(this.map2.cas[i].toString());}
        //this.errors = [];
    }
    //Verifier si cas est dans errors
    checkCase2(index : number) : boolean {
        //Verifier si cas est dans clé
        if (index in this.errors){
            return true;
        }
        //Verifier si cas est dans valeurs
        for (let i in this.errors){
            if (this.errors[i].includes(index)){
                return true;
            }
        }
        return false;
    }

    //Ajouter des cas ayant la même value par rapport à la col et ligne dans la liste errors 
    checkCase(index : number, value : number) : void{
        //si on change un cas à un valeur différent, supprimer ce cas dans toutes ces relations 
        if (value != this.map.cas[index]){
            for (let i in this.errors){
                if (this.errors[i].includes(index)){
                    this.errors[i].splice(this.errors[i].indexOf(index),1);
                }
                if (this.errors[i].length == 0){
                    delete(this.errors[i]);
                } 
            }
        }
        this.map.cas[index] = value;
        var r = Math.floor(index/9);
        var c = index%9;
        //Si value égal à 0, supprimer clé index dans errors s'il existe
        if (value == 0){
            if (index in this.errors){
                delete(this.errors[index]);
            }
        }else{
        //Sinon, comparer le avec les cas en même ligne, même colonne
            for (let i=0;i<9;i++){
                //Comparer avec les cas en même ligne, si égal, créer or ajouter dans errors[index]
                if((value == this.map.cas[r*9 + i])&&((r*9+i != index))){
                    if (index in this.errors){
                        this.errors[index].push(r*9+i);
                    }else{
                        this.errors[index] = [r*9+i];
                    }
                }else{
                //Si les 2 ne sont pas égaux, retirer le cas de la liste errors[index] s'il existe
                    if ((index) in this.errors){
                        if (this.errors[index].includes(r*9+i)){
                            this.errors[index].splice(this.errors[index].indexOf(r*9+i),1); 
                        }
                        //Si la liste errors[index] est vide, supprimer la clé
                        if (this.errors[index].length == 0){
                            delete(this.errors[index]);
                        } 
                    }
                }
                //Comparer avec les cas en même colone, si égal, créer or ajouter dans errors[index]
                if((value == this.map.cas[c + i*9])&&((c + i*9 != index))){
                    if ((index) in this.errors){
                        this.errors[index].push(c+i*9);
                    }else{
                        this.errors[index] = [c+i*9];
                    }
                }else{
                //Si les 2 ne sont pas égaux, retirer le cas de la liste errors[index] s'il existe
                    if ((index) in this.errors){
                        if (this.errors[index].includes(c+i*9)){
                            this.errors[index].splice(this.errors[index].indexOf(c+i*9),1);

                        }
                        //Si la liste errors[index] est vide, supprimer la clé
                        if (this.errors[index].length == 0){
                            delete(this.errors[index]);
                        }    
                    }
                    
                }
            }
        }
        
    }
}
