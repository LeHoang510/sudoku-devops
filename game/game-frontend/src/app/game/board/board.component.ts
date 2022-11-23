import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  a = Array.from(Array(81).keys()).map(x => x + 1);
  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }

  increaseCoup(){
    this.gameService.coups ++;
    console.log(this.gameService.coups);
  }

}
