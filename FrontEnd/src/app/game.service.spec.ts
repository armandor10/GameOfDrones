import { TestBed,  getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Game } from './shared/game';
import { Player } from './shared/player';
import { Round } from './shared/round';

import { GameService } from './game.service';

describe('GameService', () => {
  let injector: TestBed;
  let service: GameService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });

    injector = getTestBed();
    service = injector.get(GameService);
  });

  it('should be created', () => {
    //const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  it('should return a game', () => {
    (done: DoneFn) => {
      const gameID = 1;
      const dummyGame = new Game();
      dummyGame.gameID = 1;
      dummyGame.rounds = [];
      dummyGame.players = [];
      dummyGame.players.push({
          playerID: 1,
          name: "diego",
          move: null
      });
      dummyGame.players.push({
          playerID: 2,
          name: "armando",
          move: null
      });

      service.getGame(gameID)
      .subscribe(response => {
        const resp:any = response;
        expect(resp.status).toBeTruthy();
        expect(resp.data).toEqual(dummyGame);
        done();
      }, err => {
        done();
      });
   }

  });

  it(`should return some game' rounds`, () => {
    const gameID = 1;
    service.getGameRound(gameID)
    .subscribe(response => {
      const resp:any = response;
      expect(resp.status).toBeTruthy();
      expect(resp.data.length).toBeGreaterThanOrEqual(0);
    });
  });

});
