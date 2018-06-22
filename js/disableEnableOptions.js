/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function disableOptions(){
    //zablokowanie mozliwości zmiany opcji
    [...document.querySelectorAll("#option-form input")].forEach(input => {
        input.disabled = true;
        input.classList.add("disabled");
    });
    [...document.querySelectorAll("#option-form label")].forEach(label => {
        label.disabled = true;
        label.classList.add("disabled");
    });
};

function enableOptions(){
    [...document.querySelectorAll("input")].forEach(el => el.disabled = false);
    [...document.querySelectorAll(".disabled")].forEach(el => el.classList.remove("disabled"));
}

export {disableOptions, enableOptions};