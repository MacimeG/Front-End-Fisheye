// ici on vas construire les elements qui vont s'afficher dans la pages photographer.html
function infoPhotographe(data){
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/portrait/${portrait}`;
    function getPhotographerHeader(){
        const photograph_header = document.createElement('div');
        const photograph_headerDiv = document.createElement('div');
        const photograph_header_title = document.createElement('H1');
        const photograph_header_p = document.createElement('p');
        const photograph_header_tagline = document.createElement('p');
        const photograph_header_button = document.createElement('button');
        const photograph_header_picture = document.createElement('img');
        // je met en place l'encadrement a bas de la page ici, pour une histoire de css
        const aside = document.createElement('aside');
        const pAside = document.createElement('p');
        const contentAside = document.createElement('div');
        const likeAside = document.createElement('p');
        const heart = document.createElement('i');


        aside.setAttribute('class','asideCard');
        pAside.setAttribute('class','asideCard_price');
        contentAside.setAttribute('class','asideCard_content');
        likeAside.setAttribute('class','asideCard_likes');
        heart.setAttribute('class', 'fa-solid fa-heart heartIconAside');


        pAside.textContent = price+'€ / jour';
        contentAside.appendChild(likeAside);
        contentAside.appendChild(heart);
        aside.appendChild(contentAside);
        aside.appendChild(pAside);

        photograph_header.className="photograph-headerContent";
        photograph_header_title.className='titlePhotographe';
        photograph_header_tagline.className='photograph_tagline';
        photograph_header_button.className='contact_button';
        photograph_header_picture.className='photographer_photo';
        photograph_header_p.className="countryPhotographer"

        photograph_header_title.textContent= name;
        photograph_header_p.textContent= city+","+country;
        photograph_header_tagline.textContent=tagline;
        photograph_header_button.textContent= "Contactez-moi";
        photograph_header_picture.setAttribute('src', picture);

        photograph_headerDiv.appendChild(photograph_header_title);
        photograph_headerDiv.appendChild(photograph_header_p);
        photograph_headerDiv.appendChild(photograph_header_tagline);
        
        photograph_header.appendChild(photograph_headerDiv);
        photograph_header.appendChild(photograph_header_button);
        photograph_header.appendChild(photograph_header_picture);
        photograph_header.appendChild(aside);

        // ici je met en place l'écouteur d'évenement qui va me permettre d'afficher la modal
        photograph_header_button.addEventListener('click', ()=>{
            displayModal(name);
        });
     

    return (photograph_header);
    }
    return {name, picture, city, country, id, tagline, price, getPhotographerHeader};
     
}
function infoMedia(data, name, medias){
    const {id, photographerId, title, image, video, likes, date, price} = data;
    const picture = `assets/photographers/${name}/${image}`;
    const movie = `assets/photographers/${name}/${video}`;
    function getPhotographerMain(){
        // je crée une div qui va m'accueillir mes articles, qui eux contienne photo ou vidéos.
        // const photograph_media = document.createElement('div')
        const photograph_article = document.createElement('article');
        const photograph_info = document.createElement('div');
        const photograph_title = document.createElement('p');
        const photograph_blocLike = document.createElement('div');
        const photograph_nbLike = document.createElement('p');
        const photograph_heartIcon = document.createElement('i');
        // console.log(medias);
        // ici je vais mettre les attribut au constante crée au dessus
        photograph_article.className='blocMedia';
        photograph_article.setAttribute('tabIndex','0');
        photograph_info.className="blocMediaInfo";
        photograph_title.className="blocMediaTitle";
        photograph_blocLike.className="blocMedia--likes";
        photograph_nbLike.className="nombreLike";
        photograph_heartIcon.className="fa-regular fa-heart heartIcon";
        photograph_title.textContent=title;
        photograph_nbLike.textContent= likes;

        // ici je met en place l'écouteur d'évenement qui vas me permettre d'ouvrir la lightbox avec la touche enter
        photograph_article.addEventListener('keydown', (e)=> {
            if (e.key === 'Enter') {
                lightbox(id, name, image, title, video, data, medias);
            }
        });
       
        if (image) {
            const photograph_img = document.createElement('img');
            photograph_img.setAttribute('src', picture);
            photograph_img.className="photographerMedia";
            photograph_img.alt = `Image de ${title}`;
            photograph_article.appendChild(photograph_img);
            photograph_img.addEventListener('click', ()=> lightbox(id, name, image, title, video, data, medias));           
        }
        else if(video){
            const photograph_video = document.createElement('video');
            photograph_video.setAttribute('src', movie);
            photograph_video.className="photographerMedia";
            photograph_video.alt=`Video de ${title}`;
        
            photograph_article.appendChild(photograph_video);

            photograph_video.addEventListener('click', ()=> lightbox(id, name, image, title, video, data, medias));
        }
        else return;
        
        
        // ici je met en place l'écouteur d'évenement qui va me gerer les likes.
        photograph_heartIcon.addEventListener('click', (e)=> {
            // ici je crée une variable dans lequel je vais la mettre directement a +1 et a laquel je vais additionné le nombre de like déjà present
            let like = +1; 
            like = like + parseFloat(likes);
            photograph_nbLike.textContent = likes;
            let allLike = document.querySelector('.asideCard_likes');

            // ici je met en place une condition qui verifie si l'element html contient une class specifique
            if (e.target.classList.contains('activ')) {
                photograph_heartIcon.setAttribute('class', 'fa-regular fa-heart heartIcon');
                allLike.textContent--;
                photograph_nbLike.textContent-1;
                
            }
            else{
                photograph_heartIcon.setAttribute('class', 'fa-solid fa-heart heartIcon activ');
                photograph_nbLike.textContent++;
                allLike.textContent++;
            }   
        });
        
        photograph_info.appendChild(photograph_title);
        
        photograph_blocLike.appendChild(photograph_nbLike);
        photograph_blocLike.appendChild(photograph_heartIcon);
        
        photograph_info.appendChild(photograph_blocLike);
        photograph_article.appendChild(photograph_info);

        return(photograph_article);

    }
    return{id, photographerId, title, image, video, likes, date, price, getPhotographerMain};
}