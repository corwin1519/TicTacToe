/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//walidacja formularza
export default class ValidateForm{
    constructor(form, options){
        
        const defaultOptions = {
        classError: "error"
        }   ;
    
        this.form = form;

        this.options = Object.assign({}, defaultOptions, options);
    
        //wyłączamy domyślną walidację
        this.form.setAttribute('novalidate', 'novalidate');
    
        this.prepareElements();
        this.bindSubmit();
    };
    
    
    prepareElements(){
        const elements = this.form.querySelectorAll("[required]");
        
        [...elements].forEach(element => {
            if(element.nodeName.toUpperCase() === "INPUT"){
                const type = element.type.toUpperCase();
            
                if(type === "TEXT"){
                    element.addEventListener("input", e => {
                        this.testInputText(e.target);
                    });
                }    
                
                if(type === "RADIO"){
                    element.addEventListener("click", e => {
                        this.testInputCheckbox(e.target);
                    });                       
                }                      
            };
        });  
    };

    testInputText(input){
        let inputIsValid = true;
        const pattern = input.getAttribute("pattern");

        if(pattern !== null){
            const reg = new RegExp(pattern, 'gi');

            if(!reg.test(input.value)){
                inputIsValid = false;
            };
            
        } else {
            if(input.value === ""){
                inputIsValid = false;
            };
        };

        if(inputIsValid){
            this.showFieldValidation(input, true);
            return true;
        } else {
            this.showFieldValidation(input, false);
            return false;
        };   
    };
    
    testInputCheckbox(input){
        const name = input.getAttribute("name");      
        const group = input.form.querySelectorAll("input[name='" + name + "']:checked");
        
        if(group.length){
            this.showFieldValidation(input, true);
            return true;
        } else {
            this.showFieldValidation(input, false);
            return false;
            
        }
    }
    
    showFieldValidation(input, inputIsValid){
        if(inputIsValid){
            input.parentElement.classList.remove(this.options.classError);
        } else {
            input.parentElement.classList.add(this.options.classError);
        };       
    };

    bindSubmit(){
        this.form.addEventListener("submit", e =>{
            e.preventDefault();
            
            let formIsValidated = true;
            const elements = this.form.querySelectorAll("[required]");

            [...elements].forEach(element =>{
                if(element.nodeName.toUpperCase() === "INPUT"){
                    const type = element.type.toUpperCase();
                    
                    if(type === "TEXT"){
                        if(!this.testInputText(element)){
                           formIsValidated = false; 
                        };
                    };
                    
                    if(type === "RADIO"){
                        if(!this.testInputCheckbox(element)){
                            formIsValidated = false;
                        };
                    };
                };
            });
            
            if(formIsValidated){
                console.log("%c :Formularz wypełniony prawidłowo:", "color:green");
                //nowy event z informacjami z formularza (cały formularz);
                const formIsLoadedEvent = new CustomEvent("formIsLoaded", {
                    detail: {
                        checkedSign: this.form.querySelector("input[name='sign']:checked").value,
                        firstPlayerName: this.form.querySelector("#inputName1").value,
                        secondPlayerName: this.form.querySelector("#inputName2").value,
                        numberOfRounds: this.form.querySelector("#numberOfRounds").value
                    }
                });
                               
                this.form.dispatchEvent(formIsLoadedEvent);
                
            } else {
                return false;
            };
            
        });
    };

};


