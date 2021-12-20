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
let login_container = document.getElementById("login-container");
let register_container = document.getElementById("register-container");
let landing_container = document.getElementById("landing-container");
let search_container = document.getElementById("Search");
let game_container = document.getElementById("game-container");
let loading_container = document.getElementById("loadingSpinner")

// BUTTON //

let account_button = document.getElementById("account-button");
let tardium_button = document.getElementById("tardium-button");
let nav_games = document.getElementById("nav-games");
let nav_search = document.getElementById("nav-search");


// FUNCIONALIDAD MENU NAV //
function hideAll(){
    userGameContainer.hidden = true;
    login_container.hidden = true;
    register_container.hidden = true;
    landing_container.hidden = true;
    search_container.hidden = true;
    game_container.hidden = true;
    loading_container.hidden = true;
};
// CLICK FUNCTIONS //
account_button.addEventListener('click',function(){
    hideAll();
    login_container.hidden = false;
})
tardium_button.addEventListener('click',function(){
    hideAll();
    landing_container.hidden = false;
})
nav_games.addEventListener('click',function(){
    hideAll();
    game_container.hidden = false;
})
nav_search.addEventListener('click',function(){
    hideAll();
    search_container.hidden = false;
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
        console.log(data);
        for (let i = 0; i < item.length; i++) {
            const element = item[i];
            element.src = data[i].img_path;
        }
    M.Carousel.init(elems,{
        padding : 50,
        dist : -200
    });
})});




function LoadGames()
{
    fetch(PATH + "php_files/loadUserGames.php")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            userGameContainer.innerHTML='';
            if(data != null)
            {
                userGameContainer.innerHTML='';
                data.forEach(game => {
                    /////* CARD */////
                    let column = document.createElement('div');
                    column.classList.add("col","s12","m6","l3");
        
                    let card = document.createElement('div');
                    card.classList.add("game-card");
    
                    /////* CARD IMAGE */////
                    let cardImage = document.createElement('div');
                    cardImage.classList.add("game-card-image","waves-effect","waves-block","waves-light");
                    
                    let imageElement = document.createElement('img');
                    imageElement.classList.add("card-image-size");
                    imageElement.src = "../img/defaultUserImage.png";
        
                    /////* CARD CONTENT */////
                    let cardContent = document.createElement('div');
                    cardContent.classList.add("game-card-content");
        
                    let gameTitleContent = document.createElement('span');
                    gameTitleContent.classList.add("game-card-title","grey-text","text-darken-4", "card-footer-size", "center");
                    gameTitleContent.innerHTML = game.name;
        
                    let icon = document.createElement('i');
                    icon.classList.add("material-icons", "prefix");
                    icon.innerHTML = "videogame_asset";
        
                    let btn = document.createElement('button');
                    btn.classList.add("btn","waves-effect", "waves-light", "red", "lighten-1");
                    btn.innerText = "Jugar";
                    btn.addEventListener("click",() => {
                        fetch(PATH + "php_files/playGame.php",
                            { method: 'POST', body: "" })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                            });
                        }
                    );
    
                    gameTitleContent.append(btn, icon);
                    cardContent.append(gameTitleContent);
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