let input = document.getElementById(`movie-input`); 
let searchButton = document.getElementById(`search`); 
let container = document.getElementById(`movie-container`);

searchButton.addEventListener(`click`,()=>{
    console.log(input.value);
    let url = `http://www.omdbapi.com/?s=${input.value}&i=tt3896198&apikey=d4bb596e`;
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        console.log(data.Search)
        container.innerHTML='';
        data.Search.forEach(movie => {
            /////* CARD */////
            let column = document.createElement('div');
            column.classList.add("col","s12","m6","l4");
            
            let card = document.createElement('div');
            card.classList.add("card");

            /////* CARD IMAGE */////
            let cardImage = document.createElement('div');
            cardImage.classList.add("card-image","waves-effect","waves-block","waves-light");
            
            let imageElement = document.createElement('img');
            imageElement.classList.add("activator")
            imageElement.src = movie.Poster;

            /////* CARD CONTENT */////
            let cardContent = document.createElement('div');
            cardContent.classList.add("card-content");

            let movieTitleContent = document.createElement('span');
            movieTitleContent.classList.add("card-title","activator","grey-text","text-darken-4");
            movieTitleContent.innerHTML = movie.Title;

            let iconContent = document.createElement('i');
            iconContent.classList.add("material-icons","right");
            iconContent.innerHTML = "more_vert";
            

            /////* CARD REVEAL */////
            let cardReveal = document.createElement('div');
            cardReveal.classList.add('card-reveal');
            
            let movieTitleReveal = document.createElement('span');
            movieTitleReveal.innerHTML = movie.Title;
            movieTitleReveal.classList.add("card-title","grey-text","text-darken-4");
            
            let iconReveal = document.createElement('i');
            iconReveal.classList.add("material-icons","right");
            iconReveal.innerHTML = "close";
            let infoMovieYear = document.createElement('blockquote');
            infoMovieYear.innerHTML = "<b>Year:</b> "+movie.Year;
            let infoMovieType = document.createElement('blockquote');
            infoMovieType.innerHTML = "<b>Type: </b>"+movie.Type;
            let infoMovie = document.createElement('p');
            infoMovie.innerHTML = "WIP";

            /////* APPENDS */////
            //card-reveal appends
            movieTitleReveal.append(iconReveal);
            cardReveal.append(movieTitleReveal,infoMovieYear,infoMovieType,infoMovie);
            //card-content appends
            movieTitleContent.append(iconContent);
            cardContent.append(movieTitleContent);
            //card-image appends
            cardImage.append(imageElement);
            //appends card-items to card
            card.append(cardImage, cardContent,cardReveal);
            //appends card to column
            column.appendChild(card);
            //appends column to container
            container.appendChild(column);
        }); 
    }); 
})
