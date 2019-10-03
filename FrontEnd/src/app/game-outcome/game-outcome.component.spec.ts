import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { routing } from '../app.routing';
import {GamePlayersComponent} from '../game-players/game-players.component';
import {GameRoundComponent} from '../game-round/game-round.component';
import {GameOutcomeComponent} from '../game-outcome/game-outcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import {GameService} from '../game.service';
import { NgxLoadingModule } from 'ngx-loading';

describe('GameOutcomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        routing,
        ReactiveFormsModule,
        NgxLoadingModule.forRoot({})
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
    const fixture = TestBed.createComponent(GameOutcomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
