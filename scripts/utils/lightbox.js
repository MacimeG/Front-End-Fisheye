export function closeLightbox(){
    const btnClose = document.querySelectorAll('.lightbox_close')
    const lightbox = document.querySelector('.lightBox')
    btnClose.forEach(element => element.addEventListener('click', (e) => {
        e.preventDefault()
        // console.log(element);
        lightbox.style.display="none"
    }))

}

