const PATH = "http://localhost/";
//const PATH = "http://moviequiz3.alumnes.inspedralbes.cat/";

let userFavMovies = [];

function AddFavMovie(){
}
function RemoveFavMovie(){
    
}

//      CONTAINERS      //
let mainContainer = document.getElementById("main-container");

//      TODOS LOS ELEMENTOS QUE VAN A CONTENER EL INFO DEL USUARIO      //
let usernameElements = document.getElementsByClassName("text-username");
let emailElements = document.getElementsByClassName("text-email");
let scoreElements = document.getElementsByClassName("text-score");


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