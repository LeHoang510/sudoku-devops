import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit {

  constructor(public dialog : MatDialog, public gameService: GameService) { }

  ngOnInit(): void {
  }

  test(){
    console.log(this.gameService.game.player)
  }

  openDialog(){
    this.dialog.open(DialogComponent,{});
    console.log(this.gameService.coups); 
  }
}