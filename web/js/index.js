const PATH = "http://localhost/";
//const PATH = "http://moviequiz3.alumnes.inspedralbes.cat/";

let userFavMovies = [];

function AddFavMovie(){
}
function RemoveFavMovie(){
    
}

//      CONTAINERS      //
let mainContainer = document.getElementById("main-container");
let userGameContainer = document.getElementById("user-game-container");

//      TODOS LOS ELEMENTOS QUE VAN A CONTENER EL INFO DEL USUARIO EN EL SIDENAV      //
let usernameElements = document.getElementsByClassName("text-username");
let emailElements = document.getElementsByClassName("text-email");
let scoreElements = document.getElementsByClassName("text-score");


// VA, HAGO LA LISTA DE PELICULAS VA.
fetch(PATH + "php_files/loadUserGames.php")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        userGameContainer.innerHTML='';
        
        data.forEach(game => {
            /////* CARD */////
            let column = document.createElement('div');
            column.classList.add("col","s12","m6","l4");
         
            let card = document.createElement('div');
            card.classList.add("game-card");

            /////* CARD CONTENT */////
            let cardContent = document.createElement('div');
            cardContent.classList.add("game-card-content");

            let gameTitleContent = document.createElement('span');
            gameTitleContent.classList.add("card-title","grey-text","text-darken-4", "card-footer-size", "center");
            gameTitleContent.innerHTML = game.name;

            let icon = document.createElement('i');
            icon.classList.add("material-icons", "prefix");
            icon.innerHTML = "videogame_asset";

            gameTitleContent.append(icon);
            cardContent.append(gameTitleContent);
            card.append(cardContent);
            column.append(card);
            userGameContainer.append(column);
        });
    });


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