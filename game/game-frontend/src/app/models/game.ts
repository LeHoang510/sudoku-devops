import { Map } from "./map";
export class Game {

    public player : string;
    public coups : number;
    public map : Map;
    public map2 : Map;
    public errors : {[id:number]:number[]} =  {};

    public constructor(m: Map, m2: Map){
        // for storing value
        this.map = m;
        // to check if it is a given case
        this.map2 = m2;
        this.coups = 0;
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

        //Si value égal à 0, supprimer clé index dans errors s'il existe
        if (value == 0){
            if (index in this.errors){
                delete(this.errors[index]);
            }
            return Object.keys(this.errors).length === 0;
        }else{
            // Sinon, comparer le avec les cas en même ligne, même colonne
            // var r = this.getY(index)
            // var c = this.getX(index)
            // for (let i=0;i<9;i++){
            //     //Comparer avec les cas en même ligne, si égal, créer or ajouter dans errors[index]
            //     if((value == this.map.cas[r*9 + i])&&((r*9+i != index))){
            //         if (index in this.errors){
            //             this.errors[index].push(r*9+i);
            //         }else{
            //             this.errors[index] = [r*9+i];
            //         }
            //     }else{
            //     //Si les 2 ne sont pas égaux, retirer le cas de la liste errors[index] s'il existe
            //         if ((index) in this.errors){
            //             if (this.errors[index].includes(r*9+i)){
            //                 this.errors[index].splice(this.errors[index].indexOf(r*9+i),1); 
            //             }
            //             //Si la liste errors[index] est vide, supprimer la clé
            //             if (this.errors[index].length == 0){
            //                 delete(this.errors[index]);
            //             } 
            //         }
            //     }
            //     //Comparer avec les cas en même colone, si égal, créer or ajouter dans errors[index]
            //     if((value == this.map.cas[c + i*9])&&((c + i*9 != index))){
            //         if ((index) in this.errors){
            //             this.errors[index].push(c+i*9);
            //         }else{
            //             this.errors[index] = [c+i*9];
            //         }
            //     }else{
            //     //Si les 2 ne sont pas égaux, retirer le cas de la liste errors[index] s'il existe
            //         if ((index) in this.errors){
            //             if (this.errors[index].includes(c+i*9)){
            //                 this.errors[index].splice(this.errors[index].indexOf(c+i*9),1);

            //             }
            //             //Si la liste errors[index] est vide, supprimer la clé
            //             if (this.errors[index].length == 0){
            //                 delete(this.errors[index]);
            //             }    
            //         }
            //     }

            //     //Comparer avec les cas en même bloc, si égal, créer or ajouter dans errors[index]
            //     var tmp = this.getSq(index)
            //     if((value == this.map.cas[tmp[i]])&&((tmp[i] != index))){
            //         if ((index) in this.errors){
            //             this.errors[index].push(tmp[i]);
            //         }else{
            //             this.errors[index] = [tmp[i]];
            //         }
            //     }else{
            //     //Si les 2 ne sont pas égaux, retirer le cas de la liste errors[index] s'il existe
            //         if ((index) in this.errors){
            //             if (this.errors[index].includes(tmp[i])){
            //                 this.errors[index].splice(this.errors[index].indexOf(tmp[i]),1);

            //             }
            //             //Si la liste errors[index] est vide, supprimer la clé
            //             if (this.errors[index].length == 0){
            //                 delete(this.errors[index]);
            //             }    
            //         }
            //     }
            // }

            var res1 = this.checkBloc(index,value)
            var res2 = this.checkCol(index,value) 
            var res3 = this.checkLig(index,value)
            return res1 && res2 && res3
        }
    }

    checkBloc(index : number, value : number) : boolean{
        var res = true // true = no error ; false = error
        var tmp = this.getSq(index)
        
        //Comparer avec les cas en même bloc, si égal, créer or ajouter dans errors[index]
        for (let i=0;i<9;i++){
            if((value == this.map.cas[tmp[i]])&&((tmp[i] != index))){
                res = false
                if ((index) in this.errors){
                    this.errors[index].push(tmp[i]);
                }else{
                    this.errors[index] = [tmp[i]];
                }
            }else{
            //Si les 2 ne sont pas égaux, retirer le cas de la liste errors[index] s'il existe
                if ((index) in this.errors){
                    if (this.errors[index].includes(tmp[i])){
                        this.errors[index].splice(this.errors[index].indexOf(tmp[i]),1);
    
                    }
                    //Si la liste errors[index] est vide, supprimer la clé
                    if (this.errors[index].length == 0){
                        delete(this.errors[index]);
                    }    
                }
            }
        }

        // for debug purpose
        // if(!res){
        //     console.log("fault bloc")
        // } else {
        //     console.log("bonne bloc")
        // }

        return res
    }

    checkCol(index : number, value : number) : boolean{
        var res = true // true = no error ; false = error
        var tmp = this.getCol(index)

        //Comparer avec les cas en même col, si égal, créer or ajouter dans errors[index]
        for (let i=0;i<9;i++){
            if((value == this.map.cas[tmp[i]])&&((tmp[i] != index))){
                res = false
                if ((index) in this.errors){
                    this.errors[index].push(tmp[i]);
                }else{
                    this.errors[index] = [tmp[i]];
                }
            }else{
            //Si les 2 ne sont pas égaux, retirer le cas de la liste errors[index] s'il existe
                if ((index) in this.errors){
                    if (this.errors[index].includes(tmp[i])){
                        this.errors[index].splice(this.errors[index].indexOf(tmp[i]),1);
    
                    }
                    //Si la liste errors[index] est vide, supprimer la clé
                    if (this.errors[index].length == 0){
                        delete(this.errors[index]);
                    }    
                }
            }
        }

        // for debug purpose
        // if(!res){
        //     console.log("fault col")
        // } else {
        //     console.log("bonne col")
        // }

        return res
    }

    checkLig(index : number, value : number) : boolean{
        var res = true // true = no error ; false = error
        var tmp = this.getLig(index)
        
        //Comparer avec les cas en même ligne, si égal, créer or ajouter dans errors[index]
        for (let i=0;i<9;i++){
            if((value == this.map.cas[tmp[i]])&&((tmp[i] != index))){
                res = false
                if ((index) in this.errors){
                    this.errors[index].push(tmp[i]);
                }else{
                    this.errors[index] = [tmp[i]];
                }
            }else{
            //Si les 2 ne sont pas égaux, retirer le cas de la liste errors[index] s'il existe
                if ((index) in this.errors){
                    if (this.errors[index].includes(tmp[i])){
                        this.errors[index].splice(this.errors[index].indexOf(tmp[i]),1);
    
                    }
                    //Si la liste errors[index] est vide, supprimer la clé
                    if (this.errors[index].length == 0){
                        delete(this.errors[index]);
                    }    
                }
            }
        }

        // for debug purpose
        // if(!res){
        //     console.log("fault ligne")
        // } else {
        //     console.log("bonne ligne")
        // }

        return res
    }

    public setValue(i:number, val : number){ // check case + check end game
        console.log("case " + i + " from "+ this.map.cas[i] + " to "+ val ) 
        this.checkCase(i,val)
        this.map.cas[i]=val
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
        for (let c of this.map.cas){
            if (c == 0){
                return false
            }
        }
        return Object.keys(this.errors).length === 0;
    }

}
