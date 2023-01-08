import { Injectable } from '@angular/core';
import { Map } from '../models/map';
import { Game } from '../models/game'
import { HttpClient } from '@angular/common/http';
import { Level } from '../models/level';
import { TreeUndoHistory } from 'interacto';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private m: Map;
  private m2: Map;
  public game : Game;

  //for leaderboard
  public players : string[];
  public scores : number[];

  
  constructor(private http: HttpClient, private hist:TreeUndoHistory) {
    this.m = new Map();
    this.m2 = new Map();
    this.game = new Game(this.m, this.m2, http);
    this.game.level = Level.easy;
    this.players =[]
    this.scores =[]
    this.game.player = 'Foo'
  }
  
  // Try promise and async
  async initGame(){
    console.log("generate game");
    const res = await this.http.get(`http://localhost:4445/newGame/${this.game.level}`,{'responseType': 'json'}).toPromise()
    console.log(res)
    let body = JSON.parse(JSON.stringify(res))
    console.log('map '+body['map'])
    console.log('ID '+body['id'])
    this.game.mapID = body['id']
    const data = body['map']
    for (let i = 0; i < 81; i++){
      this.m.cas[i]=parseInt(data.charAt(i));
      if (this.m.cas[i] == 0){
        this.m2.cas[i] = 0;
      }else{
        this.m2.cas[i] = 1;
      }
    }
    this.hist.clear;
    this.game.updateHelpTiles()
  }

  async callExistingGame(){
    console.log("call existing game");
    const res = await this.http.get(`http://localhost:4445/game/${this.game.level}`,{'responseType': 'json'}).toPromise()
    console.log(res);
    let body = JSON.parse(JSON.stringify(res))
    console.log('map '+body['level'])
    console.log('ID '+body['id'])
    console.log('ID after call '+ this.game.mapID)
    // Update info of game
    this.game.mapID = body['id']
    const data = body['level']
    for (let i = 0; i < 81; i++){
      this.m.cas[i]=parseInt(data.charAt(i));
      if (this.m.cas[i] == 0){
        this.m2.cas[i] = 0;
      }else{
        this.m2.cas[i] = 1;
      }
    }
    this.game.wSuggestion = false;
    this.hist.clear;
    this.game.updateHelpTiles()
    this.callLeaderBoard(this.game.mapID)
  }

  async callLeaderBoard(idmap: string){
    const res = await this.http.get(`http://localhost:4445/leaderboard/${this.game.level}/`+idmap,{'responseType': 'json'}).toPromise()
    console.log(res);
    let body = JSON.parse(JSON.stringify(res))
    this.scores=[]
    this.players=[]
    for(var i=0;i<body.length;i++){
      this.scores.push(parseInt(body[i]['score']))
      this.players.push(body[i]['player'])
    }
    //for test
    for(var i=0;i<this.players.length;i++){
      console.log("Player: "+this.players[i]+" score: "+this.scores[i])
    }
  }
}
