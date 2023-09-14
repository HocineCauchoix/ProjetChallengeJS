let mistakesTxt = document.getElementById('mistakes');
let selectedDigit; 
let mistakes =0;

const fetchBoard = async () => {
    const res = await fetch('https://sugoku.onrender.com/board?difficulty=easy');
    const data = await res.json();
    const board = data.board;

    console.log(board);
}

const startGame = async() => {
   await fetchBoard();
}

startGame();