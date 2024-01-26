import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { PartialPointBinder, PartialKeyBinder, UndoableSnapshot } from 'interacto';
import { SetValue } from 'src/app/command/set-value';
import { PartialMatSelectBinder,TreeHistoryComponent } from 'interacto-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit,AfterViewInit {

  // undo history
  @ViewChild('treeComp')
  private treeComp: TreeHistoryComponent;
  // container of undo history
  @ViewChild('h')
  private h: ElementRef<HTMLElement> = {} as ElementRef;

  // making size of history interactive
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.histWidth = `${this.h.nativeElement.clientWidth}px`
  }

  // Disable default treatment of right click event
  @HostListener('contextmenu', ['$event'])
  onRightClick(event:Event) {
    event.preventDefault();
  }

  end : boolean = false
  setByKeyPossible : boolean = false
  histWidth : string

  // for filling tiles of mat grid list 
  a = Array.from(Array(81).keys());

  public constructor (public gameService: GameService, private router : Router) {
    console.log("build board component");
  }

  // Give the player random name if they didn't enter anything
  ngOnInit(): void {
    if(this.gameService.game.player == '') {this.gameService.game.player = this.makeid();}
  }

  // set width of history component
  public ngAfterViewInit(): void {
    // The line below will trigger an error because it updates the view in the ngAfterViewInit cycle
    // this.histWidth = `${this.h.nativeElement.clientWidth}px`
  }

  //for testing
  test(val : number, index : number){
    // test swaping dim functions 
    // console.log(this.gameService.game.getX(index))
    // console.log(this.gameService.game.getY(index))
    // console.log(...this.gameService.game.getSq(index))
    // console.log(...this.gameService.game.getCol(index))
    // console.log(...this.gameService.game.getLig(index))
  }

  // increase number of moves
  increaseCoup(val: number){
    if (val != 0){
      this.gameService.game.coups ++;
    }
  }

  // Interacto binding that maps the selection of a value in an Angular Material Select
  // for producing an undoable command SetValue
  public setValue(binder: PartialMatSelectBinder, index: number) {
    
    binder.toProduce((i) => {
      console.log("inside setValue func")
      return new SetValue(parseInt(i.change?.value), index, this.gameService.game)
    })
    .bind();
  }

  // Interacto binding that maps a click with the right button on an Angular Material Select
  // for easily producing an undoable command SetValue with rightclick and the help of recommended values
  public directSet(binder: PartialPointBinder, index: number) {
    binder
    .toProduce(() => {
      console.log("from inside directSet func")
      // get the first value from the list of recommended values
      const tmp = this.gameService.game.map.helpTiles[index].values().next().value
      this.increaseCoup(tmp);
      return new SetValue(tmp, index, this.gameService.game)
    })
    // only produce when right click and the recommended values arent empty
    .when(i => i.button === 2 && this.gameService.game.map.helpTiles[index]?.size >= 1)
    .bind();
  }

  // For displaying the recommended values to the screen if player plays with suggestion
  public printRecSet(index : number) : string{
    let res :string = ''
    this.gameService.game.map.helpTiles[index].forEach(function(i){
      res = res+i.toString()
    })
    return res
  }

  // Return to menu when clicked the sodoku icon
  public returnToMenu() : void {
    console.log("returned to menu");
    this.router.navigateByUrl('/menu');
  }

  // Generate random name for player
  public makeid(){
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
  }

  public rootRenderer(): UndoableSnapshot {
    console.log("root renderer")
    console.log(this.gameService.game)
    return SetValue.getSnapshot(this.gameService.game,-1,false);
  }
}
