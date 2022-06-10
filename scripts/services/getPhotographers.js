export function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("./data/photographers.json")
    .then(function (response){
        // return 'kiki'
        return response.json()
    })
    .then(function(data){  
        return ({ photographers: data.photographers})
        })
    }