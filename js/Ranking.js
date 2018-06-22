/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export default class Ranking{
    constructor(tableSelector){
        this.ranking = document.querySelector(tableSelector);
    }
    
    //wczytywanie z localStorage
    loadFromLocalStorage(){
        const loadedData = JSON.parse(localStorage.getItem("tictactoeRanking"));
        const tbody = this.ranking.children[2];
        tbody.innerHTML = "";

        if((loadedData !== null) && (typeof loadedData !== "undefined")){
            for(let i = 0; i<loadedData.length; i++){
                let string = `<td>${loadedData[i].player}</td><td>${loadedData[i].details.playedRounds}</td><td>${loadedData[i].details.wins}</td><td>${loadedData[i].details.loses}</td><td>${loadedData[i].details.draws}</td>`;
                let record = document.createElement("tr");
                record.innerHTML = string;
                tbody.appendChild(record);
            };
        
        this.tableFoot();
        }else console.log("W localStorage nie ma danych gry");
    };
    
    //obliczanie i ustawianie sumy widocznych wierszy
    tableFoot(){
        this.tbodyRows = this.ranking.querySelectorAll("tbody tr");

        const footObj = {rounds: 0, wins: 0, loses: 0, draws: 0};
        const tfoot = this.tbodyRows[0].parentNode.parentNode.children[1];

        for(let i=0; i<this.tbodyRows.length; i++){
            if(!this.isHidden(this.tbodyRows[i])){
                footObj.rounds += parseInt(this.tbodyRows[i].cells[1].innerText);
                footObj.wins += parseInt(this.tbodyRows[i].cells[2].innerText);
                footObj.loses += parseInt(this.tbodyRows[i].cells[3].innerText);
                footObj.draws += parseInt(this.tbodyRows[i].cells[4].innerText);
            };
        };

        tfoot.innerHTML = `<tr><th>Suma:</th><th>${footObj.rounds}</th><th>${footObj.wins}</th><th>${footObj.loses}</th><th>${footObj.draws}</th></tr>`;
        
    };
    
    
    tableFilter(searchInput) {
        const searchedPlayer = searchInput.value.toUpperCase();

        if (!((this.tbodyRows === null) || (typeof this.tbodyRows === "undefined"))) {
            for (let i = 0; i < this.tbodyRows.length; i++) {
                let player = this.tbodyRows[i].cells[0].innerText.toUpperCase();
                if (player.indexOf(searchedPlayer) === -1) {
                    this.tbodyRows[i].style.display = "none";
                } else {
                    this.tbodyRows[i].style.display = "";
                };
            };
            this.tableFoot();
        }
    };
    
    
    isHidden(element){
        const style = window.getComputedStyle(element);  
        return((style.display ==="none") || (style.display === "hidden"));
    }
    
}