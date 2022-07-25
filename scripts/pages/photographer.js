//Mettre le code JavaScript lié à la page photographer.html

// ici je met en place ma fonction qui s'occupe d'afficher juste le header de la page
function displayHeaderPhotographe(photographer){
    // ici je commence par recuperer l'url, et gardé que l'id grace a la methode slice()
    const recupUrl = window.location.search;
    const leIdUrl = recupUrl.slice(4)
    //ici je recupere le bon photographe, grace a son id.
    const photographe = photographer.find((element) => element.id == leIdUrl)
    
    const main = document.querySelector('.photograph-header')
    // ici j'appel les fonctions qui vont me permettre de crée l'html nécessaire (voir page media)
    const displayPhotograph = infoPhotographe(photographe)
    const display = displayPhotograph.getPhotographerHeader()
    
    main.appendChild(display)
}

function displayMainPhotographe(photographers, name){
    const recupUrl = window.location.search;
    const leIdUrl = recupUrl.slice(4)
    const photograph_media = document.querySelector(".photograph_media")
    // ici je filtre le tableau des media pour pouvoir récupéré les bons media qui correspond au photographes.
    const photographeMedias = photographers.filter((element) => element.photographerId == leIdUrl)
    // ici je recuperer l'element du dom qui vas contenir le nombre total de like
    let allLike = document.querySelector('.asideCard_likes')
    // grace a reduce je peux additionné les likes entre eux.
    let sumLike = photographers.map(elt => elt.likes).reduce((prev,curr) => prev + curr,0)
    allLike.textContent = sumLike;
    // ici je fais donc une boucle forEach pour pouvoir m'afficher tous les medias corresponds. ainsi que leurs informations
    photographeMedias.forEach(element => {  
        // ici je fais un find() sur le tableau des photographes pour pouvoir recupéré le bon prenom 
        const photographeName = name.find((elt)=> elt.id == element.photographerId);
       
        // ici je coupe le nom du photo (l'espace entre nom et prenom) pour que ça corresponde avec le nom du dossier
        const namePhotographe = photographeName.name.split(' ')
        
        const infoPhotographe = infoMedia(element, namePhotographe[0], photographeMedias)
        const mediaDisplay = infoPhotographe.getPhotographerMain()
       
        photograph_media.appendChild(mediaDisplay)
    });
    tri(photographeMedias)
}

async function init(){
    // ici je fais mes appels au fetch en recuperant le resultant dans les const entre {}
    const {photographers} = await getPhotographers()
    // et ensuite j'appelles la fonctions qui vas me permettre d'afficher mes elements crée dans mes factories
    displayHeaderPhotographe(photographers)
   
    const {media} = await getMedia()
    displayMainPhotographe(media, photographers)
    // ici j'appel les fonctions qui me servent a faire ouvrir et fermer la modal
    displayModal()
    
}
init()
