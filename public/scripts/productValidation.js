window.onload = function(){

    let dom = window.document;

    const productCreateForm = dom.querySelector('#create_form')
    
    const nameInput = dom.querySelector('#create_title');
    const nameErrors = dom.querySelector(".nameErrors");
    const fileInput = dom.querySelector('#create_image');
    const fileErrors = dom.querySelector(".fileErrors");

    var validName = undefined;
    var validFile = undefined;


    productCreateForm.addEventListener('submit', function(e){

        if (validName === true && validFile === true) {
            alert('Creado con exito');
        } else {
            e.preventDefault();
            console.log('formValidation triggered');  
        }    
    });

    nameInput.addEventListener('change', function(e){
        let nameValue = e.target.value;

        if (nameValue.length < 6) {
            nameInput.classList.add("formError");
            validName = false;
            nameErrors.innerHTML="Must have at least five (5) characters";} 
        else {
            nameInput.classList.remove("formError");
            validName = true;
            nameErrors.innerHTML = "";
            return true;
        }
    });

    fileInput.addEventListener('change', function(e){
              
            let fileValue = e.target.value;
          
            // Allowing file type
            var allowedExtensions = 
                    /(\.jpg|\.jpeg|\.png|\.gif)$/i;
              
            if (!allowedExtensions.exec(fileValue)) {
                alert('Invalid file type');
                fileInput.value = '';
                
                fileInput.classList.add("formError");
                validFile = false;
                fileErrors.innerHTML="Please, upload a valid file.";
            } 
            else {
                fileInput.classList.remove("formError");
                validFile = true;
                fileErrors.innerHTML="";
            }
    })
}