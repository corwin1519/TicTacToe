/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//założenie Player1 - zawsze human!!
export default class Minimax{
    static minimax(newBoard, humanPlayer, aiPlayer, player){
        let availableMoves = newBoard.checkAvailableMoves();
        //console.log("wywolalo funkcje minimax");
        
        //zaliczenie punktów
        if(newBoard.checkWin(humanPlayer).status){
            return {score: -10};
        }
        else if(newBoard.checkWin(aiPlayer).status){
            return {score: 10};
        }
        else if(availableMoves.length === 0){
            return {score: 0};
        };
       
       let moves = [];
       
       for(let i = 0; i<availableMoves.length; i++){
           let move = {};
           
           move.index = newBoard.grid[availableMoves[i]];
           newBoard.grid[availableMoves[i]] = player.sign;
           
            if(player.type === "ai"){
                let result = this.minimax(newBoard, humanPlayer, aiPlayer, humanPlayer);
                move.score = result.score;
                //console.log(move);
            }
                
            else{
                let result = this.minimax(newBoard, humanPlayer, aiPlayer, aiPlayer);
                move.score = result.score;
                //console.log(move);
            }
            
            newBoard.grid[availableMoves[i]] = move.index;
            moves.push(move);                      
       };
       
       let bestMove;
       
       if(player.type === "ai"){
           let bestScore = -10000;
           for(let i =0; i < moves.length; i++){
               if(moves[i].score > bestScore){
                   bestScore = moves[i].score;
                   bestMove = i;
               }              
           };
       } else {
           let bestScore = 10000;
           for(let i =0; i < moves.length; i++){
               if(moves[i].score < bestScore){
                   bestScore = moves[i].score;
                   bestMove = i;
                };
            };
        };
    
        //console.log(moves);
       // console.log(moves[bestMove]);
        return moves[bestMove]; 
       
    };
    
};