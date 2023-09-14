// Déclaration des variables pour les joueurs
var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

// Déclaration des variables pour la fin de partie et le plateau de jeu
var gameOver = false;
var board;

// Nombre de rangées et de colonnes pour le plateau
var rows = 6;
var columns = 7;

// Tableau qui conserve la position de la dernière pièce jouée pour chaque colonne
var currColumns = [];

// Exécution de la fonction setGame() lorsque la page est chargée
window.onload = function() {
setGame();
}

// Fonction pour initialiser le jeu
function setGame() {
    board = []; // tableau vide pour représenter le plateau de jeu
    currColumns = [5, 5, 5, 5, 5, 5, 5]; // tableau pour suivre le nombre de pièces dans chaque colonne

    // Boucle pour créer le plateau de jeu
    for (let r = 0; r < rows; r++) { // boucle sur les rangées
        let row = []; // tableau pour représenter chaque rangée
        for (let c = 0; c < columns; c++) { // boucle sur les colonnes
            // JS
            row.push(' '); // ajoute une chaîne vide pour chaque case dans le tableau de la rangée
            // HTML
            let tile = document.createElement("div"); // crée une nouvelle div pour représenter chaque case sur le plateau de jeu
            tile.id = r.toString() + "-" + c.toString(); // donne un identifiant unique pour chaque case
            tile.classList.add("tile"); // ajoute une classe "tile" à chaque case
            tile.addEventListener("click", setPiece); // ajoute un écouteur d'événements "click" à chaque case
            document.getElementById("board").append(tile); // ajoute chaque case au plateau de jeu
        }
        board.push(row); // ajoute chaque rangée au tableau du plateau de jeu
    }
}

function setPiece() {
    if (gameOver) { // si la partie est terminée, sortir de la fonction
        return;
    }

    // obtenir les coordonnées de la case cliquée
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // déterminer à quelle rangée la colonne courante devrait être
    r = currColumns[c]; 

    if (r < 0) { // si la colonne est pleine, sortir de la fonction
        return;
    }

    board[r][c] = currPlayer; // mettre à jour le tableau JS
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) { // si c'est le tour du joueur rouge
        tile.classList.add("red-piece"); // ajouter la classe CSS pour la pièce rouge
        currPlayer = playerYellow; // passer le tour au joueur jaune
    }
    else { // sinon, c'est le tour du joueur jaune
        tile.classList.add("yellow-piece"); // ajouter la classe CSS pour la pièce jaune
        currPlayer = playerRed; // passer le tour au joueur rouge
    }

    r -= 1; // mettre à jour la hauteur de la rangée pour cette colonne
    currColumns[c] = r; // mettre à jour le tableau des hauteurs des colonnes

    checkWinner(); // vérifier s'il y a un gagnant
}
function checkWinner() {
    // Vérifie si un joueur a gagné en alignant 4 pièces de même couleur dans une rangée horizontale.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
        }
   }

   // Vérifie si un joueur a gagné rangée verticale.
   for (let c = 0; c < columns; c++) {
       for (let r = 0; r < rows - 3; r++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }

   // Vérifie si un joueur a gagné  dans une rangée diagonale inversée.
   for (let r = 0; r < rows - 3; r++) {
       for (let c = 0; c < columns - 3; c++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }

   // Vérifie si un joueur a gagné  dans une rangée diagonale.
   for (let r = 3; r < rows; r++) {
       for (let c = 0; c < columns - 3; c++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }
}


function setWinner(r, c) { // Cette fonction est appelée lorsqu'un joueur gagne, elle reçoit les coordonnées de la dernière pièce qui a été jouée et met à jour le texte 
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) { // si le joueur rouge gagne 
        winner.innerText = "Red Wins";             
    } else {
        winner.innerText = "Yellow Wins"; // si le joueur jaune gagne 
    }
    gameOver = true;
}
