import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpXhrBackend} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import {GameOutcomeComponent} from './game-outcome/game-outcome.component';
import {GamePlayersComponent} from './game-players/game-players.component';
import {GameRoundComponent} from './game-round/game-round.component';
import { routing } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import {GameService} from './game.service';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        routing,
        ReactiveFormsModule,
        NgxLoadingModule.forRoot({})
    ],
    declarations: [
        AppComponent,
        GameOutcomeComponent,
        GamePlayersComponent,
        GameRoundComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        GameService
    ]
})
export class AppModule{
    
}