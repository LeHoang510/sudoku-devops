import { Component, OnInit} from '@angular/core';
import { GameService } from '../service/game.service';
import { FormBuilder } from '@angular/forms';
import { Level } from '../models/level';
import { Router } from '@angular/router';
import { SetValue } from 'src/app/command/set-value';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // For displaying different levels
  level = Level;

  // For creating checkbox 
  suggestion = this._formBuilder.group({
    suggested: false,
  });

  // for filling the mat grid list
  a = Array.from(Array(81).keys());

  constructor(public gameService : GameService, private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // get an existing game upon creation of menu component
    this.gameService.callExistingGame();
    // Initially no player name is provided, it can be assigned randomly upon the begining of the game
    this.gameService.game.player='';
  }

  generateMap(){ //Get a new map get and go to board component to start playing the game
    this.gameService.initGame();
    this.router.navigateByUrl('/board');
  }

  // Update the choosen level
  getLevel(l : Level){
    this.gameService.game.level = l;
  }

  public existingGame(){ //start playing the game with an existing map
    this.router.navigateByUrl('/board');
  }
}