let leaderboardSection = document.getElementById("leaderboard");

let loadLeaderboard = leaderboardSection.querySelector("button");
let table = leaderboardSection.querySelector("table");

LoadLeaderboard();

loadLeaderboard.addEventListener('click',() => {
    LoadLeaderboard();
});


function LoadLeaderboard()
{
    fetch(PATH + "php_files/leaderboard.php")
    .then(res => res.json())
    .then(data => 
        {
            body = table.querySelector("tbody");
            body.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                body.innerHTML += 
                `<tr>
                    <td>${i+1}</td>
                    <td><img class="round_img" src="img/defaultUserImage.png" width="60px" height="60px"/></td>
                    <td>${data[i]["username"]}</td>
                    <td>${data[i]["score"]}</td>
                </tr>
                `;
                
            }
    });
}

