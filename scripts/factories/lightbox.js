// ici je vais mettre en place le fonctionnement de la lightbox
function lightbox(id, name, image, title, video, data, medias){
    // ici j'appel directement ma fonction findIndexMedia pour pouvoir recuperer l'index de l'image en ouvrant la lightbox
    let mediaPosition = findIndexMedia(data, medias);
    
    // premierement je recupere donc mes elements html pour pouvoir commencé a appliqué ma logique
    let lightBox_html = document.querySelector('#lightBox');
    let lightbox_img = document.querySelector('.lightBox_media');
    let lightbox_title = document.querySelector('#mediaName');
    let lightbox_video = document.querySelector('.lightBox_video');
    const picture = `assets/photographers/${name}/${image}`;
    const movie = `assets/photographers/${name}/${video}`;
    lightBox_html.style.display="block";
    if(image){
        lightbox_img.src= picture;
        lightbox_video.style.display="none";
        lightbox_img.style.display="block";
        lightbox_title.textContent= title;

    }
    else if(video){
        lightbox_video.src = movie;
        lightbox_video.setAttribute('controls', true);
        lightbox_img.style.display="none";
        lightbox_video.style.display="block";
        lightbox_title.textContent= title;
    }
    else return;


    // ici je recuperer les elements html qui corresponde au fleche pour changer d'image, et je leurs applique un ecouteur d'evenement avec les fonctions correspondante
    let left = document.querySelector('.lightbox_prev');
    let right = document.querySelector('.lightbox_next');
    right.addEventListener('click', next);
    left.addEventListener('click', previous);


    // ici il faut que je mette en place l'écouteur d'évenement pour parcourir la lightbox au clavier.
    
    window.addEventListener('keydown', function(e){
        if(e.key === 'ArrowLeft'){
            previous();
        }
        else if(e.key === 'ArrowRight'){
            next();
        }
        else if(e.key === 'Escape'){
            closeLightbox();
        }
    });

    function next(){
        mediaPosition = getMediaPosition(mediaPosition + 1, medias.length);
       
        let newMedia = medias[mediaPosition];
        if(newMedia.image){
            lightbox_img.src = `assets/photographers/${name}/${newMedia.image}`;
            lightbox_title.textContent = newMedia.title;
            lightbox_video.style.display="none";
            lightbox_img.style.display="block";
        }
        else{
            lightbox_video.src= `assets/photographers/${name}/${newMedia.video}`;
            lightbox_video.setAttribute('controls', true);
            lightbox_title.textContent = newMedia.title;
            lightbox_img.style.display="none";
            lightbox_video.style.display="block";
        }
  
    }
    function previous(){
        mediaPosition = getMediaPosition(mediaPosition - 1, medias.length);
        
        let newMedia = medias[mediaPosition];
        if(newMedia.image){
            lightbox_img.src = `assets/photographers/${name}/${newMedia.image}`;
            lightbox_title.textContent = newMedia.title;
            lightbox_video.style.display="none";
            lightbox_img.style.display="block";
        }
        else{
            lightbox_video.src= `assets/photographers/${name}/${newMedia.video}`;
            lightbox_video.setAttribute('controls', true);
            lightbox_title.textContent = newMedia.title;
            lightbox_img.style.display="none";
            lightbox_video.style.display="block";
        }
    }
   

}
// ici je met en place la fonction qui vas me servir a fermer la lightbox
function closeLightbox(){
    let lightBox_html = document.querySelector('#lightBox');
    lightBox_html.style.display="none";
}

// ici je fais une fonction qui va me recuperer la position de l'image par rapport au tableau des medias.
function getMediaPosition(mediaPosition, length){
    if(mediaPosition < 0){
        mediaPosition = length - 1;
    }
    else if(mediaPosition == length){
        mediaPosition = 0;
    }
    return mediaPosition;
}

// ici il faut que je crée une fonction qui vas me boucler et me trouver l'index de la photo dans le tableau des medias.
function findIndexMedia(data, medias){
    for (let i = 0; i < medias.length; i++) {
        if(data.id === medias[i].id){
            return i;
        }
        
    }
    return null;
}


