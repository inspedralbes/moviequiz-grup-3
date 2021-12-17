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
let games_json = null;
let results_json = null;
let movieCounter = 0;
let modalTitle = document.getElementById("title-span");
let modalImg = document.getElementById("img-modal");
let modalButtons = [
    b0 = document.getElementById("r0"),
    b1 = document.getElementById("r1"),
    b2 = document.getElementById("r2"),
    b3 = document.getElementById("r3"),
    b4 = document.getElementById("r4")
];
for (let i = 0; i < modalButtons.length; i++)
{
    modalButtons[i].addEventListener("click", () => {
        NextQuestion();
    });
}



//      JSON GAME QUESTIONS     //
buttonNewGame.addEventListener("click", () => {
    fetch(PATH + "php_files/games.php")
            .then(res => res.json())
            .then(data => {
                games_json = data[0];
                movieCounter = 0;
                LoadMovieIntoModal(games_json[movieCounter]);
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
        modalButtons[i].innerHTML = years[i];
    }
}

function NextQuestion()
{
    movieCounter++;
    if(movieCounter <= 4)
    {
        LoadMovieIntoModal(games_json[movieCounter]);
    }
    else
    {
        // close modal and send json to db
        let data = new FormData();
        data.append('games_json', JSON.stringify(games_json));
        data.append('results_json', JSON.stringify(results_json));
        fetch(PATH + "php_files/insertGame.php",
        { method: 'POST', body: data}
        ).then(res => res.json()
        ).then(data => {
            console.log(data);
        });
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