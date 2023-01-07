import { Component, OnInit} from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  length : number[]
  constructor(public gameService:GameService){
    this.length = Array(this.gameService.players.length).fill(1).map((x,i)=>i+1);
  }

  ngOnInit(): void {
      
  }

}
