import { Component } from '@angular/core';
import { Game } from './models/game';
import { GameService } from './service/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sudoku';
  a = Array.from(Array(81).keys()).map(x => x + 1);

  currGame : Game = new Game();

  constructor(private gameService: GameService) {
    this.currGame.map = this.gameService.getMap();
  }

}
