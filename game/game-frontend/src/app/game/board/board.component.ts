import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { PartialPointBinder } from 'interacto';
import { SetValue } from 'src/app/command/set-value';
import { PartialMatSelectBinder, TreeHistoryComponent } from 'interacto-angular';
// import { MatGridList } from '@angular/material/grid-list';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: []
})
export class BoardComponent implements OnInit,AfterViewInit {

  @ViewChild('treeComp')
  private treeComp: TreeHistoryComponent;
  @ViewChild('h')
  private h: ElementRef<HTMLElement>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.histWidth = `${this.h.nativeElement.clientWidth}px`
  }

  end : boolean = false
  histWidth : string

  a = Array.from(Array(81).keys());

  public constructor (public gameService: GameService) {}

  ngOnInit(): void {
    
  }

  public ngAfterViewInit(): void {
    // this thing out an error in the console
    this.histWidth = `${this.h.nativeElement.clientWidth}px`
  }

  //for testing
  test(val : number, index : number){
    // test swaping dim functions 
    console.log(this.gameService.game.getX(index))
    console.log(this.gameService.game.getY(index))
    console.log(...this.gameService.game.getSq(index))
    console.log(...this.gameService.game.getCol(index))
    console.log(...this.gameService.game.getLig(index))
  }

  increaseCoup(val: number){
    if (val != 0){
      this.gameService.coups ++;
    }
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
    .toProduce(() => new SetValue(this.gameService.game.map.cas[index], index, this.gameService.game))
    .when(i => i.button === 2 && this.gameService.game.map.helpTiles[index]?.size === 1)
    .bind();

  }

  public printRecSet(index : number) : string{
    let res :string = ''
    this.gameService.game.map.helpTiles[index].forEach(function(i){
      res = res+i.toString()
    })
    return res
  }

}
