window.onload = function(){

    let dom = window.document;

    const loginForm = dom.querySelector('#loginForm')
    
    const emailInput = dom.querySelector('.emailInput');
    let emailErrors = dom.querySelector(".emailErrors");

    var validEmail = undefined;


    loginForm.addEventListener('submit', function(e){

        if (validEmail === true) {
            alert('Enviado con exito');
        } else {
            e.preventDefault();
            console.log('formValidation triggered');  
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
            return true;
        }
    });

}