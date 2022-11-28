import { Map } from "./map";
export class Game {

    public player : string
    public map : Map;
    public map2 : Map;
    public errors : {[id:number]:number[]} =  {};

    public constructor(m: Map, m2: Map){
        // for storing value
        this.map = m;
        // to check if it is a given case
        this.map2 = m2;
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
    checkCase(index : number, value : number) : boolean{

        var res : boolean = true;
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
        this.map.cas[index]=value
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

        return res;
    }

    public setValue(i:number, val : number){
        console.log("case " + i + " from "+ this.map.cas[i] + " to "+ val ) 
        this.checkCase(i,val)
        this.updateHelpTiles()
    }


    public getX(index : number) : number {
        return index % 9
    }

    public getY(index : number) : number {
        return Math.floor(index/9)
    }

    public twoDtoOneD (x : number, y: number) : number{
        return y*9 + x;
    }

    // get the whole column
    public getCol(index : number) : number[]{
        var res:number[] = []
        var x = this.getX(index)
        for (var i = 0; i<9; i++){
            res.push(this.twoDtoOneD(x,i))
        }
        return res
    }

    // get the whole row
    public getLig(index : number) : number[]{
        var res:number[] = []
        var y = this.getY(index)
        for (var i = 0; i<9; i++){
            res.push(this.twoDtoOneD(i,y))
        }
        return res
    }

    // get the whole square
    public getSq(index : number) : number[]{
        var res:number[] = []
        var xOffset = Math.floor(this.getX(index) / 3)
        // console.log(xOffset)
        var yOffset = Math.floor(this.getY(index) / 3)
        // console.log(yOffset)
        for (var i = 0; i<3; i++){
            for (var j = 0; j<3; j++){
                res.push(this.twoDtoOneD(xOffset*3+i,yOffset*3+j))
            }
        }
        return res
    }
    
    // update help tiles of every case
    public updateHelpTiles(){
        for (let i = 0; i < 81; i++){
            if (this.map.cas[i] == 0){
                
                for (var j = 1; j <= 9; j++){
                    this.map.helpTiles[i].add(j)
                }

                for(var a = 0; a < 9; a++){
                    this.map.helpTiles[i].delete(this.map.cas[this.getCol(i)[a]])
                    this.map.helpTiles[i].delete(this.map.cas[this.getLig(i)[a]])
                    this.map.helpTiles[i].delete(this.map.cas[this.getSq(i)[a]])
                }

            } else {
                this.map.helpTiles[i].clear()
            }

            // for debug purpose

            // let res :string = ''
            // this.map.helpTiles[i].forEach(function(i){
            //     res = res+i.toString()
            // })
            // console.log("for case " + i + " val : " + this.map.cas[i] + ", Rec tiles : " + res)
        }
    }

    public checkEnd() : boolean{
        var res : boolean = true
        return res
    }

}
