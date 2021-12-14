const PATH = "http://localhost/";
//const PATH = "http://moviequiz3.alumnes.inspedralbes.cat/";


////////CONTAINERS/////////////
let mainContainer = document.getElementById("main-container");

///todos los elementos que van a contener el info del usuario
let usernameElements = document.getElementsByClassName("text-username");
let emailElements = document.getElementsByClassName("text-email");
let scoreElements = document.getElementsByClassName("text-score");

let buttonNewGame = document.getElementById("new-game-button");

openRegister.addEventListener('click',() => {
    SwapSignUp();
});
openLogin.addEventListener('click',() => {
    SwapSignUp();
});


document.addEventListener('DOMContentLoaded', function () {
    var textNeedCount = document.querySelectorAll('#reg-username, #textarea1');
    M.CharacterCounter.init(textNeedCount);
    var questionModal = document.querySelector('#question-modal');
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    M.Modal.init(questionModal, {
        dismissible: false,
        opacity: 0.7
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var questionModal = document.querySelector('#question-modal');
    M.Modal.init(questionModal, {
        dismissible: false,
        opacity: 0.7
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