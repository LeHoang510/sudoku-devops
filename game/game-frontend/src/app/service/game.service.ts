import { Injectable } from '@angular/core';
import { Map } from '../models/map';
import { Game } from '../models/game'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private m: Map;
  private m2: Map;
  public game : Game;
  public coups : number;
  
  constructor(private http: HttpClient) {
    this.coups = 0;
    this.m = new Map();
    this.m2 = new Map();
    this.game = new Game(this.m, this.m2);

    //test error cases
    // this.game.errors.push(3);
    // this.game.errors.push(2);

    this.http.get("https://sudoku.diverse-team.fr/sudoku-provider/inhuman",{'responseType': 'text'}).subscribe({
      next: (x:string) => {for (let i = 0; i < 81; i++){
        this.m.cas[i]=parseInt(x.charAt(i));
        if (this.m.cas[i] == 0){
          this.m2.cas[i] = 0;
        }else{
          this.m2.cas[i] = 1;
        }
      }} 
    });

    
    //console.log(this.m2.toString());
    // this.m.cas = [5,3,0,0,7,0,0,0,0,
    //               6,0,0,1,9,5,0,0,0,
    //               0,9,8,0,0,0,0,6,0,
    //               8,0,0,0,6,0,0,0,3,
    //               4,0,0,8,0,3,0,0,1,
    //               7,0,0,0,2,0,0,0,6,
    //               0,6,0,0,0,0,2,8,0,
    //               0,0,0,4,1,9,0,0,5,
    //               0,0,0,0,8,0,0,7,9]
    
  }
  
}
