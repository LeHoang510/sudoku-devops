import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { PartialSelectBinder} from 'interacto';
import { PartialPointBinder } from 'interacto';
import { SetValue } from 'src/app/command/set-value';
import { PartialMatSelectBinder } from 'interacto-angular';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  a = Array.from(Array(81).keys());

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }

  increaseCoup(i :number, value : any){
    console.log("hello "+i.toString()+ " hi "+value.toString())
    this.gameService.coups ++;
    console.log(this.gameService.coups);
    this.gameService.game.checkCase(i,value.target.value);
  }

  // Interacto binding that maps the selection of a value in an Angular Material Select
  // for producing an undoable command SetValue
  public setValue(binder: PartialMatSelectBinder, index: number) {

    binder.toProduce(i => new SetValue(parseInt(i.change?.value), index, this.gameService.game))
    .bind();

  }

  // Interacto binding that maps a click with the right button on an Angular Material Select
  // for producing an undoable command SetValue that durectly uses the single suggested value
  public directSet(binder: PartialPointBinder, index: number) {

    binder
    .toProduce(() => new SetValue(this.gameService.game.map.cas[index], index, this.gameService.currentGame))
    .when(i => i.button === 2 && this.gameService.game.map.helpTiles[index]?.size === 1)
    .bind();

  }

}
