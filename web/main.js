var result;
var button_add;
var search = document.getElementById('search');
const master_div = document.getElementById('master');

///BUSCAR PELICULA Y PINTAR//////

async function search_print(){
    var film_name = document.getElementById('film').value;
    result = await fetch("https://www.omdbapi.com/?s=" + film_name + "&apikey=779df850");
    var data = await result.json();


    for (let i = 0; i < data.Search.length; i++) {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let h3 = document.createElement('h3');
        let img = document.createElement('img');
        let btn = document.createElement('BUTTON');
        
        div.id = data.Search[i].imdbID;
        h2.innerText = data.Search[i].Title;
        img.src = data.Search[i].Poster;
        btn.innerText = "Afegir pelicula";
        btn.id = "btn_" + data.Search[i].imdbID;
        h3.innerText = data.Search[i].Year;
        div.append(h2,h3,img,btn);
        master_div.append(div);


        btn.addEventListener("click",function(){
        generateJsonElement(this.parentElement);
        });
    }
}

search.addEventListener("click", async function () {
    search_print();
} )

function generateJsonElement(parentElement){
    let myObject = {
        id : parentElement.id,
        title : parentElement.querySelector("h2").innerText,
        year : parentElement.querySelector("h3").innerText,
        imgpath : parentElement.querySelector("img").src
    }
    JSON.stringify(myObject);
    console.log(JSON.stringify(myObject));
}