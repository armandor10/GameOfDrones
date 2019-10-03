import { Routes, RouterModule } from "@angular/router";
import { GamePlayersComponent } from './game-players/game-players.component';
import { GameRoundComponent } from './game-round/game-round.component';
import { GameOutcomeComponent } from './game-outcome/game-outcome.component'

const appRoutes: Routes = [
    {path: 'newgame', component: GamePlayersComponent},
    {path: 'round', component: GameRoundComponent},
    {path: 'overcome/:winner', component: GameOutcomeComponent},
    {path: '', pathMatch:'full', redirectTo:'newgame'},
    {path: '**',  pathMatch:'full', redirectTo:'newgame'}
];

export const routing = RouterModule.forRoot(appRoutes);