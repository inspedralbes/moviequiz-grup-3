buttonNewGame = document.getElementById("new-game-button");

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {
        dismissible: false,
        opacity: 0.7
    });
});