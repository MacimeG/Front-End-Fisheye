//Mettre le code JavaScript lié à la page photographer.html
// j'importe la fonction getPhotographer, qui contient le fetch. pour evité de me repeter
// ici pour commencer je vais recuperer l'id dans l'url pour pouvoir le comparer avec les id des photographes pour pouvoir recuperer les bonnes data
import { getPhotographers } from "../services/getPhotographers.js";
import { getMedia } from "../services/getMedia.js";
import { TypeFile } from "../models/typeMedia.js";
const recupUrl = window.location.search;
const leIdUrl = recupUrl.slice(4)


// ici je crée une fonction qui vas me permettre de comparer et afficher la bonne data.
async function displayPhotographerMain(photographe){
  const photographer = photographe.find((element) => element.id == leIdUrl)
  const { name, portrait, city, country, id, tagline, price } = photographe;


  document.querySelector('#main').innerHTML= `<div class="photograph-header">
    <div> 
      <h1 class="titlePhotographe">${photographer.name} </h1> 
      <p>${photographer.city}, ${photographer.country}</p>
      <p class="photograph_tagline">${photographer.tagline}</p>
    </div>
    <button class="contact_button">Contactez-moi</button>
    <img class ="photographer_photo"src="assets/photographers/portrait/${photographer.portrait}">
    </div>
    <div class="photographer_filtrer">
    
        <p class="tri">Trier par </p>
        <div class ="selectTri">
           <button class="btnTri">Popularité <i class=" chevronTri fa-solid fa-chevron-down"></i> </button>
           <div class="allOption">
           <hr>
           <label class="selectOption" for="date">Date</label>
            <input class ="option" type="radio" name="date" />
            <hr>
           <label class="selectOption" for="titre">Titre</label>
            <input class ="option" type="radio" name="titre" />
   
           </div>
        </div>
    </div>
    <div class="photographer_media"></div>
    <div class="lightBox"></div>`


    // ici les ecouteur d'évenement permettant de fermer et ouvrir le formulaire de contact.
      document.querySelector('.contact_button').addEventListener('click',function(){
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
      })  
      document.querySelector('.closeModal').addEventListener('click',function(){
        document.getElementById("contact_modal").style.display="none";
      })


      //ici je recupere les données correspondante.(photo/video et le prix de chaque photographe)
      const arrayMedia = await getMedia(photographer.id);
      const videoMedia = arrayMedia.filter(elt => elt.video);
      const imageMedia = arrayMedia.filter(elt => elt.image);
      const priceMedia = arrayMedia.filter(elt => elt.price);

      
      
     

      // ici je met en place une boucle for qui vas me permettre d'afficher les photos
      for (let i = 0; i < imageMedia.length; i++) {
        const media = imageMedia[i];
        // ici je crée une variable contenant le nom des photographes, que je viens spliter pour recuperer que son prenom, qui correspond au nom des dossiers contenant les images.
        let name = photographer.name.split(' ')
        
        let card = new TypeFile(media, name[0])
        let imageCard = card.createImageCard();


        // ici je met en place un ecouteur d'évenement qui au clique va me recuperer le bon id de la photo ainsi que son index et je vais pouvoir mettre en place la lightBox
        imageCard.addEventListener('click', function (){
          let index = arrayMedia.findIndex( (elt) => elt.id == media.id)
          console.log(index);
          // console.log(media.image);

          // ici je construit donc la lightbox
          document.querySelector('.lightBox').innerHTML= `    
          <i class="lightbox_prev fa-solid fa-chevron-left fa-2xl"></i>
          <i class="lightbox_next fa-solid fa-chevron-right fa-2xl"></i>
          <i class="lightbox_close fa-solid fa-xmark fa-2xl"></i>
          <div class="lightBox_container">
          <img class="lightBox_img" id= "${media.id}" src ="assets/photographers/${name[0]}/${media.image}"></img>
          </div>`

          //ici je passe la lightbox en block car elle est en display none de base dans le css.
          const lightBox = document.querySelector('.lightBox')
          lightBox.style.display="block"


          // je recupere ici le bouton qui vas me permettre de fermer la lightbox. mais aussi les deux autres boutons me permettant de changé de photos
          const btnClose = document.querySelectorAll('.lightbox_close')
          const nextImg = document.querySelectorAll('.lightbox_next')
          const prevImg = document.querySelectorAll('.lightbox_prev')
          // console.log(nextImg);
          // console.log(prevImg);
          // et je boucle dessus car j'en ai plusieurs, d'ou le SelectorAll. et j'y rajoute un ecouteur d'evenement pour fermer la lightbox
          btnClose.forEach(element => element.addEventListener('click', () => {
          // e.preventDefault()
          // console.log(element);
          lightBox.style.display="none"
          }))
          
          nextImg.forEach(element => element.addEventListener('click', () => {
            // e.preventDefault()
            console.log(index++);

            document.querySelector('.lightBox_img').setAttribute('src', `assets/photographers/${name[0]}/${imageMedia[i+1].image}`)
            // console.log(i);
            // console.log(imageMedia[i+1]);
            }))

        })

        document.querySelector('.photographer_media').append(imageCard);
      }
     
      
      
     

      // ici je fais pareil pour les video
      for (let i = 0; i < videoMedia.length; i++){
        const mediaV = videoMedia[i];
        let name = photographer.name.split(' ')
        let card = new TypeFile(mediaV, name[0])
        let videoCard = card.createVideoCard();
        
        document.querySelector('.photographer_media').append(videoCard);
      }
      
      // ici j'instanci un nouvel objet qui vas s'occuper d'appeler la method qui affiche le tarif journalié pour l'instant.
      let cardTarif = new TypeFile(priceMedia[0], photographer.name)
      let getCardTarif = cardTarif.createTarifCard();
      document.querySelector('#main').append(getCardTarif);
   

    return {name, portrait, city, country, id, tagline, price}
}

async function initiation(){
    const dataPhoto = await getPhotographers()
    displayPhotographerMain(dataPhoto.photographers)
}

initiation();