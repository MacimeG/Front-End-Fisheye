// ici je vais mettre en place le fonctionnement de la lightbox
function lightbox(id, name, image, title, video){
    // premierement je recupere donc mes elements html pour pouvoir commencé a appliqué ma logique
    console.log(id);
    let lightBox_html = document.querySelector('#lightBox')
    let lightbox_container = document.querySelector('.lightBox_container')
    let lightbox_img = document.querySelector('.lightBox_media')
    let lightbox_title = document.querySelector('#mediaName')
    let lightbox_video = document.querySelector('.lightBox_video')
    const picture = `assets/photographers/${name}/${image}`;
    const movie = `assets/photographers/${name}/${video}`;
    lightBox_html.style.display="block"
    if(image){
        lightbox_img.src= picture
        lightbox_video.style.display="none"
        lightbox_title.textContent= title

    }
    else if(video){
        lightbox_video.src = movie 
        lightbox_video.setAttribute('controls', true)
        lightbox_img.style.display="none"
        lightbox_title.textContent= title
        
    }
    else return
    
}
// ici je met en place la fonction qui vas me servir a fermer la lightbox
function closeLightbox(){
    let lightBox_html = document.querySelector('#lightBox')
    lightBox_html.style.display="none"
}