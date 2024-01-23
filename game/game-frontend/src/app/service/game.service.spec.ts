import { TestBed } from '@angular/core/testing';

import { ExistingGame, GameService, Leaderboard, NewGame } from './game.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TreeUndoHistory } from 'interacto';
describe('GameService', () => {
  let service: GameService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [TreeUndoHistory],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('new game works', async () => {
    const promise : Promise<NewGame> = service.getNewGame();
    const testData = 
      {
        "id":11,
        "map":"000342850000079420284061739973186540000234978802957613000790284398425167427618395",
        "level":"easy"
      }
    const req = httpTestingController.expectOne('api/newGame/easy');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    const newGame: NewGame = await promise;
    expect(newGame.map.length).toEqual(81);
    expect(newGame.id).toEqual(11);
    expect(newGame.level).toEqual('easy');
  });

  it('exsiting game works', async () => {
    const promise : Promise<ExistingGame> = service.getExistingGame();
    const testData = 
      {
        "id":11,
        "map":"000342850000079420284061739973186540000234978802957613000790284398425167427618395",
        "level":"easy"
      }
    const req = httpTestingController.expectOne('api/game/easy');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    const existingGame: ExistingGame = await promise;
    expect(existingGame.map.length).toEqual(81);
    expect(existingGame.id).toEqual(11);
    expect(existingGame.level).toEqual('easy');
  });

  it('leaderboard works', async () => {
    const promise : Promise<Array<Leaderboard>> = service.getLeaderBoard('1');
    const testData : Array<Leaderboard> = 
    [
      {
        "mapId":1,
        "level":"easy",
        "score":20,
        "player":"Phuong"
      },
      {
        "mapId":1,
        "level":"easy",
        "score":25,
        "player":"Tung"
      }
    ]
    const req = httpTestingController.expectOne('api/leaderboard/easy/1');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    const leaderboards: Array<Leaderboard> = await promise;
    expect(leaderboards.length).toEqual(2);
    expect(leaderboards[0].mapId).toEqual(1);
    expect(leaderboards[1].mapId).toEqual(1);

  });
});

/*
it('allFoos works', async () => {
  // Put the promise into a variable
  const promise: Promise<Array<Foo>> = service.getallFoos();


  // Answer to the fake query with fake data
  const testData: Array<Foo> = 
      [{
        'a': 1,
        'b': 'vv'
      },
      {
        'a': 2,
        'b': 'ff'
      }
    ];

  // Build the fake REST query (expectOne, toEqual('GET'), flush(testData))
  const req = httpTestingController.expectOne('api/v1/foos');
  expect(req.request.method).toEqual('GET');
  req.flush(testData);
  //httpTestingController.verify();
  // end of the query mocking


  // Once the REST query executed, await the results. So your test must be async
  const foos: Array<Foo> = await promise;

  expect(foos.length).toEqual(2);
});
*/