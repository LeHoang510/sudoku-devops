import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
//the only purpose is to contains leaderboard and the board in the same place 
export class GameComponent implements OnInit { 
  constructor() { }

  ngOnInit(): void {
    
  }

}
