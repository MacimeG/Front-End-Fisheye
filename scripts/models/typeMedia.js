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
        let like = document.createElement('div')
        let nbLike = document.createElement('p')
        let heartIcon = document.createElement('i')


        // ici je met en place les attributs 
        article.setAttribute('class','blocMediaImg')
        img.setAttribute('id', `${this._id}`)
        img.setAttribute('class', 'photographerMedia_image')
        img.setAttribute('src', `assets/photographers/${this._photoName}/${this._image}`)
        div.setAttribute('class', 'blocMediaImg--info')
        title.setAttribute('class', 'blocMediaImg--title')
        like.setAttribute('class', 'blocMedia--likes')
        heartIcon.setAttribute('class', 'fa-regular fa-heart heartIcon')
        nbLike.setAttribute('class', 'nombreLike')

        // ici je met en place un ecouteur d'évenement qui au clique va me rajouter un like en dessous des photos et aussi me remplir l'icon . ça fonctionne
        heartIcon.addEventListener('click', (e)=> {
            console.log(e);
            // ici je crée une variable dans lequel je vais la mettre directement a +1 et a laquel je vais additionné le nombre de like déjà present
            let likes = +1; 
            likes = likes + parseFloat(this._likes)
            nbLike.textContent = likes
            
            let allLike = document.querySelector('.asideCard_likes')
            
            console.log(e.target.classList.contains('activ'));
            if (e.target.classList.contains('activ')) {
                console.log('tu recliques');
                heartIcon.setAttribute('class', 'fa-regular fa-heart heartIcon')
                allLike.textContent--
                nbLike.textContent--
                
            }
            else{
                heartIcon.setAttribute('class', 'fa-solid fa-heart heartIcon activ')
                allLike.textContent++
                
            }   
           
        })

        // ici je met le titre et le nombre de like correspondant a la photo
        title.textContent = this._title;
        nbLike.textContent = this._likes;
        
        // ici j'insere les differement element 
        div.appendChild(title)
        like.appendChild(heartIcon)
        like.appendChild(nbLike)
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
        let like = document.createElement('div')
        let heartIcon = document.createElement('i')
        let nbLike = document.createElement('p')

        article.setAttribute('class', 'blocMediaVideo')
        // video.setAttribute('controls', "")
        video.setAttribute('class', 'photographerMedia_video')
        source.setAttribute('src', `assets/photographers/${this._photoName}/${this._video}`)
        div.setAttribute('class', 'blocMediaVideo--info')
        title.setAttribute('class', 'blocMediaVideo--title')
        like.setAttribute('class', 'blocMedia--likes')
        heartIcon.setAttribute('class', 'fa-regular fa-heart')


         // ici je met en place un ecouteur d'évenement qui au clique va me rajouter un like en dessous des videos et aussi me remplir l'icon . ça fonctionne
        heartIcon.addEventListener('click', (e)=> {
            // ici je crée une variable dans lequel je vais la mettre directement a +1 et a laquel je vais additionné le nombre de like déjà present
            let likes = +1; 
            likes = likes + parseFloat(this._likes)
            nbLike.textContent = likes
            
            let allLike = document.querySelector('.asideCard_likes')
            
            console.log(e.target.classList.contains('activ'));
            // ici je met en place une condition qui verifie si l'element html contient une class specifique
            if (e.target.classList.contains('activ')) {
                heartIcon.setAttribute('class', 'fa-regular fa-heart heartIcon')
                allLike.textContent--
                nbLike.textContent--
                
            }
            else{
                heartIcon.setAttribute('class', 'fa-solid fa-heart heartIcon activ')
                allLike.textContent++
                
            }   
           
        })

        title.textContent = this._title;
        nbLike.textContent = this._likes;
        

        div.appendChild(title)
        like.appendChild(heartIcon)
        like.appendChild(nbLike)
        div.appendChild(like)
        
        video.appendChild(source)
        article.appendChild(video)
        article.appendChild(div)


        return article;
    }

    createTarifCard(){
        let aside = document.createElement('aside')
        let pAside = document.createElement('p')
        let contentAside = document.createElement('div')
        let likeAside = document.createElement('p')


        aside.setAttribute('class','asideCard')
        pAside.setAttribute('class','asideCard_price')
        contentAside.setAttribute('class','asideCard_content')
        likeAside.setAttribute('class','asideCard_likes')


        pAside.textContent = this._price+'€ / jour';
        contentAside.appendChild(likeAside)
        aside.appendChild(contentAside)
        aside.appendChild(pAside)

        return aside;

    }
}
