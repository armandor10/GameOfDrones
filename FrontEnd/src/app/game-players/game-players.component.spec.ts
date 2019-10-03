import { TestBed, async, ComponentFixture, } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { routing } from '../app.routing';
import {GamePlayersComponent} from '../game-players/game-players.component';
import {GameRoundComponent} from '../game-round/game-round.component';
import {GameOutcomeComponent} from '../game-outcome/game-outcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import {GameService} from '../game.service';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Game } from '../shared/game';

describe('GamePlayersComponent', () => {

  let component: GamePlayersComponent;
  let fixture: ComponentFixture<GamePlayersComponent>;

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

    fixture = TestBed.createComponent(GamePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create ', () => {
    const fixture = TestBed.createComponent(GamePlayersComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get a game', () => {
    var players:any = {player1:"Diego", player2:"Juan"};

    const resp:Game = component.getGame(players);
    expect(resp.players[0].name).toEqual(players.player1);
  })

});
