let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let loginButton = document.getElementById("loginButton");


let registerUsername = document.getElementById("reg-username");
let registerEmail = document.getElementById("reg-email");
let registerPassword = document.getElementById("reg-password");
let registerButton = document.getElementById("registerButton");



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
    fetch("http://localhost/web/login.php",
    { method: 'POST', body: userData })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}
function Register() {
    let userData = new FormData();
    userData.append('username', registerUsername.value);
    userData.append('email', registerEmail.value);
    userData.append('password', registerPassword.value);
    fetch("http://localhost/web/register.php",
    { method: 'POST', body: userData })
        .then(res => res.json())
        .then(data => {
            console.log(data);
    });
}