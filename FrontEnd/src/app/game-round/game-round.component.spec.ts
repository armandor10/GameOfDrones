import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { routing } from '../app.routing';
import {GamePlayersComponent} from '../game-players/game-players.component';
import {GameRoundComponent} from '../game-round/game-round.component';
import {GameOutcomeComponent} from '../game-outcome/game-outcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import {GameService} from '../game.service';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Player } from '../shared/player';
import { Move } from '../shared/move';

describe('GameRoundComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        routing,
        ReactiveFormsModule,
        NgxLoadingModule.forRoot({}),
        HttpClientTestingModule
    ],
    declarations: [
        AppComponent,
        GamePlayersComponent,
        GameRoundComponent,
        GameOutcomeComponent
      ],
    providers: [
      GameService
    ]
    }).compileComponents();
  }));

  it('should create ', () => {
    const fixture = TestBed.createComponent(GameRoundComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should win player1 with Paper move', () => {
    const fixture = TestBed.createComponent(GameRoundComponent);
    const app = fixture.componentInstance;
    
    localStorage.setItem("game", '{gameId:1}');
    
    const player1 = new Player();
    player1.name = "Juan";
    player1.move = new Move();
    player1.move.name = "Paper"
    
    const player2 = new Player();
    player2.name = "Carlos";
    player2.move = new Move();
    player2.move.name = "Rock";

    app.rockHandler
      .setNext(app.paperHandler)
      .setNext(app.scissorsHandler);
    const resp = app.rockHandler.handle(player1,player2);

    expect(resp.name).toEqual(player1.name);
  });

});
