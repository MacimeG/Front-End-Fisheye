// import {lightbox} from '../utils/lightbox.js';
export class TypeFile{
    constructor(data, photoName){
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._image = data.image;
        this._video = data.video;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
        this._photoName = photoName;
    }

    createImageCard(){

        // je met en place la création des cartes qui vas contenir photo titre like etc..
        let article = document.createElement('article')
        let img = document.createElement('img')
        let div = document.createElement('div')
        let title = document.createElement('p')
        let like = document.createElement('p')
        let heartIcon = document.createElement('i')


        // ici je met en place les attributs 
        article.setAttribute('class','blocMediaImg')
        img.setAttribute('id', `${this._id}`)
        img.setAttribute('class', 'photographerMedia_image')
        img.setAttribute('src', `assets/photographers/${this._photoName}/${this._image}`)
        div.setAttribute('class', 'blocMediaImg--info')
        title.setAttribute('class', 'blocMediaImg--title')
        like.setAttribute('class', 'blocMediaImg--likes')
        heartIcon.setAttribute('class', 'fa-regular fa-heart')

        // ici je met en place un ecouteur d'évenement qui au clique va me recuperer le bon id de la photo

        // img.addEventListener('click', function (){
        //     console.log(img.id);
        //     console.log(img.findIndex(elt => elt.id == elt.img))
        // })


        // ici je met le titre et le nombre de like correspondant a la photo
        title.textContent = this._title;
        like.textContent = this._likes;
        
        // ici j'insere les differement element 
        div.appendChild(title)
        like.appendChild(heartIcon)
        div.appendChild(like)
        article.appendChild(img)
        article.appendChild(div)

        // ici je retourne l'article qui vas afficher la photo ainsi que les informations correspondante.

        return article;
    }
    createVideoCard(){
        // je met en place la creation des cartes qui vas contenir les videos.
        let article = document.createElement('article')
        let video = document.createElement('video')
        let source = document.createElement('source')
        let div = document.createElement('div')
        let title = document.createElement('p')
        let like = document.createElement('p')
        let heartIcon = document.createElement('i')

        article.setAttribute('class', 'blocMediaVideo')
        // video.setAttribute('controls', "")
        video.setAttribute('class', 'photographerMedia_video')
        source.setAttribute('src', `assets/photographers/${this._photoName}/${this._video}`)
        div.setAttribute('class', 'blocMediaVideo--info')
        title.setAttribute('class', 'blocMediaVideo--title')
        like.setAttribute('class', 'blocMediaVideo--likes')
        heartIcon.setAttribute('class', 'fa-regular fa-heart')

        title.textContent = this._title;
        like.textContent = this._likes;
        

        div.appendChild(title)
        like.appendChild(heartIcon)
        div.appendChild(like)
        
        video.appendChild(source)
        article.appendChild(video)
        article.appendChild(div)
     


        return article;
    }

    createTarifCard(){

        let aside = document.createElement('aside')
        let pAside = document.createElement('p')

        pAside.textContent = this._price+'€ / jour';

        aside.appendChild(pAside)


        return aside;

    }
}
