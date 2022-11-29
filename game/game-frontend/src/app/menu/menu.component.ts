import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  suggestion = this._formBuilder.group({
    suggested: false,
  });
  constructor(public gameService : GameService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  test(){
    console.log(this.gameService.game.player)
  }
}
