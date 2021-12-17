const PATH = "http://localhost/";
//const PATH = "http://moviequiz3.alumnes.inspedralbes.cat/";


//      CONTAINERS      //
let mainContainer = document.getElementById("main-container");

//      TODOS LOS ELEMENTOS QUE VAN A CONTENER EL INFO DEL USUARIO      //
let usernameElements = document.getElementsByClassName("text-username");
let emailElements = document.getElementsByClassName("text-email");
let scoreElements = document.getElementsByClassName("text-score");

//      BOTONES QUE HACEN COSAS     //
let buttonNewGame = document.getElementById("new-game-button");

//      MODAL INITIALIZATION        //
document.addEventListener('DOMContentLoaded', function () {
    var questionModal = document.querySelector('#question-modal');
    M.Modal.init(questionModal, {
        dismissible: false,
        opacity: 0.7,
        preventScrolling: true
    });
});

//      MODAL THINGS    //
let dataJson = null;
let movieCounter = 0;
let modalTitle = document.getElementById("title-span");
let modalImg = document.getElementById("img-modal");




//      JSON GAME QUESTIONS     //
buttonNewGame.addEventListener("click", () => {
    fetch(PATH + "php_files/games.php")
            .then(res => res.json())
            .then(data => {
                dataJson = data[0];
                movieCounter = 0;
                LoadMovieIntoModal(dataJson[movieCounter]);
            });
        });


function LoadMovieIntoModal(movieInfo)
{
    let title = movieInfo['title'];
    let img = movieInfo['poster'];
    let years = movieInfo['years'];

    modalTitle.innerHTML = title;
    modalImg.src = img;

    for (let i = 0; i < years.length; i++)
    {
        button = document.getElementById("r" + i);
        button.innerHTML = years[i];
        button.addEventListener("click", () => {
            movieCounter++;
            if(movieCounter <= 4)
            {
                LoadMovieIntoModal(dataJson[movieCounter]);
            }
            else
            {
                // close modal
            }
        })
    }
}

function LoadInfoUser(user){
    for (var i = 0; i < usernameElements.length; i++) {
        usernameElements[i].innerHTML = user.username;
    }
    for (var i = 0; i < emailElements.length; i++) {
        emailElements[i].innerHTML = user.email;
    }
    for (var i = 0; i < scoreElements.length; i++) {
        scoreElements[i].innerHTML = user.score;
    }
}