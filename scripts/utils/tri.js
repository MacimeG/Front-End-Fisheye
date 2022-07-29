// ici je vais mettre en place la method de tri, et je ne sais pas encore ou je vais devoir l'appeler.
function tri(medias, name){
  let triButton = document.querySelector('#list_tri');
  // let name = document.querySelector('.titlePhotographe').textContent
  let photographe_media = document.querySelector('.photograph_media')
  // let newName = name.split(' ')
  triButton.addEventListener('change',(e)=>{
    console.log(e.target.value);
    
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
      // return medias, name
      
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
      // return medias, name
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
      // return medias, name
    }
    
    photographe_media.innerHTML=''
    return medias.forEach(element => {  
      const infoPhotographe = infoMedia(element, name, medias)
      const mediaDisplay = infoPhotographe.getPhotographerMain()

      
      photographe_media.appendChild(mediaDisplay)
      
  });
  })
  
}


