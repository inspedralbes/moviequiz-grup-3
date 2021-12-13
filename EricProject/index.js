
window.onload = ()=>{
LoadLogin();
}
function LoadLogin(){
  fetch("./login.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("main").innerHTML = data;
  });
}
