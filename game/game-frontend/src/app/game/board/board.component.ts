import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
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

}
