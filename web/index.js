const PATH = "http://localhost/";
//const PATH = "http://moviequiz3.alumnes.inspedralbes.cat/";

let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let loginButton = document.getElementById("loginButton");

let registerUsername = document.getElementById("reg-username");
let registerEmail = document.getElementById("reg-email");
let registerPassword = document.getElementById("reg-password");
let registerButton = document.getElementById("registerButton");

let user = null;

fetch("php_files/sessionChecker.php")
.then(res => res.json())
.then(data => {
    if(data.isLogged == true)
    {
        user = data.user[0];
        console.log(user);
        document.getElementById("loginContainer").hidden = true;
        document.getElementById("registerContainer").hidden = true;
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
    fetch(`${PATH}php_files/login.php`,
    { method: 'POST', body: userData })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            user = data.user[0];
            document.getElementById("idValue").innerHTML = "ID: " + user.id_user;
            document.getElementById("emailValue").innerHTML = "Email: " + user.email;
            document.getElementById("usernameValue").innerHTML = "Username: " + user.username;
            document.getElementById("scoreValue").innerHTML = "Score: " + user.score;
        });
}
function Register() {
    let userData = new FormData();
    userData.append('username', registerUsername.value);
    userData.append('email', registerEmail.value);
    userData.append('password', registerPassword.value);
    fetch(`${PATH}php_files/register.php`,
    { method: 'POST', body: userData })
        .then(res => res.json())
        .then(data => {
            console.log(data);
    });
}