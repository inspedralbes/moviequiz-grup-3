let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let loginButton = document.getElementById("loginButton");

const path = "login.php";
let userData = new FormData();

loginButton.addEventListener('click', () => {
    Login();
});

function Login() {
    userData.append('email', emailInput.value);
    userData.append('password', passwordInput.value);
    console.log(userData);
    fetch("http://localhost/web/login.php",
    { method: 'POST', body: userData, mode: 'no-cors'})
    .then(
        response => response.json())
    .then(
        data => {
            console.log(data);
        });
}