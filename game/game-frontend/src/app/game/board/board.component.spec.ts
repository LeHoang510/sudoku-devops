import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { GameService } from 'src/app/service/game.service';
import { Level } from 'src/app/models/level';
import { interactoTreeUndoProviders } from 'interacto-angular';

describe('BoardComponent', async () => {
  // component initializer
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  // Game service initializer
  let gameService: GameService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {

    const viewCompiler = await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [GameService,
        interactoTreeUndoProviders(true),
      ],
      declarations: [ BoardComponent ]
    })
    gameService = TestBed.inject(GameService);
    httpTestingController = TestBed.inject(HttpTestingController);
    gameService.game.level = Level.easy;
    const res : Promise<void>= gameService.initGame();
    const testData =
      {
        "id": "11",
        "map":"000342850000079420284061739973186540000234978802957613000790284398425167427618395",
        "level":"easy"
      }
    const req = httpTestingController.expectOne('api/newGame/easy');
    req.flush(testData);
    await res;

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    viewCompiler.compileComponents();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

});
