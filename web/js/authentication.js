window.onload = function() {
    /*==========Check if user have an account in session==========*/
    fetch(PATH + "php_files/sessionChecker.php")
    .then(res => res.json())
    .then(data => {
        if(data.isLogged == true)
        {
            user = data.user[0];
            LoadInfoUser(user);
            LoadExistingGames();
            isLogged();
        }    
        else
        {
            isNotLogged();
        }
    });
}

//      MODAL INITIALIZATION        //
let authModal = document.querySelector('#authentication-modal');
document.addEventListener('DOMContentLoaded', function () {
    M.Modal.init(authModal, {
        dismissible: false,
        opacity: 0.7,
        preventScrolling: true
    });
});

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
    loginContainer.querySelector("form").reset();
    registerContainer.querySelector("form").reset();
}

//#region LOGIN FORM
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const loginButton = document.getElementById("login-button");

// Click on login when you click "Enter" in the keyboard
loginPassword.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        loginButton.click();
    }
});

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
            if(data.user != null)
            {
                let user = data.user[0];
                LoadInfoUser(user);
                LoadExistingGames();
                authModal.M_Modal.close(); // CIERRA EL MODAL
                isLogged();
            }
            else
            {
                // MANDA MENSAJE DE ERROR DE LOGIN
            }
        });
}
//#endregion

//#region REGISTER FORM
const registerUsername = document.getElementById("reg-username");
let registerUsernameHelperText = registerUsername.nextElementSibling;

const registerEmail = document.getElementById("reg-email");
let registerEmailHelperText = registerEmail.nextElementSibling;

const registerPassword = document.getElementById("reg-password");
let registerPasswordHelperText = registerPassword.nextElementSibling;

const registerRepeatedPassword = document.getElementById("reg-rpassword");
let registerButton = document.getElementById("register-button");

/*==========We add the events needed for login==========*/
registerUsername.addEventListener('input', () =>{
    CheckUsername();
    Validate();
});
registerEmail.addEventListener('input', () =>{
    CheckEmail();
    Validate();
});
registerPassword.addEventListener('input', () =>{
    CheckPasswords();
    Validate();
});
registerRepeatedPassword.addEventListener('input', () =>{
    CheckPasswords();
    Validate();
});
registerButton.addEventListener('click', () => {
    Register();
    Validate();
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
            if(data.error == false)
            {
                SwapSignUp();
            }
    });
}
/*========== Errors ==========*/
function CheckUsername(){

    let usernameRegex = /[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/;

    if(registerUsername.value.length == 0){
        isEmpty(registerUsername);
    }
    else if (registerUsername.value.length < 3)
    { 
        isNotValid(registerUsername);
        registerUsernameHelperText.setAttribute('data-error',`El nom no pot tenir menys de 3 caràcters`);
    } 
    else if (registerUsername.value.length > registerUsername.getAttribute('data-length')) 
    { 
        isNotValid(registerUsername);
        registerUsernameHelperText.setAttribute('data-error',`Has superat el maxim de caràcters!`);
    } 
    else if(usernameRegex.test(registerUsername.value))
    {
        isNotValid(registerUsername);
        registerUsernameHelperText.setAttribute('data-error',"Caràcters permesos: a-z, A-Z, 0-9, -, _");
    }
    else { 
        isValid(registerUsername);
        registerUsernameHelperText.setAttribute('data-error',"");
    }
}
function CheckEmail(){
    let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(registerEmail.value.length == 0)
    {
        isEmpty(registerEmail)
    }
    else if(!emailRegex.test(registerEmail.value))
    {
        isNotValid(registerEmail);
        registerEmailHelperText.setAttribute('data-error',`El format d'email introduït no és valid`);
    }
    else{
        isValid(registerEmail);
        registerEmailHelperText.setAttribute('data-error',"");
    }
}
function CheckPasswords(){
    if((registerPassword.value.length == 0) && (registerRepeatedPassword.value.length == 0))
    {
        isEmpty(registerPassword);
        isEmpty(registerRepeatedPassword);
    }
    else if(registerPassword.value !== registerRepeatedPassword.value){
        isNotValid(registerPassword);
        isNotValid(registerRepeatedPassword);
        registerPasswordHelperText.setAttribute('data-error',"Les contrasenyes no coincideixen");
    }
    else if(registerPassword.value === registerRepeatedPassword.value){
        isValid(registerPassword);
        isValid(registerRepeatedPassword);
    }
}
function Validate(){
    if(registerUsername.classList.contains('valid') && registerEmail.classList.contains('valid') && registerPassword.classList.contains('valid') && registerRepeatedPassword.classList.contains('valid'))
    {
        registerButton.disabled = false;
    }
    else if(!registerButton.disabled)
    {
        registerButton.disabled = true;
    }
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
        hideAll();
        landing_container.hidden = false;
        ResetUserData();
        isNotLogged();
    });

}
//#endregion

/*========== functions used on input validations ==========*/
function isValid(input){
    input.classList.add('valid'); 
    input.classList.remove('invalid');
}

function isNotValid(input){
    input.classList.add('invalid');
    input.classList.remove('valid'); 
}

function isEmpty(input){
    input.classList.remove('invalid');
    input.classList.remove('valid'); 
}


/*==========function called when you log-in ==========*/
function isLogged(){
    signup_button.style.display = "none";
    logOutButton.style.display = "inline";
    loginContainer.hidden = true;
    mainContainer.hidden = false;
    nav_games.hidden = false;
    nav_search.hidden = false;
    nav_mymovies.hidden = false;
    nav_leaderboard.hidden = false;
}
function isNotLogged(){
    signup_button.style.display = "inline";
    logOutButton.style.display = "none";
    loginContainer.hidden = false;
    nav_games.hidden = true;
    nav_search.hidden = true;
    nav_mymovies.hidden = true;
    nav_leaderboard.hidden = true;
}


