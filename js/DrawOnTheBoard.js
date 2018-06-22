/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export default class DrawOnTheBoard{
    //wykonuje ruch (grid + tabela html)
    static makeMove(board, move, player){
        const field = document.getElementById(`field_${move}`);    
        //console.log("board.board[move]= " + board.board[move] + " typeof board.board[move]= " + typeof board.board[move]);
        if (typeof board.grid[move] === "number") {
            board.grid[move] = player.sign;
            if (player.sign === "o")
                field.innerHTML = "o";
            else
                field.innerHTML = "X";
        } else throw new Error("pole nie jest puste");
        ;
    }
    ;
    
    //rysuje zadaną planszę (grid + html)
    static drawBoard(board){
        for(let i = 0; i < board.grid.length; i++){
            let field = document.getElementById(`field_${i}`);
            
            if(board.grid[i] === "o"){
               field.innerHTML = "o";
            } else if(board.grid[i] === "x"){
                field.innerHTML = "x"; 
            } else
                field.innerHTML = "";
        }
    };
    
};