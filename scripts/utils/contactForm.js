function displayModal() {
    const modal = document.getElementById("contact_modal");
    const button = document.querySelector('.contact_button')
    button.addEventListener('click', ()=>{
        console.log('tu cliques');
        modal.style.display = "block";

    })
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// ici je vais faire la fonction qui va me "géré" le formulaire