import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class MenuComponent implements AfterViewInit, OnInit {

  @ViewChild('imgTarget') imgTarget:ElementRef;

  //image = SetValue.getSnapshot(this.gameService.game,2);
  level = Level;
  // selected = Level.easy;
  suggestion = this._formBuilder.group({
    suggested: false,
  });

  a = Array.from(Array(81).keys());

  constructor(public gameService : GameService, private _formBuilder: FormBuilder, private router: Router) { 
    
  }

  ngOnInit(): void {
    //this.suggestion.value.suggested = false;
    this.gameService.callExistingGame();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.imgTarget.nativeElement.appendChild(SetValue.getSnapshot(this.gameService.game,-1,false));
    },0)
  }

  test(){
    console.log(this.gameService.game.player)
  }

  generateMap(){
    this.gameService.initGame();
    this.router.navigateByUrl('/board');
  }

  getLevel(l : Level){
    this.gameService.game.level = l;
  }

  checkSuggestion(event : boolean){
    this.gameService.game.wSuggestion = <boolean> this.suggestion.value.suggested;
    //console.log("wSuggestion" + this.gameService;
  }

  public getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
    return SetValue.getSnapshot(this.gameService.game, 0, false);
  }

  public existingGame(){
    
    this.router.navigateByUrl('/board');
  }
}
