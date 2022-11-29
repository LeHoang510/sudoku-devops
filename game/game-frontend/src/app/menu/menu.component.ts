import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { FormBuilder } from '@angular/forms';
import { Level } from '../models/level';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  level = Level;
  selected = Level.easy;
  suggestion = this._formBuilder.group({
    suggested: false,
  });
  constructor(public gameService : GameService, private _formBuilder: FormBuilder, private router: Router,) { }

  ngOnInit(): void {
  }

  test(){
    console.log(this.gameService.game.player)
  }

  navigationBoard(){
      this.router.navigateByUrl('/board');
  }
}
