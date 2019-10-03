import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { routing } from '../app.routing';
import {GamePlayersComponent} from '../game-players/game-players.component';
import {GameRoundComponent} from '../game-round/game-round.component';
import {GameOutcomeComponent} from '../game-outcome/game-outcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import {GameService} from '../game.service';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpClientModule, HttpXhrBackend} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('Game of Drones');
  });

});
