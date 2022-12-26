import { Injectable } from '@angular/core';
import { Map } from '../models/map';
import { Game } from '../models/game'
import { HttpClient } from '@angular/common/http';
import { Level } from '../models/level';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private m: Map;
  private m2: Map;
  public game : Game;
  public coups : number;
  public level : Level;
  public wSuggestion : boolean;
  
  constructor(private http: HttpClient) {
    this.coups = 0;
    this.m = new Map();
    this.m2 = new Map();
    this.game = new Game(this.m, this.m2);
    this.level = Level.easy;

    //test error cases
    // this.game.errors.push(3);
    // this.game.errors.push(2);

    // this.http.get("https://sudoku.diverse-team.fr/sudoku-provider/easy",{'responseType': 'text'})
    // .subscribe({
    //   next: (x:string) => {for (let i = 0; i < 81; i++){
    //     this.m.cas[i]=parseInt(x.charAt(i));
    //     if (this.m.cas[i] == 0){
    //       this.m2.cas[i] = 0;
    //     }else{
    //       this.m2.cas[i] = 1;
    //     }
    //   }}
    // });

    //this.initGame()
    
    
    this.game.player = 'Foo'
  }
  
  // Try promise and async
  async initGame(){
    const res = await this.http.get(`http://localhost:4445/newGame/${this.level}`,{'responseType': 'json'}).toPromise()
    console.log(res)
    let body = JSON.parse(JSON.stringify(res))
    console.log('body '+body['map'])
    const data = body['map']
    for (let i = 0; i < 81; i++){
      this.m.cas[i]=parseInt(data.charAt(i));

      if (this.m.cas[i] == 0){
        this.m2.cas[i] = 0;
      }else{
        this.m2.cas[i] = 1;
      }
    }
    this.game.updateHelpTiles()
    // const res = await this.http.get(`https://sudoku.diverse-team.fr/sudoku-provider/${this.level}`,{'responseType': 'text'}).toPromise()
    // const data = res!
    // for (let i = 0; i < 81; i++){
    //   this.m.cas[i]=parseInt(data.charAt(i));

    //   if (this.m.cas[i] == 0){
    //     this.m2.cas[i] = 0;
    //   }else{
    //     this.m2.cas[i] = 1;
    //   }
    // }
    // this.game.updateHelpTiles()
  }
  async callExistingGame(){
    const res = await this.http.get(`http://localhost:4445/game/${this.level}`,{'responseType': 'json'}).toPromise()
    console.log(res);
    let body = JSON.parse(JSON.stringify(res))
    console.log('body '+body['level'])
    const data = body['level']
    for (let i = 0; i < 81; i++){
      this.m.cas[i]=parseInt(data.charAt(i));

      if (this.m.cas[i] == 0){
        this.m2.cas[i] = 0;
      }else{
        this.m2.cas[i] = 1;
      }
    }
    this.game.updateHelpTiles()
  }

}
