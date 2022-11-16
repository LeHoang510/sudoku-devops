import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit {
  name!: string;

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
    this.name = "Foo";
  }

  openDialog(){
    this.dialog.open(DialogComponent,{});
  }
}