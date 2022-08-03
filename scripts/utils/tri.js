// ici je vais mettre en place la method de tri, et je ne sais pas encore ou je vais devoir l'appeler.
function tri(medias, name){
  let triButton = document.querySelector('#list_tri');
  let photographe_media = document.querySelector('.photograph_media');
  triButton.addEventListener('change',(e)=>{
    // je vais mettre en place mes conditions, pour que sa me sorte les bons résultat.
    if(e.target.value === 'popularite'){
      medias.sort(function (a, b) {
        //tri les medias par likes
        if (a.likes < b.likes) {
          return 1; 
        }
        if (a.likes > b.likes) {
          return -1; 
        }
        return 0; 
      });
    }
    if(e.target.value === 'date'){
      medias.sort(function (a, b) {
        //tri les medias par date
        if (a.date < b.date) {
          return -1; 
        }
        if (a.date > b.date) {
          return 1; 
        }
        return 0; 
      });
    }
    if(e.target.value === 'titre'){
      medias.sort(function (a, b) {
        //tri les medias par titre
        if (a.title < b.title) {
          return -1; 
        }
        if (a.title > b.title) {
          return 1; 
        }
        return 0; 
      });
    }
    
    // ici je refais la même boucle que dans photographer.js, pour pouvoir appeler la fonction qui vas m'afficher mes medias trier.
    photographe_media.innerHTML=''
    return medias.forEach(element => {  
      const infoPhotographe = infoMedia(element, name, medias)
      const mediaDisplay = infoPhotographe.getPhotographerMain()

      
      photographe_media.appendChild(mediaDisplay)
      
  });
  })
  
}


