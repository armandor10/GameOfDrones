import { Component,OnInit  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Move } from '../shared/move';
import { Player } from '../shared/player';
import { Game } from '../shared/game';
import { GameService } from '../game.service';
import { Round } from '../shared/round';

@Component({
    selector: 'mw-game-round',
    templateUrl: './game-round.component.html',
    styleUrls: ['./game-round.component.css']
})
export class GameRoundComponent implements OnInit {
    // Loader
    public loading = false;

    webResp:any;
    form: FormGroup;
    currentGame: Game;
    selectedPlayer:Player;
    firstPlayer:Player;
    rounds:Round[];
    roundNumber:number;

    rockHandler = new RockWonHandler();
    paperHandler = new PaperWonHandler();
    scissorsHandler = new ScissorsWonHandler();

    constructor(private formBuilder: FormBuilder,
        private router:Router,
        private _gameService:GameService){}
    
    ngOnInit(){
        //Get current Game
        this.currentGame =  JSON.parse(localStorage.getItem('game'));
        if(!this.currentGame)
            this.router.navigate([""]);
        else{
            // Set chain 
            this.rockHandler.setNext(this.paperHandler).setNext(this.scissorsHandler);
            this.init();
            this.loadRounds();
        }
    }

    initForm(){
        this.form = this.formBuilder.group({
            move: this.formBuilder.control('Rock'),
        });
    }

    init(){
        this.initForm();
        this.selectedPlayer = this.currentGame.players[0];
    }

    checkWinner(){
        const player1 = this.currentGame.players[0];
        const player2 = this.currentGame.players[1];
        if(this.rounds.filter(r => r.playerID == player1.playerID).length > 2)
            this.router.navigate([`/overcome/${player1.name}`]);
        if(this.rounds.filter(r => r.playerID == player2.playerID).length > 2)
            this.router.navigate([`/overcome/${player2.name}`]);
    }

    loadRounds(){
        this.loading = true;
        this._gameService.getGameRound(this.currentGame.gameID)
        .subscribe( data => {
            this.webResp = data;
            this.rounds = this.webResp.data;
            this.roundNumber = this.rounds.length + 1;
            this.checkWinner();
            this.loading = false;
            //console.log(this.rounds);
        });  
    }

    onSubmit(moveName){
        console.log(moveName);
        const move = new Move();
        move.name = moveName.move;
        this.selectedPlayer.move = move;

        if(this.currentGame.players[0].playerID == this.selectedPlayer.playerID){
            this.firstPlayer = this.selectedPlayer;
            this.selectedPlayer = this.currentGame.players[1];
            this.initForm();
        } else {
            const resp = this.rockHandler.handle(this.firstPlayer,this.selectedPlayer);
            if(!resp)
                alert("There's not winner this round!");
            else{
                alert(resp.name + " is the winner!");
                const round = new Round();
                round.gamedID = this.currentGame.gameID;
                round.playerID = resp.playerID;
                // Init Form
                this.init();

                this.loading = true;
                // Save winner 
                this._gameService.createRound(round)
                .subscribe( data => {
                    this.loading = false;
                    //console.log("Round Saved!");
                    this.loadRounds();
                });  
            }
        }
        //this.router.navigate(['/overcome']);
    }

}

/*
    Chain of Responsibility Pattern
    Next code block is based on https://refactoring.guru/design-patterns/chain-of-responsibility/typescript/example
    and it was adapted for this project  
 */
interface Handler {
    setNext(handler: Handler): Handler;
    handle(player1: Player, player2: Player): Player;
}

abstract class AbstractHandler implements Handler
{
    private nextHandler: Handler;
    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(player1: Player, player2: Player): Player {
        if (this.nextHandler) {
            return this.nextHandler.handle(player1, player2);
        }
        return null;
    }
}

class RockWonHandler extends AbstractHandler {
    public handle(player1: Player, player2: Player): Player {
        if (player1.move.name == "Rock" && player2.move.name == "Scissors") 
            return player1;
        else if(player2.move.name == "Rock" && player1.move.name == "Scissors")
            return player2;
        return super.handle(player1, player2);
    }
}

class PaperWonHandler extends AbstractHandler {
    public handle(player1: Player, player2: Player): Player {
        if (player1.move.name === "Rock" && 
            player2.move.name === "Paper") 
            return player2;
        else if(player2.move.name === "Rock" && 
                player1.move.name === "Paper")
            return player1;
        return super.handle(player1, player2);
    }
}

class ScissorsWonHandler extends AbstractHandler {
    public handle(player1: Player, player2: Player): Player {
        if (player1.move.name == "Scissors" && player2.move.name == "Paper") 
            return player1;
        else if(player2.move.name == "Scissors" && player1.move.name == "Paper")
            return player2;
        return super.handle(player1, player2);
    }
}