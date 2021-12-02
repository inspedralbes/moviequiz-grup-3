var result;
var search = document.getElementById('search');
const master_div = document.getElementById('master');

///BUSCAR PELICULA Y PINTAR//////
search.addEventListener("click", async function () {
    var film_name = document.getElementById('film').value;
    result = await fetch("https://www.omdbapi.com/?s=" + film_name + "&apikey=779df850");
    var data = await result.json();
    for (let i = 0; i < data.Search.length; i++) {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let img = document.createElement('img');
        h2.innerText = data.Search[i].Title;
        img.src = data.Search[i].Poster;
        div.append(h2, img);
        master_div.append(div);
    }
})