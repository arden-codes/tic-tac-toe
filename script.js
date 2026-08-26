let boxes = document.querySelectorAll('.box');
let resetScoreBtn = document.getElementById('reset-score-btn');
let resetBtn = document.getElementById('reset-btn');

// Player
let playerX = true;

// Scores
let xScore = 0;
let oScore = 0;

let gameOver = false;

// Winning Patterns
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// ----------------------------
// Player Functions
// ----------------------------

function changeActivePlayer() {

    const playerXClass = document.querySelector('#playerX').classList;
    const playerOClass = document.querySelector('#playerO').classList;

    if (playerX) {
        playerXClass.add('active');
        playerOClass.remove('active')
    } else {
        playerOClass.add('active');
        playerXClass.remove('active');
    };
};

function changePlayersTurn() {
    if (playerX) {
        document.querySelector('#msg').innerText = "X's turn";
    } else {
        document.querySelector('#msg').innerText = "O's turn";
    };
}


// ----------------------------
// Game Functions
// ----------------------------
function resetGame() {
    playerX = true;
    gameOver = false;

    for (let box of boxes) {
        box.innerText = '';
        box.classList.remove('x', 'o', 'winning');
    };

    msg.innerText = "X's turn";

    document.querySelector('#playerX').classList.add('active');
    document.querySelector('#playerO').classList.remove('active');

    enableBoxes();
};

function resetScore() {
    xScore = 0;
    oScore = 0;
    
    document.getElementById("xScore").innerText = xScore;
    document.getElementById("oScore").innerText = oScore;
};

function enableBoxes() {
    for (let box of boxes) {
        box.disabled = false;
    }
};

function disableBoxes() {
    for (let box of boxes) {
        box.disabled = true;
    }
};

function updateScore(winner) {
    if (winner === "X") {
        xScore++;
        document.getElementById("xScore").innerText = xScore;
    } else {
        oScore++;
        document.getElementById("oScore").innerText = oScore;
    }
};

function showWinner(winner) {
    msg.innerText = `${winner} Wins!`;
    disableBoxes();
}

function checkWin() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        let A = boxes[a];
        let B = boxes[b];
        let C = boxes[c];

        if (
            A.innerText !== "" && 
            A.innerText === B.innerText && 
            B.innerText === C.innerText
        ) {
            showWinner(A.innerText);
            updateScore(A.innerText);

            A.classList.add('winning');
            B.classList.add('winning');
            C.classList.add('winning');

            gameOver = true;
            return
        };
    };

    const isBoardFull = [...boxes].every(box => box.innerText !== "");

    if (isBoardFull) {
        msg.innerText = "It's a draw.";
        gameOver = true;
    };

};

function handleClick(box) {
    if (playerX) {
        box.innerText = 'X';
        box.classList.add("x");
        playerX = false;
    } else {
        box.innerText = 'O';
        box.classList.add("o");
        playerX = true;
    };

    box.disabled = true;

    checkWin();

    if (gameOver) { return };

    changeActivePlayer();
    changePlayersTurn();
};




// ----------------------------
// Game
// ----------------------------

function game() {
    boxes.forEach((box) => {
        box.addEventListener('click', () => handleClick(box))
    });

    resetScoreBtn.addEventListener("click", () => {
        resetScore();
        resetGame();
    });

    resetBtn.addEventListener("click", resetGame);
}


// ----------------------------
// RUN
// ----------------------------

game()






