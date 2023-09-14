//board
var blockSize = 25; // taille d'un bloc en pixels
var rows = 20; // nombre de rangées de blocs sur le plateau
var cols = 20; // nombre de colonnes de blocs sur le plateau
var board; // variable pour stocker le canvas du plateau
var context; // variable pour stocker le contexte de dessin du canvas
var score =0;

//tete du serpent
var snakeX = blockSize * 5; // position x de départ de la tête du serpent
var snakeY = blockSize * 5; // position y de départ de la tête du serpent

var velocityX = 0; // direction horizontale initiale du serpent
var velocityY = 0; // direction verticale initiale du serpent

var snakeBody = []; // tableau pour stocker les coordonnées des blocs de corps du serpent

// nourriture
var foodX; // position x de la nourriture
var foodY; // position y de la 

var gameOver = false; // variable pour suivre si le jeu est terminé ou non

// fonction appelée lorsque la fenêtre est chargée
window.onload = function() {
    board = document.getElementById("board"); // obtenir l'élément HTML du plateau
    board.height = rows * blockSize; // définir la hauteur du plateau en fonction du nombre de rangées et de la taille d'un bloc
    board.width = cols * blockSize; // définir la largeur du plateau en fonction du nombre de colonnes et de la taille d'un bloc
    context = board.getContext("2d"); // obtenir le contexte de dessin du plateau pour pouvoir dessiner sur celui-ci

    placeFood(); // placer la nourriture aléatoirement sur le plateau
    document.addEventListener("keyup", changeDirection); // écouter les événements clavier pour changer la direction du serpent
    setInterval(update, 1000/10); // appeler la fonction update() toutes les 1/10ème de seconde pour mettre à jour le plateau
}


// fonction pour mettre à jour le plateau
function update() {
    if (gameOver) { // si le jeu est terminé, ne pas faire de mises à jour supplémentaires
        return;
    }

    context.fillStyle="black"; // définir la couleur de fond du plateau à noir
    context.fillRect(0, 0, board.width, board.height); // dessiner un rectangle noir pour effacer le plateau précédent

    context.fillStyle="red"; // définir la couleur de la nourriture à rouge
    context.fillRect(foodX, foodY, blockSize, blockSize); // dessiner la nourriture sur le plateau

    if (snakeX == foodX && snakeY == foodY) { // si la tête du serpent est sur la même case que la nourriture
        snakeBody.push([foodX, foodY]); // ajouter une case au corps du serpent
        placeFood(); // placer de la nourriture aléatoirement sur le plateau
        score++; // incrémenter le score
        document.getElementById("score").innerHTML = score; // mettre à jour l'affichage du score dans la page HTML
    }

    // déplacer le corps du serpent vers l'avant
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    // mettre à jour la première case du corps du serpent pour qu'elle soit à la même position que la tête
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Dessiner la tête du serpent à la nouvelle position
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // Dessiner chaque partie du corps du serpent à sa position respective
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Vérifier si le serpent est sorti du plateau de jeu ou a touché son propre corps
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

// Cette fonction est appelée chaque fois que l'utilisateur appuie sur une touche de direction. Elle met à jour les variables "velocityX" et "velocityY" pour déterminer la direction dans laquelle le serpent doit se déplacer.
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
    }
    }
    
    // Cette fonction est appelée pour placer la nourriture à un nouvel endroit aléatoire sur la grille.
    // Elle utilise la fonction Math.random() pour générer un nombre aléatoire entre 0 et 1, multiplie le résultat par le nombre de colonnes et de lignes pour obtenir une position aléatoire sur la grille, puis arrondit cette valeur à l'entier inférieur le plus proche avant de la multiplier par la taille d'un bloc.
    function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    }

    function checkCollision() {
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
                alert("Game Over");
                break;
            }
        }
    }
    

    function update() {
        if (gameOver) { // si le jeu est terminé, ne pas faire de mises à jour supplémentaires
            return;
        }
    
        context.fillStyle="black"; // définir la couleur de fond du plateau à noir
        context.fillRect(0, 0, board.width, board.height); // dessiner un rectangle noir pour effacer le plateau précédent
    
        context.fillStyle="red"; // définir la couleur de la nourriture à rouge
        context.fillRect(foodX, foodY, blockSize, blockSize); // dessiner la nourriture sur le plateau
    
        if (snakeX == foodX && snakeY == foodY) { // si la tête du serpent est sur la même case que la nourriture
            snakeBody.push([foodX, foodY]); // ajouter une case au corps du serpent
            placeFood(); // placer de la nourriture aléatoirement sur le plateau
            score++; // incrémenter le score
            document.getElementById("score").innerHTML = score; // mettre à jour l'affichage du score dans la page HTML
        }
    
        // déplacer le corps du serpent vers l'avant
        for (let i = snakeBody.length-1; i > 0; i--) {
            snakeBody[i] = snakeBody[i-1];
        }
    
        // mettre à jour la première case du corps du serpent pour qu'elle soit à la même position que la tête
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }
    
        // Dessiner la tête du serpent à la nouvelle position
        context.fillStyle="lime";
        snakeX += velocityX * blockSize;
        snakeY += velocityY * blockSize;
        context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
        // Dessiner chaque partie du corps du serpent à sa position respective
        for (let i = 0; i < snakeBody.length; i++) {
            context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        }
    
        // Vérifier si le serpent est sorti du plateau de jeu ou a touché son propre corps
        if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
            gameOver = true;
            alert("Game Over!  Votre Serpent est mort!");
        }
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
                alert("Game Over! Votre Serpent est mort!");
            }
        }
    }
    
    

    // fonction pour réinitialiser le jeu
function resetGame() {
    // réinitialiser les variables du jeu
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    score = 0; // Remettre le score à zéro

    // effacer le plateau de jeu
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    // redessiner le serpent et la nourriture
    drawSnake();
    placeFood();
}

// fonction pour dessiner le serpent
function drawSnake() {
    context.fillStyle="lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}

// fonction pour placer de la nourriture aléatoirement sur le plateau
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}

// fonction appelée lorsque la fenêtre est chargée
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    // dessiner le serpent et la nourriture
    drawSnake();
    placeFood();

    // écouter les événements clavier
    document.addEventListener("keyup", changeDirection);

    // écouter les clics de bouton sur le bouton "Rejouer"
    document.getElementById("restartBtn").addEventListener("click", resetGame);

    // appeler la fonction update() toutes les 1/10ème de seconde pour mettre à jour le plateau
    setInterval(update, 1000/10);
}


