// ici je refais un fetch, pour aller chercher uniquement les media, situer dans le fichier json. C'est la même fonction que pour aller chercher les données photographe, sauf qu'ici c'est pour aller chercher les fichier image/video correspondante.
export function getMedia(idPhotographer) {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("./data/photographers.json")
    .then(function (response){
        return response.json()
    })
    .then(function(data){
        const medias = data.media;

        // utilisé la method filter() pour recupéré la bonne data
        const filteredMedia = medias.filter(elt => elt.photographerId === idPhotographer);
        return filteredMedia;
        
    })
}

