//Mettre le code JavaScript lié à la page photographer.html

// ici je met en place ma fonction qui s'occupe d'afficher juste le header de la page
function displayHeaderPhotographe(photographer){
    // ici je commence par recuperer l'url, et gardé que l'id grace a la methode slice()
    const recupUrl = window.location.search;
    const leIdUrl = recupUrl.slice(4);
    //ici je recupere le bon photographe, grace a son id.
    const photographe = photographer.find((element) => element.id == leIdUrl);
    
    const main = document.querySelector('.photograph-header');
    // ici j'appel les fonctions qui vont me permettre de crée l'html nécessaire (voir page media)
    const displayPhotograph = infoPhotographe(photographe);
    const display = displayPhotograph.getPhotographerHeader();
    
    main.appendChild(display);
}

// ici je vais devoir sortir le triage des photographes de la fonction displayMainPhotographe, pour quel soit apar pour pouvoir mieux gerer le systeme de tri. Et puis pour que ce soit plus propre car cet fonction melange un peu tout.


function mainPhotographe(photographers, name){
    const recupUrl = window.location.search;
    const leIdUrl = recupUrl.slice(4);
    const photographeMedias = photographers.filter((element) => element.photographerId == leIdUrl);
    const photograph_media = document.querySelector(".photograph_media");
    // ici je fais sa pour avoir les photos en populaire par defaut
    photographeMedias.sort(function (a, b) {
        //tri les medias par likes
        if (a.likes < b.likes) {
          return 1; 
        }
        if (a.likes > b.likes) {
          return -1; 
        }
        return 0; 
    });
    // ici je vais recuperer le nom du photographe pour pouvoir afficher ensuite les bons medias avec
    const photographeName = name.find((elt)=> elt.id == leIdUrl);
    const namePhotographe = photographeName.name.split(' ');
    tri(photographeMedias, namePhotographe[0]);
    
    // ici je fais donc une boucle forEach pour pouvoir m'afficher tous les medias corresponds. ainsi que leurs informations
    photographeMedias.forEach(element => {  
        const infoPhotographe = infoMedia(element, namePhotographe[0], photographeMedias);
        const mediaDisplay = infoPhotographe.getPhotographerMain();
       
        
        photograph_media.appendChild(mediaDisplay);
        
    });
}

// ici le reste de la fonction me permettant d'additionné tout les likes.
function likeIncrement(photographers){
    let allLike = document.querySelector('.asideCard_likes');
    const recupUrl = window.location.search;
    const leIdUrl = recupUrl.slice(4);
    const currentPhotographe = photographers.filter((element) => element.photographerId == leIdUrl);
    // grace a reduce je peux additionné les likes entre eux.
    let sumLike = currentPhotographe.map(elt => elt.likes).reduce((prev,curr) => prev + curr,0);
    allLike.textContent = sumLike;
}



function displayMainPhotographe(photographers, name){
    mainPhotographe(photographers, name);
    likeIncrement(photographers);
   
}

async function init(){
    // ici je fais mes appels au fetch en recuperant le resultant dans les const entre {}
    const {photographers} = await getPhotographers();
    // et ensuite j'appelles la fonctions qui vas me permettre d'afficher mes elements crée dans mes factories
    displayHeaderPhotographe(photographers);
   
    const {media} = await getMedia();
    displayMainPhotographe(media, photographers);
    
    
}
init();
