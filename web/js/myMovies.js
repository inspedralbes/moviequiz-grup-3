let mYfilms_btn = document.getElementById('nav-my-movies');

let myMovies_container = document.getElementById('mymovies-container');


mYfilms_btn.addEventListener(`click`, () => {
    fetch(PATH + "php_files/myMovies.php")
        .then(res => res.json())
        .then(function (data) {
            LoadFavoriteMovies(data);
        });
})

function LoadFavoriteMovies(data)
{
    //console.log(data);
    myMovies_container.innerHTML = '';
    let counter = 0;
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
        infoMovieYear.innerHTML = "<b>Any:</b> " + movie.year;
        let infoMovie = document.createElement('p');

        let btn = document.createElement('button');
        btn.classList.add("btn", "btn-block", "waves-effect", "waves-light", "deep-purple", "lighten-1");
        btn.innerText = "Treure de preferits";
        btn.addEventListener("click", function () {
            let movieData = new FormData();
            movieData.append('type', 'remove');
            movieData.append('id', movie.id_movie);
            movieData.append('title', movie.title);
            movieData.append('year', movie.year);
            movieData.append('imgPath', movie.img_path);
            fetch(PATH + "php_files/addMovie.php",
                { method: 'POST', body: movieData })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                });
            column.remove();
        });
        let ratingLabel = document.createElement('label');
        ratingLabel.innerText = "Puntuació: ";
        
        let ratingDiv = document.createElement('div');
        ratingDiv.id = "rating-select";

        for (let i = 1; i <= 5; i++)
        {
            let ratingInput = document.createElement('input');
            ratingInput.type = "radio";
            ratingInput.id = "rating"+i;
            ratingInput.name = "stars"+counter;
            ratingInput.value = i;

            let radioText = document.createElement('span');
            radioText.innerHTML = i;

            let label = document.createElement('label');
            label.for = "stars"+counter;

            label.append(ratingInput, radioText)
            ratingDiv.append(label);
        }

        let commentLabel = document.createElement('label');
        commentLabel.innerText = "Comentari: ";

        let commentInput = document.createElement('textarea');
        commentInput.id = "comment-input";
        commentInput.placeholder = "Comentari...";

        let saveBtn = document.createElement('button');
        saveBtn.classList.add("btn", "btn-block", "waves-effect", "waves-light", "deep-purple", "lighten-1");
        saveBtn.innerText = "Guardar feedback";
        saveBtn.addEventListener("click", () => {
            let feedbackData = new FormData();
            feedbackData.append('id_movie', movie.id_movie);
            feedbackData.append('rating', card.querySelector(`input[type="radio"]:checked`).value);
            feedbackData.append('comment', commentInput.value);
            fetch(PATH + "php_files/addFeedback.php",
                { method: 'POST', body: feedbackData })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                });
        });

        /////* APPENDS */////
        //card-reveal appends
        movieTitleReveal.append(iconReveal);
        cardReveal.append(movieTitleReveal, infoMovieYear, btn, infoMovie, ratingLabel, ratingDiv, commentLabel, commentInput, saveBtn);
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
        counter++;
    });
}