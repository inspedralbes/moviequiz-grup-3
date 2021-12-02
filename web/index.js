let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let loginButton = document.getElementById("loginButton");

const path = "login.php";


loginButton.addEventListener('click', () => {
    Login();
});

function Login() {
    let userData = new FormData();
    userData.append('email', emailInput.value);
    userData.append('password', passwordInput.value);
    fetch("http://localhost/web/login.php",
    { method: 'POST', body: userData})
        .then(res => res.json())
        .then(data => {
            console.log(data.email);
        });
}