const PATH = "http://localhost/";
//const PATH = "http://moviequiz3.alumnes.inspedralbes.cat/";

let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let loginButton = document.getElementById("login-button");

let registerUsername = document.getElementById("reg-username");
let registerEmail = document.getElementById("reg-email");
let registerPassword = document.getElementById("reg-password");
let registerButton = document.getElementById("register-button");

let openRegister = document.getElementById(`open-register`);
let openLogin = document.getElementById(`open-login`);
////////CONTAINERS/////////////
let loginContainer = document.getElementById("login-container");
let registerContainer = document.getElementById("register-container");

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

document.addEventListener('DOMContentLoaded', function () {
    var textNeedCount = document.querySelectorAll('#input_text, #textarea1');
    M.CharacterCounter.init(textNeedCount);
});


let user = null;

fetch(PATH + "php_files/sessionChecker.php")
.then(res => res.json())
.then(data => {
    if(data.isLogged == true)
    {
        user = data.user[0];
        console.log(user);
        document.getElementById("Search").hidden = false;
    }       
});


loginButton.addEventListener('click', () => {
    Login();
});
registerButton.addEventListener('click', () => {
    Register();
});

function Login() {
    let userData = new FormData();
    userData.append('email', emailInput.value);
    userData.append('password', passwordInput.value);
    fetch(PATH + "php_files/login.php",
    { method: 'POST', body: userData })
        .then(res => res.json())
        .then(data => {
            console.log(data);
	    if(data.user != null)
	    {
            	user = data.user[0];
            	document.getElementById("idValue").innerHTML = "ID: " + user.id_user;
            	document.getElementById("emailValue").innerHTML = "Email: " + user.email;
            	document.getElementById("usernameValue").innerHTML = "Username: " + user.username;
            	document.getElementById("scoreValue").innerHTML = "Score: " + user.score;
	    }
        });
}
function Register() {
    let userData = new FormData();
    userData.append('username', registerUsername.value);
    userData.append('email', registerEmail.value);
    userData.append('password', registerPassword.value);
    fetch(PATH + "php_files/register.php",
    { method: 'POST', body: userData })
        .then(res => res.json())
        .then(data => {
            console.log(data);
    });
}