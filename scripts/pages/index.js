import { photographerFactory } from "../factories/photographer.js";
import {getPhotographers} from "../services/getPhotographers.js";
        // const response = await fetch('./data/photographers.json',{
        //     method: 'GET'
        // })
        // .then(response =>response.text())
        // let json = JSON.parse(response);
        // return json
        // }
     
function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const  photographers  = await getPhotographers()
    displayData(photographers.photographers);
};
// console.log(init());
init();
    