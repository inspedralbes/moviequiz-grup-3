let mYfilms_btn = document.getElementById('nav-my-movies');

let myMovies_container = document.getElementById('mymovies-container');


mYfilms_btn.addEventListener(`click`, () => {
    console.log(PATH + "php_files/myMovies.php");
    fetch(PATH + "php_files/myMovies.php")
        .then(res => res.json())
        .then(function (data) {
            console.log(data)
            myMovies_container.innerHTML = '';
            data.forEach(movie => {
                /////* CARD */////
                let column = document.createElement('div');
                column.classList.add("col", "s12", "m6", "l3");

                let card = document.createElement('div');
                card.classList.add("card");

                /////* CARD IMAGE */////
                let cardImage = document.createElement('div');
                cardImage.classList.add("card-image", "waves-effect", "waves-block", "waves-light");

                let imageElement = document.createElement('img');
                imageElement.classList.add("activator", "card-image-size");
                imageElement.src = movie.img_path;

                /////* CARD CONTENT */////
                let cardContent = document.createElement('div');
                cardContent.classList.add("card-content");

                let movieTitleContent = document.createElement('span');
                movieTitleContent.classList.add("card-title", "activator", "grey-text", "text-darken-4", "card-footer-size", "center");
                movieTitleContent.innerHTML = movie.title;


                /////* CARD REVEAL */////
                let cardReveal = document.createElement('div');
                cardReveal.classList.add('card-reveal');

                let movieTitleReveal = document.createElement('span');
                movieTitleReveal.innerHTML = movie.title;
                movieTitleReveal.classList.add("card-title", "grey-text", "text-darken-4");

                let iconReveal = document.createElement('i');
                iconReveal.classList.add("material-icons", "right");
                iconReveal.innerHTML = "close";
                let infoMovieYear = document.createElement('blockquote');
                infoMovieYear.innerHTML = "<b>Year:</b> " + movie.year;
                let infoMovieType = document.createElement('blockquote');
                infoMovieType.innerHTML = "<b>Type: </b>" + 'Movie';
                let infoMovie = document.createElement('p');

                let btn = document.createElement('button');
                btn.classList.add("btn", "waves-effect", "waves-light", "deep-purple", "lighten-1");
                btn.innerText = "Afegir pelicula";
                btn.addEventListener("click", function () {
                    /*let myObject = {
                        id : movie.imdbID,
                        title :  movie.Title,
                        year : movie.Year,
                        imgpath : movie.Poster
                    }*/
                    let movieData = new FormData();
                    movieData.append('id', movie.imdbID);
                    movieData.append('title', movie.Title);
                    movieData.append('year', movie.Year);
                    movieData.append('imgPath', movie.Poster);
                    fetch(PATH + "php_files/addMovie.php",
                        { method: 'POST', body: movieData })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                        });
                    //console.log(JSON.stringify(myObject));
                });
                infoMovie.innerHTML = "WIP";

                /////* APPENDS */////
                //card-reveal appends
                movieTitleReveal.append(iconReveal);
                cardReveal.append(movieTitleReveal, infoMovieYear, infoMovieType, btn, infoMovie);
                //card-content appends
                cardContent.append(movieTitleContent);
                //card-image appends
                cardImage.append(imageElement);
                //appends card-items to card
                card.append(cardImage, cardContent, cardReveal);
                //appends card to column
                column.appendChild(card);
                //appends column to container
                myMovies_container.appendChild(column);
            });
        });
})