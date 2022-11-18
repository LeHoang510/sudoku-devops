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
  name!: string;

  constructor(public dialog : MatDialog, public gameService: GameService) { }

  ngOnInit(): void {
    this.name = "Foo";
  }

  openDialog(){
    this.dialog.open(DialogComponent,{});
    console.log(this.gameService.coups); // service not singleton
  }
}