import { Component,OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Player } from '../shared/player';
import { Game } from '../shared/game';
import { Response } from '../shared/response';

@Component({
    selector: 'mw-game-players',
    templateUrl: './game-players.component.html',
    styleUrls: ['./game-players.component.css']
})
export class GamePlayersComponent implements OnInit {

    public loading = false;
    form: FormGroup;
    response:any;

    constructor(private formBuilder: FormBuilder,
        private router:Router,
        private _gameService:GameService){}
    
    ngOnInit(){
        // 
        if( localStorage.getItem('game') ) this.router.navigate(['/round']);   

        this.form = this.formBuilder.group({
            player1: this.formBuilder.control('', Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z]+$')
            ])),
            player2: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z]+$')
              ])),
          });
    }

    getGame(players):Game{
        const game = new Game();
        let player = new Player();
        player.name = players.player1;
        game.players = new  Array<Player>();
        game.players.push(player);
        player = new Player();
        player.name = players.player2;
        game.players.push(player);
        return game;
    }

    onSubmit(players){
        console.log(players);
        const game = this.getGame(players);
        //console.log(game);
        this.loading = true;
        this._gameService.createGame(game)
        .subscribe( data => {
            this.response = data;
            this.loading = false;
            localStorage.setItem('game', JSON.stringify(this.response.data));
            this.router.navigate(['/round']);    
        });    
    }
}