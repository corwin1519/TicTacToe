"use strict";

import Player from './Player.js';
import Board from './Board.js';
import DrawOnTheBoard from './DrawOnTheBoard.js';
import Minimax from './Minimax.js';
import ValidateForm from './ValidateForm.js';
import Ranking from './Ranking.js';
import UI from './UI.js';
import Game from './Game.js';
import {disableOptions, enableOptions} from './disableEnableOptions.js';



    
document.addEventListener("DOMContentLoaded", function(){
    

    
    const validateForm = new ValidateForm(document.querySelector(".form"), {});
    const form = document.querySelector(".form");
    const myBoard = new Board(); 
    let myGame;
    const myRanking = new Ranking("#ranking-container table");
    const myUI = new UI("#info");
    myUI.showNextAction();

       
    form.addEventListener("formIsLoaded", e=>{
        console.log(":formIsLoaded event occured:");
        
        //czyszczenie tablicy każdorazowo po rozpoczęciu nowej gry (wczytaniu formularza)
        myBoard.grid = [0,1,2,3,4,5,6,7,8];
        DrawOnTheBoard.drawBoard(myBoard);
        
        //wyłączenie opcji do czasu zakonczenia zadeklarowanej liczby rund
        disableOptions();
        
        //pobranie danych o graczach
        const player1Sign = e.detail.checkedSign;
        const player2Sign = player1Sign === "x" ? "o" : "x";
        const player1Name = e.detail.firstPlayerName;
        const player2Name = e.detail.secondPlayerName;
        const numberOfRounds = e.detail.numberOfRounds;
        
        //deklaracja graczy
        const huPlayer = new Player(player1Sign, "human", player1Name);
        const aiPlayer = new Player(player2Sign, "ai", player2Name);
        
        myGame = new Game({
            "player1" : huPlayer,
            "player2" : aiPlayer,
            "board" : myBoard,
            "ranking": myRanking,
            "ui": myUI,
            "initialPlayer" : huPlayer,
            "numberOfRounds": numberOfRounds,
            "currentRound" : 1
        });    

        document.querySelector("#board").dispatchEvent(new Event("wczytane"));

    });
     
    //wczytywanie rankingu z localstorage
    document.querySelector("#loadLocalStorage").addEventListener("click", myRanking.loadFromLocalStorage.bind(myRanking));
    
    //czyszczenie local storage
    document.querySelector("#clearLocalStorage").addEventListener("click", function(){
        localStorage.clear();
    });
    
    //filtrowanie rankingu
    document.querySelector("#searchPlayer").addEventListener("keyup", function(){
        const input = document.querySelector("#searchPlayer");
        myRanking.tableFilter(input);
    });
    


      
      
});  



