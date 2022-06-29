//Mettre le code JavaScript lié à la page photographer.html
// j'importe la fonction getPhotographer, qui contient le fetch. pour evité de me repeter
// j'importe aussi d'autre fonctions qui vont me servir a bien faire fonctionné la page web

import { getPhotographers } from "../services/getPhotographers.js";
import { getMedia } from "../services/getMedia.js";
import { TypeFile } from "../models/typeMedia.js";
import { closeLightbox } from "../utils/lightbox.js";
import { displayModal } from "../utils/contactForm.js";
import { closeModal } from "../utils/contactForm.js";


// ici pour commencer je vais recuperer l'id dans l'url pour pouvoir le comparer avec les id des photographes pour pouvoir recuperer les bonnes data
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


    // ici les fonction permettant de fermer et ouvrir le formulaire de contact.
      displayModal()
      closeModal()

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
        // ici je recupere le premiere enfant de imageCard, qui est l'img, comme sa la lightbox s'affiche uniquement au clique sur l'image, et non sur le like.
        let childImageCard = imageCard.children
        
        // ici je met en place un ecouteur d'évenement qui au clique va me recuperer le bon id de la photo ainsi que son index et je vais pouvoir mettre en place la lightBox
        childImageCard[0].addEventListener('click', function (){
          let index = arrayMedia.findIndex( (elt) => elt.id == media.id)
          
          console.log(index);
          // console.log(media.id);
         
          // ici je construit donc la lightbox
          document.querySelector('.lightBox').innerHTML= `    
          <i class="lightbox_prev fa-solid fa-chevron-left fa-2xl"></i>
          <i class="lightbox_next fa-solid fa-chevron-right fa-2xl"></i>
          <i class="lightbox_close fa-solid fa-xmark fa-2xl"></i>
          <div class="lightBox_container">
          <img class="lightBox_media" id= "${media.id}" src ="assets/photographers/${name[0]}/${media.image}"></img>
          </div>`

          //ici je passe la lightbox en block car elle est en display none de base dans le css.
          const lightBox = document.querySelector('.lightBox')
          lightBox.style.display="block"


          // je recupere ici le bouton qui vas me permettre de fermer la lightbox. mais aussi les deux autres boutons me permettant de changé de photos


          const nextImg = document.querySelector('.lightbox_next')
          const prevImg = document.querySelectorAll('.lightbox_prev')
    
          //ici j'appel ma fonction qui va me permettre de fermer la lightbox
          closeLightbox()


          // nextImg.forEach(element => element.addEventListener('click', () => {  
          //   index++
          //   document.querySelector('.lightBox_media').setAttribute('src', `assets/photographers/${name[0]}/${imageMedia[i++].image}`)
          //   console.log(index++);
          // }))
          nextImg.addEventListener('click', function(){
            index++
            let lightbox = document.querySelector('.lightBox_media')
            
            lightbox.src= `assets/photographers/${name[0]}/${imageMedia[i++].image}?random=${new Date().getTime()}`
           
            console.log(lightbox);
            console.log(index++);
          })
          prevImg.forEach(element => element.addEventListener('click',()=> {
            // e.preventDefault()
            index--
            console.log(index--);
            document.querySelector('.lightBox_media').setAttribute('src', `assets/photographers/${name[0]}/${imageMedia[i--].image}`)
            console.log('tu cliques bien sur la precedente fleche');
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
            // ici je recupere le premiere enfant de imageCard, qui est l'img, comme sa la lightbox s'affiche uniquement au clique sur la video, et non sur le like.
        let childVideoCard = videoCard.children

        childVideoCard[0].addEventListener('click', function(){
          let index = arrayMedia.findIndex( (elt) => elt.id == mediaV.id)
          console.log(index);
          document.querySelector('.lightBox').innerHTML= `    
          <i class="lightbox_prev fa-solid fa-chevron-left fa-2xl"></i>
          <i class="lightbox_next fa-solid fa-chevron-right fa-2xl"></i>
          <i class="lightbox_close fa-solid fa-xmark fa-2xl"></i>
          <div class="lightBox_container">
          <video controls class="lightBox_media" id= "${mediaV.id}" src ="assets/photographers/${name[0]}/${mediaV.video}">
          <source src="assets/photographers/${name[0]}/${mediaV.video}" type="video/mp4">
          </video>
          </div>`

          //ici je passe la lightbox en block car elle est en display none de base dans le css.
          const lightBox = document.querySelector('.lightBox')
          lightBox.style.display="block"
          closeLightbox()
        })



        document.querySelector('.photographer_media').append(videoCard);
      }

      // ici j'instanci un nouvel objet qui vas s'occuper d'appeler la method qui affiche le tarif journalié pour l'instant.
      let cardTarif = new TypeFile(priceMedia[0], photographer.name)
      let getCardTarif = cardTarif.createTarifCard();
      document.querySelector('#main').append(getCardTarif);
      

      // ici je vais essayé d'additionné tous les likes, je me sers donc de la method .map qui construit un nouveau tableau, la fonction reduce prend toutes les valeurs et renvoi une seule valeur, qui est la somme de toute.
      const sumAllLike = arrayMedia.map(elt => elt.likes).reduce((prev,curr) => prev + curr,0)
      // ici je rajoute donc le nombre total de like, dans l'asideCard. et j'y rajoute aussi sont icon (le coeur)
      
      let asideContent = document.querySelector('.asideCard_likes')
      let asideLikeHeart = document.querySelector('.asideCard_content')
      asideContent.textContent = sumAllLike;
      
      let iconLike = document.createElement('i')
      iconLike.setAttribute('class','fa-solid fa-heart')


      // asideIcon.appendChild(iconLike)
      asideLikeHeart.appendChild(iconLike)
      

    return {name, portrait, city, country, id, tagline, price}
}

async function initiation(){
    const dataPhoto = await getPhotographers()
    displayPhotographerMain(dataPhoto.photographers)
}

initiation();

