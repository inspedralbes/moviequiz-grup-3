const PATH = "http://localhost/";
//const PATH = "http://moviequiz3.alumnes.inspedralbes.cat/";

let userFavMovies = [];

function AddFavMovie(){
}
function RemoveFavMovie(){
    
}


// INIT SIDE NAV //
document.addEventListener('DOMContentLoaded', function () {
    var textNeedCount = document.querySelectorAll('#reg-username, #textarea1');
    M.CharacterCounter.init(textNeedCount);
    var elems = document.querySelectorAll('.sidenav');
    var instance = M.Sidenav.init(elems);
})


//      CONTAINERS      //
let mainContainer = document.getElementById("main-container");
let userGameContainer = document.getElementById("user-game-container");
let login_container = document.getElementById("login-container");
let register_container = document.getElementById("register-container");
let landing_container = document.getElementById("landing-container");
let search_container = document.getElementById("search-container");
let game_container = document.getElementById("game-container");
let loading_container = document.getElementById("loadingSpinner")
let mymovies_container = document.getElementById("fav-movies");
let leaderboard_container = document.getElementById("leaderboard");

landing_container.hidden = false;
// BUTTON //
const signup_button = document.getElementById("signup-button");
let account_button = document.getElementById("account-button");
let tardium_button = document.getElementById("tardium-button");
let nav_games = document.getElementById("nav-games");
let nav_search = document.getElementById("nav-search");
let nav_mymovies = document.getElementById("nav-my-movies");
let nav_leaderboard = document.getElementById("nav-leaderboard");


// FUNCIONALIDAD MENU NAV //
function hideAll(){
    userGameContainer.hidden = true;
    register_container.hidden = true;
    landing_container.hidden = true;
    search_container.hidden = true;
    game_container.hidden = true;
    loading_container.hidden = true;
    mymovies_container.hidden = true;
    leaderboard_container.hidden = true;
};
// CLICK FUNCTIONS //
tardium_button.addEventListener('click',function(){
    hideAll();
    landing_container.hidden = false;
})
nav_games.addEventListener('click',function(){
    hideAll();
    game_container.hidden = false;
    userGameContainer.hidden = false;
})
nav_search.addEventListener('click',function(){
    hideAll();
    search_container.hidden = false;
})
nav_mymovies.addEventListener('click',function(){
    hideAll();
    mymovies_container.hidden = false;
})
nav_leaderboard.addEventListener("click", () => {
    hideAll();
    leaderboard_container.hidden = false;
})


//      TODOS LOS ELEMENTOS QUE VAN A CONTENER EL INFO DEL USUARIO EN EL SIDENAV      //
let usernameElements = document.getElementsByClassName("text-username");
let emailElements = document.getElementsByClassName("text-email");
let scoreElements = document.getElementsByClassName("text-score");

//CAROUSEL LANDING
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var item = document.getElementsByClassName("item-img");
    fetch(PATH + "php_files/carrusel.php")
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const element = item[i];
            element.src = data[i]["img_path"];

        }
    M.Carousel.init(elems,{
        padding : 140,
        dist : -200,
        numVisible: 10,
        fullWidth: true
    });
})});

function LoadExistingGames()
{
    fetch(PATH + "php_files/loadUserGames.php")
        .then(res => res.json())
        .then(data => {
            if(data != null)
            {
                userGameContainer.innerHTML='';
                data.forEach(game => {
                    /////* CARD */////
                    let column = document.createElement('div');
                    column.classList.add("col","s12","m6","l3");
        
                    let card = document.createElement('div');
                    card.classList.add("card");
    
                    /////* CARD IMAGE */////
                    let cardImage = document.createElement('div');
                    cardImage.classList.add("card-image","waves-effect","waves-block","waves-light");
                    
                    let imageElement = document.createElement('img');
                    imageElement.classList.add("card-image-size");
                    imageElement.src = "../img/game_icon.svg";
        
                    /////* CARD CONTENT */////
                    let cardContent = document.createElement('div');
                    cardContent.classList.add("card-content", "center");
        
                    let gameTitleContent = document.createElement('span');
                    gameTitleContent.classList.add("card-title","grey-text","text-darken-4", "card-footer-size", "center");
                    gameTitleContent.innerHTML = game.name;
        
                    let btn = document.createElement('a');
                    btn.classList.add("btn","waves-effect", "waves-light", "deep-purple", "lighten-1", "modal-trigger");
                    btn.id = "btn-play";
                    btn.href = "#question-modal";
                    btn.innerText = "Jugar";
                    btn.addEventListener("click",() => {
                        let gameData = new FormData();
                        gameData.append('game_json', game.games_json);
                        gameData.append('id_game', game.id_game);
                        fetch(PATH + "php_files/games.php",
                            { method: 'POST', body: gameData })
                            .then(res => res.json())
                            .then(data => {
                                if(data != null)
                                {
                                    StartExistingGame(data, game.results_json);
                                }
                            });
                        }
                    );
                    cardContent.append(gameTitleContent, btn);
                    cardImage.append(imageElement);
                    card.append(cardImage, cardContent);
                    column.append(card);
                    userGameContainer.append(column);
                });
            }
        });
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

function ResetUserData(){
    for (var i = 0; i < usernameElements.length; i++) {
        usernameElements[i].innerHTML = "Convidat/ada";
    }
    for (var i = 0; i < emailElements.length; i++) {
        emailElements[i].innerHTML = "";
    }
    for (var i = 0; i < scoreElements.length; i++) {
        scoreElements[i].innerHTML = "---";
    }
}