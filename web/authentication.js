window.onload = function() {
    /*==========Check if user have an account in session==========*/
    fetch(PATH + "php_files/sessionChecker.php")
    .then(res => res.json())
    .then(data => {
        if(data.isLogged == true)
        {
            user = data.user[0];
            LoadInfoUser(user);

            document.getElementById("idValue").innerHTML = "ID: " + user.id_user;
            document.getElementById("emailValue").innerHTML = "Email: " + user.email;
            document.getElementById("usernameValue").innerHTML = "Username: " + user.username;
            document.getElementById("scoreValue").innerHTML = "Score: " + user.score;

            console.log(user);
            isLogged();
        }    
        else
        {
            loginContainer.hidden = false;
        }   
    });
}


/*====== CONTAINERS =======*/
let loginContainer = document.getElementById("login-container"); // LOGIN <div id="login-container">...</div>
let registerContainer = document.getElementById("register-container"); // REGISTER <div id="register-container">...</div>

/*====== ELEMENT =======*/
let openRegister = document.getElementById(`open-register`); // <a>...</a> element to open register section
let openLogin = document.getElementById(`open-login`); // <a>...</a> element to open login section
/*====== Events to swap between login and register sections =======*/
openRegister.addEventListener('click',() => {
    SwapSignUp();
});
openLogin.addEventListener('click',() => {
    SwapSignUp();
});

function SwapSignUp(){
    loginContainer.hidden = !loginContainer.hidden;
    registerContainer.hidden = !registerContainer.hidden;
}

//#region LOGIN FORM
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const loginButton = document.getElementById("login-button");

/*==========We add the events needed for login==========*/
loginButton.addEventListener('click', () => {
    Login();
});

/*==========function that will be executed after clicking login button==========*/
function Login() {
    /*==========Data we will send by post to server==========*/
    let userData = new FormData();

    userData.append('email', loginEmail.value);
    userData.append('password', loginPassword.value);

    /*==========AJAX to login.php==========*/
    fetch(PATH + "php_files/login.php",
    { method: 'POST', body: userData })
        .then(res => res.json())
        .then(data => {
            /*==========response we recive from server==========*/
            console.log(data);
            if(data.user != null)
            {
                let user = data.user[0];
                
                LoadInfoUser(user);
                document.getElementById("idValue").innerHTML = "ID: " + user.id_user;
                document.getElementById("emailValue").innerHTML = "Email: " + user.email;
                document.getElementById("usernameValue").innerHTML = "Username: " + user.username;
                document.getElementById("scoreValue").innerHTML = "Score: " + user.score;
                isLogged();
            }
        });
}
//#endregion

//#region REGISTER FORM
const registerUsername = document.getElementById("reg-username");
const registerEmail = document.getElementById("reg-email");
const registerPassword = document.getElementById("reg-password");
let registerButton = document.getElementById("register-button");

/*==========We add the events needed for login==========*/
registerButton.addEventListener('click', () => {
    Register();
});

/*==========function that will be executed after clicking register button==========*/
function Register() {
    /*==========Data we will send by post to server==========*/
    let userData = new FormData();

    userData.append('username', registerUsername.value);
    userData.append('email', registerEmail.value);
    userData.append('password', registerPassword.value);

    /*==========AJAX to register.php==========*/
    fetch(PATH + "php_files/register.php",
    { method: 'POST', body: userData})
        .then(res => res.json())
        .then(data => {
            /*==========response we recive from server==========*/
            console.log(data);
    });
}
//#endregion

//#region LOGOUT
let logOutButton = document.getElementById("log-out-button");

/*==========We add the events needed for logout==========*/
logOutButton.addEventListener("click", () =>{
    LogOut();
})
/*==========function that will be executed after clicking logout button==========*/
function LogOut(){
    /*==========We make a GET method to server==========*/
    fetch(PATH + "php_files/logOut.php")
    .then(res => res.json())
    .then(data => {
        /*==========response we recive from server==========*/
            console.log(data);
            loginContainer.hidden = false;
            mainContainer.hidden = true;
    });
}
//#endregion

/*==========function called when you log-in ==========*/
function isLogged(){
    loginContainer.hidden = true;
    mainContainer.hidden = false;
}

///MATERIALIZE JAVASCRIPTS
document.addEventListener('DOMContentLoaded', function () {
    var textNeedCount = document.querySelectorAll('#reg-username, #textarea1');
    M.CharacterCounter.init(textNeedCount);
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

