// ici je met en place mes fetch, pour récupérer mes datas.
function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  return fetch("./data/photographers.json")
    .then(function (response) {
      // return 'kiki'
      return response.json();
    })
    .then(function (data) {
      return { photographers: data.photographers };
    });
  }

function getMedia() {
  // Penser à remplacer par les données récupérées dans le json
  return fetch("./data/photographers.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // const medias = data.media;
    
    // utilisé la method filter() pour recupéré la bonne data
    // const filteredMedia = medias.filter(
    // (elt) => elt.photographerId === idPhotographer
    // );
      return {media: data.media}
      // return filteredMedia;
      // return medias
  });
}

