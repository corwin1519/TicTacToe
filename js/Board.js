/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export default class Board{
    constructor(grid){
       this.grid = (grid? grid.slice() :  [0,1,2,3,4,5,6,7,8]);
    };
    
//    checkWin(player){
//        if(
//            (this.grid[0] === player.sign && this.grid[1] === player.sign && this.grid[2] === player.sign) ||
//            (this.grid[3] === player.sign && this.grid[4] === player.sign && this.grid[5] === player.sign) ||   
//            (this.grid[6] === player.sign && this.grid[7] === player.sign && this.grid[8] === player.sign) ||  //sprawdzenie osi poziomych
//            (this.grid[0] === player.sign && this.grid[3] === player.sign && this.grid[6] === player.sign) || 
//            (this.grid[1] === player.sign && this.grid[4] === player.sign && this.grid[7] === player.sign) || 
//            (this.grid[2] === player.sign && this.grid[5] === player.sign && this.grid[8] === player.sign) || //sprawdzenie osi pionowych
//            (this.grid[0] === player.sign && this.grid[4] === player.sign && this.grid[8] === player.sign) || //sprawdzenie pierwszej przekątnej
//            (this.grid[2] === player.sign && this.grid[4] === player.sign && this.grid[6] === player.sign)    //sprawdzenie drugiej przekątnej
//        )return true;
//        else return false; 
//    }
    
        checkWin(player){
        if(this.grid[0] === player.sign && this.grid[1] === player.sign && this.grid[2] === player.sign) 
            return {"status": true, "winningFields":[0,1,2]};
        else if(this.grid[3] === player.sign && this.grid[4] === player.sign && this.grid[5] === player.sign)
            return {"status": true, "winningFields":[3,4,5]};
        else if(this.grid[6] === player.sign && this.grid[7] === player.sign && this.grid[8] === player.sign)   //sprawdzenie osi poziomych
            return {"status": true, "winningFields":[6,7,8]};            
        else if(this.grid[0] === player.sign && this.grid[3] === player.sign && this.grid[6] === player.sign)
            return {"status": true, "winningFields":[0,3,6]};        
        else if(this.grid[1] === player.sign && this.grid[4] === player.sign && this.grid[7] === player.sign)
            return {"status": true, "winningFields":[1,4,7]};
        else if(this.grid[2] === player.sign && this.grid[5] === player.sign && this.grid[8] === player.sign)  //sprawdzenie osi pionowych
            return {"status": true, "winningFields":[2,5,8]};    
        else if(this.grid[0] === player.sign && this.grid[4] === player.sign && this.grid[8] === player.sign)  //sprawdzenie pierwszej przekątnej
            return {"status": true, "winningFields":[0,4,8]};
        else if(this.grid[2] === player.sign && this.grid[4] === player.sign && this.grid[6] === player.sign)    //sprawdzenie drugiej przekątnej
            return {"status": true, "winningFields":[2,4,6]};
        else 
            return {"status": false, "winningFields":[]};
    }
    
    checkAvailableMoves(){
        return this.grid.filter(field => (field !== "x" && field !== "o"));       
    };
    
};