/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];


/*---------------------------- Variables (state) ----------------------------*/
const board = Array(9).fill('')
let turn = 'X'
let winner = false
let tie = false


/*------------------------ Cached Element References ------------------------*/
const squareEls = [
    document.getElementById('0'),
    document.getElementById('1'),
    document.getElementById('2'),
    document.getElementById('3'),
    document.getElementById('4'),
    document.getElementById('5'),
    document.getElementById('6'),
    document.getElementById('7'),
    document.getElementById('8'),
    
]
console.log(squareEls);

const messageEl = document.getElementById('message');
console.log(messageEl) 

const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/
function init () {
console.log("App Fully Loaded!")
 const board = Array(9).fill['']
 turn = 'X'
 winner = false
 tie = false

 render()
}


function render() {
    console.log('Current board state:', board);
    console.log('Current turn:', turn);
    console.log('Winner:', winner ? 'Yes' : 'No');
    console.log('Tie:', tie ? 'Yes' : 'No');
}

function render() {
updateBoard()
updateMessage()
}
function updateBoard() {
    board.forEach((value, index) => {
        const square = squareEls[index];
        square.textContent = value; 
})
}
function updateMessage() {
    const messageElement = document.getElementById('message'); 
    if (winner) {
        messageElement.textContent = `Congratulations, Player ${turn} wins!`;
    } else if (tie) {
        messageElement.textContent = 'The game is a tie!';
    } else {
        messageElement.textContent = `Player ${turn}'s turn`;
    }
}

function checkForWinner() {
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;

        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
        }
        console.log('Winner:', winner);
    
    return winner;
    });
}

function checkForTie() {
    if (!winner && board.every(square => square !== '')) {
        tie = true;
    }
}

function handleClick(event) {
    const clickedSquare = event.target; 

    if (!squareEls.includes(clickedSquare)) {
        return;
    }
    const squareId = clickedSquare.id;
    const index = squareEls.indexOf(clickedSquare); 
    if (squareId < 0 || squareId >= board.length) {
        return
    }
    if (board[index] !== '' || winner || tie) {
        return;
    }
    board[index] = turn;

    placePiece(squareId);
    checkForWinner();
    checkForTie();


    turn = turn === 'X' ? 'O' : 'X';

    render();
}
function placePiece(index) {
    board[index] = turn; 
    console.log(board);
}
function switchPlayerTurn() {
    if (winner) {
        return;
    }
    turn = turn === 'X' ? 'O' : 'X';
    render()
}
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('DOMContentLoaded', init)
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
    resetBtnEl.addEventListener('click', init);
})

