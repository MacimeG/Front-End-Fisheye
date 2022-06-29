export function displayModal() {
    const button = document.querySelector('.contact_button')
    button.addEventListener('click', function(){
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
        console.log('tu cliques');
    })
}

export function closeModal() {
    document.querySelector('.closeModal').addEventListener('click',function(){
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    })
}


