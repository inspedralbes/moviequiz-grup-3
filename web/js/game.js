//      MODAL THINGS    //
let games_json = null;
let results_json = null;
let movieCounter = 0;
let modalTitle = document.getElementById("title-span");
let modalImg = document.getElementById("img-modal");
let modalGame = document.getElementById("start-game");
let scoreSpan = document.getElementById("score-span");
let modalEndGame = document.getElementById("end-game");
let modalButtons = [
    document.getElementById("r0"),
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3"),
    document.getElementById("r4")
];
for (let i = 0; i < modalButtons.length; i++)
{
    modalButtons[i].addEventListener("click", () => {
        NextQuestion(modalButtons[i]);
    });
}

//      BOTONES QUE HACEN COSAS     //
let buttonNewGame = document.getElementById("new-game-button");
let gameNameInput = document.getElementById("game-name");

//      MODAL INITIALIZATION        //
document.addEventListener('DOMContentLoaded', function () {
    var questionModal = document.querySelector('#question-modal');
    M.Modal.init(questionModal, {
        dismissible: false,
        opacity: 0.7,
        preventScrolling: true
    });
});

//      JSON GAME QUESTIONS     //
buttonNewGame.addEventListener("click", () => {
    fetch(PATH + "php_files/games.php")
    .then(res => res.json())
    .then(data => {
        modalGame.hidden = false;
        modalEndGame.hidden = true;
        games_json = null;
        results_json = {
            "pressed": [],
            "name": gameNameInput.value,
            "score": 0
        }
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

    modalTitle.textContent = title;
    modalImg.src = img;

    for (let i = 0; i < years.length; i++)
    {
        modalButtons[i].textContent = years[i];
    }
}

function NextQuestion(buttonPressed)
{
    movieCounter++;
    results_json["pressed"].push(buttonPressed.textContent);
    if(movieCounter < games_json.length)
    {
        LoadMovieIntoModal(games_json[movieCounter]);
    }
    else
    {
        modalGame.hidden = true;
        modalEndGame.hidden = false;
        let data = new FormData();
        data.append('games_json', JSON.stringify(games_json));
        data.append('results_json', JSON.stringify(results_json));
        fetch(PATH + "php_files/insertGame.php",
        { method: 'POST', body: data }
        ).then(res => res.json()
        ).then(score => {
            //console.log(score.score);
            console.log(score);
            let userScore = new FormData();
            userScore.append('score', score.score);
            fetch(PATH + "php_files/updateUserScore.php",
            { method: 'POST', body: userScore }
            ).then(res => res.json()
            ).then(data => {
                console.log(data);
            });
            scoreSpan.innerHTML = score.score;
        });
    }
}