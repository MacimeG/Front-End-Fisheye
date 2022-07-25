// ici je vais mettre en place la method de tri, et je ne sais pas encore ou je vais devoir l'appeler.
function tri(medias){
  let triButton = document.querySelector('#list_tri')
  medias.sort((a, b)=>{
    return b.likes - a.likes
  })
  console.log(medias);
}


