/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export default class UI{
    constructor(infoBoxSelector){
        this.infoBox = document.querySelector(infoBoxSelector);       
    }
    
    showNextAction(){
        this.infoBox.innerText = "Zaznacz wymagane opcje";
    };
    
    showNextPlayer(player){
        this.infoBox.innerText = `Następny ruch wykonuje ${player}`;
    }
    
    showWhoWon(player){
        if(player == null){
            this.infoBox.innerText = "Remis";
        }else{
            this.infoBox.innerText = `Rundę wygrał: ${player}`;
        };
    }
    
};