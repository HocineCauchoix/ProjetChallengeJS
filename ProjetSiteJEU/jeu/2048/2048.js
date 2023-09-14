// Déclaration des variables globales pour le jeu, le score et les dimensions de la grille.
var board;
var score = 0;
var rows = 4;
var columns = 4;

// Cette fonction est appelée lorsque la page est chargée, elle initialise le jeu.
window.onload = function() {
    setGame();
}

// Initialise le tableau de jeu en créant une grille vide 4x4 et en créant des éléments div pour chaque cellule de la grille.
function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // Chaque cellule de la grille est identifiée par un ID unique basé sur sa position (ex: "0-0" pour la première cellule).
            let num = board[r][c];
            updateTile(tile, num); // La fonction updateTile est appelée pour mettre à jour l'apparence de chaque cellule.
            document.getElementById("board").append(tile); // Ajoute la cellule à la grille.
        }
    }
    //setTwo est appelée deux fois pour ajouter deux cellules initiales avec des valeurs de 2 au tableau.
    setTwo();
    setTwo();
}

// Cette fonction met à jour l'apparence d'une cellule avec un numéro donné. Si le numéro est supérieur à 0, le texte de la cellule est mis à jour avec le numéro et une classe CSS est ajoutée pour définir la couleur.
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // Efface les classes précédentes.
    tile.classList.add("tile"); // Ajoute la classe de base "tile".
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString()); // Ajoute une classe CSS basée sur le numéro pour définir la couleur de fond.
        } else {
            tile.classList.add("x8192");
        }                
    }
}

// Cette fonction écoute les touches fléchées gauche, droite, haut et bas et appelle la fonction de déplacement appropriée. 
document.addEventListener('keyup', (e) => { 
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo(); // setTwo est appelée pour ajouter une nouvelle cellule avec une valeur de 2 et le score est mis à jour.
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score; // Met à jour le score affiché à l'utilisateur.
})

// Cette fonction retourne un tableau avec tous les éléments non nuls du tableau d'entrée.
function filterZero(row){
    return row.filter(num => num != 0);
}

// Cette fonction déplace une rangée vers la gauche

function slide(row) {
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2]  filterZero(row) prend une ligne du tableau (un tableau de nombres) en entrée et renvoie un nouveau tableau avec tous les nombres différents de zéro
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}

function slideLeft() { // fait glisser du coté gaucher
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {// fait glisser du coté droit
    for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() { // fait glisser en haut
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() { // fait glisser en bas
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = ligne[0];
        // board[1][c] = ligne[1];
        // board[2][c] = ligne[2];
        // board[3][c] = ligne[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //aau moins un zéro au tableau
                return true;
            }
        }
    }
    return false;
}

function isGameOver() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Vérifie si la cellule est vide.
            if (board[r][c] == 0) {
                return false; // Le jeu n'est pas terminé car il reste des cellules vides.
            }
            // Vérifie si la cellule peut être combinée avec une cellule adjacente.
            if (r < rows - 1 && board[r][c] == board[r+1][c]) {
                return false; // Le jeu n'est pas terminé car il y a encore des mouvements possibles.
            }
            if (c < columns - 1 && board[r][c] == board[r][c+1]) {
                return false; // Le jeu n'est pas terminé car il y a encore des mouvements possibles.
            }
        }
    }
    return true; // Toutes les cellules sont remplies et il n'y a pas de mouvements possibles, le jeu est terminé.
}


document.addEventListener('keyup', (e) => { 
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo(); // setTwo est appelée pour ajouter une nouvelle cellule avec une valeur de 2 et le score est mis à jour.
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score; // Met à jour le score affiché à l'utilisateur.
    
    if (isGameOver()) {
        alert("Game over!  Recharger la page pour recommencer"); // Affiche une notification "game over" si le jeu est terminé.
    }
})


function restartGame() {
    // Réinitialise le score à zéro.
    score = 0;
    document.getElementById("score").innerText = score;

    // Réinitialise le tableau de jeu en créant une nouvelle grille vide 4x4 et en ajoutant des éléments div pour chaque cellule.
    board = [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    // Ajoute deux nouvelles cellules avec une valeur de 2.
    setTwo();
    setTwo();
}
window.onload = function() {
    setGame();
}
// Ajoute un événement de clic au bouton restartBtn pour appeler la fonction restartGame.
let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restartGame);

var refresh = window.getElementById('refresh');
refresh.addEventListener('click', location.reload(), false);