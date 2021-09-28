window.onload = function(){

    const registerForm = window.document.querySelector('#registerForm')
    
    registerForm.addEventListener('submit', function(e){

        if (email2match === true && password2match === true && validEmail === true && validPassword === true && validUsername === true) {
            alert('Enviado con exito');
        } else {
            e.preventDefault();
            console.log('formValidation triggered');  
        }    
    });

    let dom = window.document;

    var validEmail = undefined;
    var validUsername = undefined;
    var validPassword = undefined;
    var password2match = undefined;
    var email2match = undefined;

    const usernameInput = dom.querySelector('.usernameInput');
    const emailInput = dom.querySelector('.emailInput');
    const passwordInput = dom.querySelector('.passwordInput');
    const repeatPassInput = dom.querySelector('.repeatPassInput');
    const repeatEmailInput = dom.querySelector('.repeatEmailInput');


    let usernameErrors = dom.querySelector(".usernameErrors");
    let emailErrors = dom.querySelector(".emailErrors");
    let passwordErrors = dom.querySelector(".passwordErrors");
    let password2Errors = dom.querySelector(".password2Errors");
    let email2Errors = dom.querySelector(".email2Errors");



    console.log(validUsername)

    usernameInput.addEventListener('change', function(e){

        let userValue = e.target.value;

        if (userValue.length < 7) {
            usernameInput.classList.add("formError");
            validUsername = false;
            usernameErrors.innerHTML="Must have at least 6 characters";
        } else {
            usernameInput.classList.remove("formError");
            validUsername= true;
            usernameErrors.innerHTML = "";
            console.log(validUsername)
            return true;
        }
    });

    emailInput.addEventListener('change', function(e){
        let emailValue = e.target.value;

        if (!emailValue.includes("@")) {
            emailInput.classList.add("formError");
            validEmail = false;
            emailErrors.innerHTML="Invalid Email";} 
        else {
            emailInput.classList.remove("formError");
            validEmail = true;
            emailErrors.innerHTML = "";
            console.log(validEmail)
            return true;
        }
    });

    passwordInput.addEventListener('change', function(e){
        let passwordValue = e.target.value;
        var numbers = /[0-9]/g;
        let specialSimbols = /[^a-zA-Z0-9\-/]/;

        if (passwordValue.length < 9) {
            passwordInput.classList.add("formError");
            validPassword = false;
            passwordErrors.innerHTML="Must have at ledast 8 characters";
            }   
        else if (!passwordValue.match(numbers)) {
            passwordInput.classList.add("formError");
            validPassword = false;
            passwordErrors.innerHTML="Must contain at least one number";
        }
        else if (!passwordValue.match(specialSimbols)) {
            passwordInput.classList.add("formError");
            validPassword = false;
            passwordErrors.innerHTML="Must contain at least one simbol";
        } 
        else {
            passwordInput.classList.remove("formError");
            validPassword = true;
            passwordErrors.innerHTML = "";
            return true;
        }
    });

    repeatPassInput.addEventListener('change', function(e){

        let password2Value = e.target.value;

        if (password2Value === passwordInput.value){

            repeatPassInput.classList.remove("formError");
            password2match = true;
            password2Errors.innerHTML="";
            return true;
        }

        else {

            repeatPassInput.classList.add("formError");
            password2match = false;
            password2Errors.innerHTML="Passwords don't match";
            console.log(password2Value)
        }
    });

    repeatEmailInput.addEventListener('change', function(e){

        let email2Value = e.target.value;

        if (email2Value === emailInput.value){

            repeatEmailInput.classList.remove("formError");
            email2match = true;
            email2Errors.innerHTML="";
            return true;
        }

        else {

            repeatEmailInput.classList.add("formError");
            email2match = false;
            email2Errors.innerHTML="Emails don't match";
            console.log(password2Value)
        }
    });
};