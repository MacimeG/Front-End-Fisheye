function displayModal(name) {
    const modal = document.getElementById("contact_modal");
    let buttonsubmit = document.querySelector('.envoyer')
    let nameModal = document.querySelector('.namePhotographe');
    nameModal.textContent = name;
    modal.style.display = "block";
    // je rajoute cet attribut pour pouvoir avoir le focus au clavier, une fois que la modal et ouverte.
    modal.setAttribute('role','dialog');

    // ici je rajoute l'écouteur d'évenement pour fermer la modal.
    window.addEventListener("keydown", (e)=>{
        if(e.key === "Escape"){
            closeModal();
        }
    });
    // ici je rajoute l'écouteur d'évenement pour validé le formulaire de la modal.
    buttonsubmit.addEventListener('keydown', (e)=>{
        if(e.key === "Enter"){
           submitForm();
        }
    });
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// ici je vais faire la fonction qui va me "géré" le formulaire

function submitForm(){
    // je recupere le formulaire, ainsi que ses inputs.
    const form = document.querySelector('#formContact');
    const firstName= document.querySelector('#prenomForm');
    const lastName = document.querySelector('#nomForm');
    const mail = document.querySelector('#mailForm');
    const msgForm = document.querySelector('#textArea');
    //ici je vais recuperer la valeur des inputs.
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const mailValue = mail.value;
    const msgFormValue = msgForm.value;
   
    console.log("first name :",firstNameValue);
    console.log("last name :",lastNameValue);
    console.log("email :",mailValue);
    console.log("message :",msgFormValue);

    // ici j'appel la fonction closemodal pour fermer automatiquement la modal a la validation du formulaire.
    closeModal();

   
}