let input = document.getElementById(`movie-input`); 
let searchButton = document.getElementById(`search-button`); 
let container = document.getElementById(`movie-container`);

input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
});

searchButton.addEventListener(`click`,()=>{
    let url = `http://www.omdbapi.com/?s=${input.value}&i=tt3896198&apikey=d4bb596e`;
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        container.innerHTML='';
        if(data.Response == 'True')
        {
            data.Search.forEach(movie => {
                if(movie.Type == "movie")
                {
                    /////* CARD */////
                    let column = document.createElement('div');
                    column.classList.add("col","s12","m6","l3");
                    
                    let card = document.createElement('div');
                    card.classList.add("card");
    
                    /////* CARD IMAGE */////
                    let cardImage = document.createElement('div');
                    cardImage.classList.add("card-image","waves-effect","waves-block","waves-light");
                    
                    let imageElement = document.createElement('img');
                    imageElement.classList.add("activator", "card-image-size");
                    imageElement.src = movie.Poster;
    
                    /////* CARD CONTENT */////
                    let cardContent = document.createElement('div');
                    cardContent.classList.add("card-content");
    
                    let movieTitleContent = document.createElement('span');
                    movieTitleContent.classList.add("card-title","activator","grey-text","text-darken-4", "card-footer-size", "center");
                    movieTitleContent.innerHTML = movie.Title;
                    
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
                    let infoMovie = document.createElement('p');
    
                    let btn = document.createElement('button');
                    btn.classList.add("btn","waves-effect", "waves-light", "deep-purple", "lighten-1");
                    btn.innerText = "Afegir a preferits";
                    btn.addEventListener("click",function(){
                        let movieData = new FormData();
                        movieData.append('type', "add");
                        movieData.append('id', movie.imdbID);
                        movieData.append('title', movie.Title);
                        movieData.append('year', movie.Year);
                        movieData.append('imgPath', movie.Poster);
                        fetch(PATH + "php_files/addMovie.php",
                            { method: 'POST', body: movieData })
                            .then(res => res.json())
                            .then(data => {
                                //console.log(data);
                            });
                    });

                    
                    /////* APPENDS */////
                    //card-reveal appends
                    movieTitleReveal.append(iconReveal);
                    cardReveal.append(movieTitleReveal,infoMovieYear,btn, infoMovie);
                    //card-content appends
                    cardContent.append(movieTitleContent);
                    //card-image appends
                    cardImage.append(imageElement);
                    //appends card-items to card
                    card.append(cardImage, cardContent,cardReveal);
                    //appends card to column
                    column.appendChild(card);
                    //appends column to container
                    container.appendChild(column);
                }
            });
        }
    }); 
})