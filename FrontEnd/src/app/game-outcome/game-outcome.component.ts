import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
    selector: 'mw-game-outcome',
    templateUrl: './game-outcome.component.html',
    styleUrls: ['./game-outcome.component.css']
})
export class GameOutcomeComponent implements OnInit{

    winner:string;

    constructor(private router:Router,
        private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        if(!JSON.parse(localStorage.getItem('game')))
            this.router.navigate([""]);
        else
            this.activatedRoute.paramMap
            .subscribe( paramMap => {
                this.winner = paramMap.get('winner');
                if(!this.winner)
                    this.router.navigate(["newgame"]);
                
            });
    }

    playAgain(){
        //console.log("Again");
        localStorage.removeItem("game");
        this.router.navigate(['']);
    }
}