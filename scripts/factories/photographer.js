export function photographerFactory(data) {
    const { name, portrait, city, country, id, tagline, price } = data;
    const picture = `assets/photographers/portrait/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const pays = document.createElement('p')
        const tag = document.createElement('p');
        const prix = document.createElement('p')

        link.setAttribute('href', `photographer.html?id=${id}`)
        link.setAttribute('class','photographer_link');
        img.setAttribute("src", picture)
        img.setAttribute('alt', `Aperçu profil de ${name}`)


        link.appendChild(img)
        link.appendChild(h2)
        
        // ici je crée un element paragraphe, dans le quel je vais y inseré les données correspondante grace a innerHTML, je rajoute la virgule en concaténant les resultat.
        // je rajoute une class au paragraphe pour pouvoir mieux le reconnaitre.
        img.className= "photographer_photo"
        h2.textContent = name;
        pays.className = 'photographer_villePays'
        tag.className = "photographer_tag"
        prix.className = "photographer_prix"

        pays.innerHTML = country+", "+city;
        tag.innerHTML = tagline;
        prix.innerHTML = price+'€/par heure'
   
        
        article.appendChild(link)
        article.appendChild(pays)
        article.appendChild(tag)
        article.appendChild(prix)
        return (article);
    }
    return { name, picture, city, country, id, tagline, price, getUserCardDOM }
}