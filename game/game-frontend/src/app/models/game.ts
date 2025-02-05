import { Map } from "./map";
import { Level } from "./level";
import { HttpClient } from '@angular/common/http';
export class Game {

    public player : string;
    public coups : number;
    public mapID : string;
    public wSuggestion : boolean;
    public level : Level;
    // for storing value
    public map : Map;
    // to check if it is a given case
    public map2 : Map;
    // Errors associated to each tiles
    public errors : {[id:number]:number[]} = {};

    public constructor(m: Map, m2: Map, private http:HttpClient){
        this.map = m;
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
        for (const i in this.errors){
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
            for (const i in this.errors){
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
        }
            const res1 = this.checkBloc(index,value)
            const res2 = this.checkCol(index,value) 
            const res3 = this.checkLig(index,value)
            return res1 && res2 && res3
        
    }

    // Detecter les erreur dans un meme bloc
    checkBloc(index : number, value : number) : boolean{
        let res = true // true = no error ; false = error
        const tmp = this.getSq(index)
        
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
        return res
    }

    // Detecter les erreur dans un meme colonne
    checkCol(index : number, value : number) : boolean{
        let res = true // true = no error ; false = error
        const tmp = this.getCol(index)

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
        return res
    }

    // Detecter les erreur dans une meme ligne
    checkLig(index : number, value : number) : boolean{
        let res = true // true = no error ; false = error
        const tmp = this.getLig(index)
        
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
        return res
    }

    // Set value 
    public setValue(i:number, val : number){
        // For debuging
        console.log("case " + i + " from "+ this.map.cas[i] + " to "+ val ) 
        // check case if there is error upon the move
        this.checkCase(i,val)
        // Change the value of the case
        this.map.cas[i]=val
        // Update suggested tiles
        this.updateHelpTiles()

        // Check if endgame if yes save gave in the backend
        if (this.checkEnd()&&!this.wSuggestion){
            if(Object.keys(this.errors).length === 0){
                this.http.post<any>('api/game', { 
                    "mapId":this.mapID,
                    "level":this.level,
                    "score":this.coups,
                    "player":this.player
                }).subscribe();
            }
        }
    }
    
    // update help tiles of every case
    public updateHelpTiles(){
        for (let i = 0; i < 81; i++){
            if (this.map.cas[i] == 0){
                
                for (let j = 1; j <= 9; j++){
                    this.map.helpTiles[i].add(j)
                }

                for(let a = 0; a < 9; a++){
                    this.map.helpTiles[i].delete(this.map.cas[this.getCol(i)[a]])
                    this.map.helpTiles[i].delete(this.map.cas[this.getLig(i)[a]])
                    this.map.helpTiles[i].delete(this.map.cas[this.getSq(i)[a]])
                }
            } else {
                this.map.helpTiles[i].clear()
            }
        }
    }

    // Check if endgame
    public checkEnd() : boolean{
        for (const c of this.map.cas){
            if (c == 0){
                return false
            }
        }
        return Object.keys(this.errors).length === 0;
    }

    //////////////////////////////////////// BELOW ARE THE SET OF FUNCTION FOR WORKING WITH 2D MAP FROM A 1D ARRAY

    // Get column
    public getX(index : number) : number {
        return index % 9
    }

    // Get line
    public getY(index : number) : number {
        return Math.floor(index/9)
    }

    // From and 2D coord to 1D coord
    public twoDtoOneD (x : number, y: number) : number{
        return y*9 + x;
    }

    // get the whole column
    public getCol(index : number) : number[]{
        const res:number[] = []
        const x = this.getX(index)
        for (let i = 0; i<9; i++){
            res.push(this.twoDtoOneD(x,i))
        }
        return res
    }

    // get the whole row
    public getLig(index : number) : number[]{
        const res:number[] = []
        const y = this.getY(index)
        for (let i = 0; i<9; i++){
            res.push(this.twoDtoOneD(i,y))
        }
        return res
    }

    // get the whole square
    public getSq(index : number) : number[]{
        const res:number[] = []
        const xOffset = Math.floor(this.getX(index) / 3)
        const yOffset = Math.floor(this.getY(index) / 3)
        for (let i = 0; i<3; i++){
            for (let j = 0; j<3; j++){
                res.push(this.twoDtoOneD(xOffset*3+i,yOffset*3+j))
            }
        }
        return res
    }
    ///////////////////////////////////////////////////////// END
}
