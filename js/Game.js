/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import DrawOnTheBoard from './DrawOnTheBoard.js';
import Minimax from './Minimax.js';
import {disableOptions, enableOptions} from './disableEnableOptions.js';

export default class Game{
    constructor(gameDetailObject){
        this.player1 = gameDetailObject.player1;
        this.player2 = gameDetailObject.player2;
        this.currentPlayer = gameDetailObject.player1;
        this.board = gameDetailObject.board;
        this.numberOfPlayer1Moves = 0;
        this.numberOfPlayer2Moves = 0;
        this.numberOfRounds = gameDetailObject.numberOfRounds;
        this.currentRound = gameDetailObject.currentRound;
        this.ranking = gameDetailObject.ranking;
        this.ui = gameDetailObject.ui;
        
        this.score = [{
            
            "player" : this.player1.name,
            "details" : {
                "wins" : 0,
                "loses" : 0,
                "draws" : 0,
                "playedRounds" : 0
            }
            
        }];
      
        this.moveHuman = this.moveHuman.bind(this); //zabieg w celu łatwiejszego uzycia removeEventListener
        
        this.play();
    }
    
    initialPlayer(){
        return this.currentRound % 2 === 1 ? this.player1 : this.player2;
    }
    
    
    whoseTurn(){
        if(this.numberOfPlayer1Moves === this.numberOfPlayer2Moves){
            this.currentPlayer = this.initialPlayer();
        }else if(this.numberOfPlayer1Moves > this.numberOfPlayer2Moves){
            this.currentPlayer = this.player2;
        }else{
            this.currentPlayer = this.player1;
        }
        return this.currentPlayer;
    }
    
    
       
    play() {
        //wyswietlenie informacji o aktualnym stanie gry
        this.ui.showNextPlayer(this.whoseTurn().name);
        
        if (this.whoseTurn().type === "human") {       
            this.moveHumanListener();
        } else {
            
            //opóznienie w ruchu przeciwnika
            setTimeout(function(){
                this.moveAI();}.bind(this), 1000);

        }
    };
    
        
    moveHumanListener(){
        //włączenie nasłuchiwania kliknięcia
        const fields = document.querySelectorAll("#board tr td");
        [...fields].forEach(field => field.addEventListener("click", this.moveHuman));
    }
       
       
    moveHuman(e){
        //odczytanie pola
        DrawOnTheBoard.makeMove(this.board, e.target.id.charAt(6), this.whoseTurn());
      
        //odłączenie nasłuchowania
        const fields = document.querySelectorAll("#board tr td");
        [...fields].forEach(field => field.removeEventListener("click", this.moveHuman)); 
        
        //sprawdzenie warunków zwycięstwa/remisu  
        this.isRoundFinished();                                     
    } 
    
    isRoundFinished(){
//        if((this.board.checkWin(this.player1).status) || (this.board.checkWin(this.player2).status)){
        const winObj = this.board.checkWin(this.whoseTurn());
        
        if(winObj.status){          
            
            //zaznaczenie zwycięzkich pól
            winObj.winningFields.forEach(field => {
                document.querySelector(`#field_${field}`).style.color = "red";
            });

            
            console.log(`::wygrał: ${this.whoseTurn().name}::`);
            this.ui.showWhoWon(this.whoseTurn().name);
            
            //wpisanie wygranej / przegranej do tablicy obiektow score - score[0]
            this.whoseTurn().name === this.score[0].player ? this.score[0].details.wins++ : this.score[0].details.loses++;
            
            //opoznienie w celu obslugi UI
            setTimeout(function(){
                this.nextRound();
            }.bind(this), 1000);

            
        }else if(this.board.checkAvailableMoves().length === 0){
            
            console.log("::Remis::");
            this.ui.showWhoWon();
            
            this.score[0].details.draws++;
            
            //opoznienie w celu obslugi UI
            setTimeout(function(){
                this.nextRound();
            }.bind(this), 1000);
            
        }else {
            this.whoseTurn() === this.player1 ? this.numberOfPlayer1Moves++ : this.numberOfPlayer2Moves++;
            this.play();
        };
    };   
       

    
    moveAI(){
        const move = Minimax.minimax(this.board, this.player1, this.player2, this.player2).index;
        DrawOnTheBoard.makeMove(this.board, move , this.whoseTurn());
     
        //sprawdzenie warunków zwycięstwa/remisu 
        this.isRoundFinished();
    };
    
    nextRound(){
        this.score[0].details.playedRounds++;
                
        this.currentRound++;
        this.numberOfPlayer1Moves = 0;
        this.numberOfPlayer2Moves = 0;
        
        //zmiana koloru pól na biały
        [...document.querySelectorAll("#board td")].forEach(td => td.style.color = "white");
        
        
        if(this.currentRound <= this.numberOfRounds){
            this.board.grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            DrawOnTheBoard.drawBoard(this.board);
            this.play(); 
        } else{

           
            if(JSON.parse(localStorage.getItem("tictactoeRanking")) !== null){ //sprawdzenie, czy w localStorage znajdują się dane gry, jeżeli tak to pobieramy je, dosajemy najnowszy rekord i zapiujemy ponownie w LS
                let savedScore = JSON.parse(localStorage.getItem("tictactoeRanking"));            
                savedScore.push(this.score[0]);
                localStorage.setItem("tictactoeRanking",JSON.stringify(savedScore));
                this.ranking.loadFromLocalStorage(); //wczytujemy dane z localStorage i wyświetlamy w tabeli wyników
                this.ui.showNextAction();
                enableOptions();
            }else{
                let arrayOfScore = []; //jeżeli w LS nie ma danych gry to aktualny rekord wrzucamy do tablicy i do localStorage
                arrayOfScore.push(this.score[0]);
                localStorage.setItem("tictactoeRanking",JSON.stringify(arrayOfScore));
                this.ranking.loadFromLocalStorage();
                this.ui.showNextAction();
                enableOptions();
            }

        }
        

    }
    
};