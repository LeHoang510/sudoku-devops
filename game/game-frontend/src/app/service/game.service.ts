import { Injectable } from '@angular/core';
import { Map } from '../models/map';
import { Game } from '../models/game'
import { HttpClient } from '@angular/common/http';
import { Level } from '../models/level';
import { TreeUndoHistory } from 'interacto';
import { lastValueFrom } from 'rxjs';

export interface NewGame{
  id : number;
  map : string;
  level : Level;
}
export interface ExistingGame{
  id : number;
  map : string;
  level : Level;
}

export interface Leaderboard{
  mapId : number;
  level : string;
  score : number;
  player : string;
}
@Injectable({
  providedIn: 'root'
})

export class GameService {

  // For info of the game
  public m: Map;
  public m2: Map;
  public game : Game;

  //for leaderboard
  public players : string[];
  public scores : number[];

  // Inititate a game and a leaderboard
  constructor(private http: HttpClient, public hist:TreeUndoHistory) {
    this.m = new Map();
    this.m2 = new Map();
    this.game = new Game(this.m, this.m2, http);
    this.game.level = Level.easy;
    this.players =[]
    this.scores =[]
    this.game.player = ''
  }
  
  // Affect the game and the leaderboard with the data of a newly generated game
  async initGame(){
    // clear history of old game 
    this.hist.clear();
    console.log("generate game");
    // Get data of a generated game
    const res = await this.http.get(`api/newGame/${this.game.level}`,{'responseType': 'json'}).toPromise()
    // printout the data
    console.log(res)
    const body = JSON.parse(JSON.stringify(res))
    console.log('map '+body.map)
    console.log('ID '+body.id)
    // modify data of the game
    this.game.mapID = body.id
    const data = body.map
    for (let i = 0; i < 81; i++){
      this.m.cas[i]=parseInt(data.charAt(i));
      if (this.m.cas[i] == 0){
        this.m2.cas[i] = 0;
      }else{
        this.m2.cas[i] = 1;
      }
    }
    console.log(this.m.cas.join(''))
    // modify data of the leaderboard
    this.scores=[]
    this.players=[]
    // Update suggestion
    this.game.updateHelpTiles()
  }

  async callExistingGame(){
    // clear data of old game
    this.hist.clear();
    this.game.coups = 0;
    this.game.wSuggestion = false;
    // Get data of an existing game
    console.log("call existing game");
    const res = await this.http.get(`api/game/${this.game.level}`,{'responseType': 'json'}).toPromise()
    // Print the data of the existing game acquired from server
    console.log(res);
    const body = JSON.parse(JSON.stringify(res))
    console.log('level '+body.level)
    console.log('map '+body.map)
    console.log('ID '+body.id)
    console.log('ID after call '+ this.game.mapID)
    // Update info of game
    this.game.mapID = body.id
    const data = body.map
    for (let i = 0; i < 81; i++){
      this.m.cas[i]=parseInt(data.charAt(i));
      if (this.m.cas[i] == 0){
        this.m2.cas[i] = 0;
      }else{
        this.m2.cas[i] = 1;
      }
    }
    // Update suggestion
    this.game.updateHelpTiles()
    // Update the leaderboard
    this.callLeaderBoard(this.game.mapID)
  }

  async callLeaderBoard(idmap: string){
    // Clear data of previous game
    this.scores=[]
    this.players=[]
    // Get the data of the leaderboard
    const res = await this.http.get(`api/leaderboard/${this.game.level}/`+idmap,{'responseType': 'json'}).toPromise()
    console.log(res);
    // Add leaderboard data
    const body = JSON.parse(JSON.stringify(res))
    for(var i=0;i<body.length;i++){
      this.scores.push(parseInt(body[i].score))
      this.players.push(body[i].player)
    }
    for(var i=0;i<this.players.length;i++){
      console.log("Player: "+this.players[i]+" score: "+this.scores[i])
    }
  }

  public getNewGame() : Promise<NewGame>{
    return lastValueFrom(this.http.get<NewGame>(`api/newGame/${this.game.level}`));
  }

  public getExistingGame() : Promise<ExistingGame>{
    return lastValueFrom(this.http.get<ExistingGame>(`api/game/${this.game.level}`));
  }

  public getLeaderBoard(idmap : string) : Promise<Array<Leaderboard>>{
    return lastValueFrom(this.http.get<Array<Leaderboard>>(`api/leaderboard/${this.game.level}/${idmap}`));
  }
}
