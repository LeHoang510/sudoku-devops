import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public gameService : GameService ) { }

  ngOnInit(): void {
  }

  test(){
    console.log(this.gameService.game.player)
  }
}
