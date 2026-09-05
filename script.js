// -------Game Variables -------
let boxes = document.querySelectorAll('.box');

// ------- Button Variables -------
let computerModeBtn = document.querySelector('#computer-mode-btn');
let twoPlayersModeBtn = document.querySelector('#two-player-mode-btn');

let chooseXBtn = document.querySelector('#choose-x');
let chooseOBtn = document.querySelector('#choose-o');
let startBtn = document.querySelector('#start-btn');
let changeSettingsBtn = document.querySelector('#change-settings-btn');
let newGameBtn = document.querySelector('#new-game-btn');
let resetScoreBtn = document.querySelector('#reset-score-btn');

// ------- Other Variables -------
let symbolSetting = document.querySelector('#symbol-setting');
let msg = document.querySelector('#msg');

// -------Global Variabled -------
let gameOver = false;

let gameMode = 'computer'; // or twoPlayers

let currentPlayer = 'user'; //or computer, // playerX or playerO

let currentSymbol = 'X';

let playerSymbol = 'X';
let computerSymbol = 'O';

let xScore = 0;
let oScore = 0;

let computerTimer;
const computerThinkingTime = 500;

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


//-----------------------------
// Button Functions
//-----------------------------
function selectComputerMode() {
    computerModeBtn.classList.add('active');
    twoPlayersModeBtn.classList.remove('active');

    gameMode = 'computer';
    chooseX();

    symbolSetting.hidden = false;
};

function selectTwoPlayersMode() {
    twoPlayersModeBtn.classList.add('active');
    computerModeBtn.classList.remove('active');

    gameMode = 'twoPlayers';
    currentPlayer = 'playerX';

    document.querySelector('#x-player-name').innerText = 'Player 1';
    document.querySelector('#o-player-name').innerText = 'Player 2';

    symbolSetting.hidden = true;
};

function chooseX() {
    chooseXBtn.classList.add('active');
    chooseOBtn.classList.remove('active')

    currentPlayer = 'user';
    playerSymbol = 'X';
    computerSymbol = 'O';

    document.querySelector('#x-player-name').innerText = 'You';
    document.querySelector('#o-player-name').innerText = 'Computer';
};

function chooseO() {
    chooseOBtn.classList.add('active');
    chooseXBtn.classList.remove('active')

    currentPlayer = 'computer';
    playerSymbol = 'O';
    computerSymbol = 'X';

    document.querySelector('#x-player-name').innerText = 'Computer';
    document.querySelector('#o-player-name').innerText = 'You';
};

function changeSettings() {
    clearTimeout(computerTimer);
    document.querySelector('#setup-screen').hidden = false;
    document.querySelector('#game-screen').hidden = true;

    fullReset();
}

function fullReset() {
    resetScore();
    resetBoard();
};

function resetScore() {
    clearTimeout(computerTimer);
    xScore = 0;
    oScore = 0;

    document.getElementById("xScore").innerText = xScore;
    document.getElementById("oScore").innerText = oScore;
};

function resetBoard() {
    clearTimeout(computerTimer);
    if (gameMode === 'computer') {
        currentPlayer = playerSymbol === 'X' ? 'user' : 'computer';
    } else {
        currentPlayer = 'playerX';
    };

    gameOver = false;

    for (let box of boxes) {
        box.innerText = '';
        box.classList.remove('x', 'o', 'winning');
    };

    currentSymbol = 'X';
    msg.innerText = "X's turn";

    document.querySelector('#playerX').classList.add('active');
    document.querySelector('#playerO').classList.remove('active');

    enableBoxes();
};


//-----------------------------
// Game Functions
//-----------------------------
function startGame() {
    currentSymbol = 'X';

    document.querySelector('#setup-screen').hidden = true;
    document.querySelector('#game-screen').hidden = false;

    startTurn();
}

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
            msg.innerText = `${A.innerText} Wins!`;
            disableBoxes();
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

function markBox(box) {
    box.innerText = `${currentSymbol}`;
    box.classList.add(`${currentSymbol.toLowerCase()}`);

    box.disabled = true;
};

function changePlayersTurn() {
    if (gameMode === 'computer') {
        currentPlayer = currentPlayer === 'computer' ? 'user' : 'computer';
    } else {
        currentPlayer = currentPlayer === 'playerX' ? 'playerO' : 'playerX';
    };

    let playerXClass = document.querySelector('#playerX').classList;
    let playerOClass = document.querySelector('#playerO').classList;

    if (currentSymbol === 'X') {
        playerXClass.remove('active');
        playerOClass.add('active');

        msg.innerText = "O's turn";
        currentSymbol = 'O';

    } else {
        playerXClass.add('active');
        playerOClass.remove('active');

        msg.innerText = "X's turn";
        currentSymbol = 'X';
    }
};
// --------------------------------------
function startTurn() {
    if (currentPlayer === 'computer') {
        computerMove();
    };
};

function afterMove() {
    checkWin();

    if (gameOver) { return };

    changePlayersTurn()

    if (currentPlayer === 'computer') {
        computerTimer = setTimeout(() => startTurn(), computerThinkingTime);
    }
};

//-----------------------------
// Handle Click 
//-----------------------------
function handleClick(box) {
    markBox(box);

    checkWin();

    if (gameOver) { return };

    changePlayersTurn();
};


// ------------- Computer Mode Functions ------------- 
function winningMove() {
    for (let pattern of winPatterns) {

        let [a, b, c] = pattern;

        let boxA = boxes[a];
        let boxB = boxes[b];
        let boxC = boxes[c];

        let A = boxA.innerText;
        let B = boxB.innerText;
        let C = boxC.innerText;

        if (
            (A === '' && B === '') ||
            (A === '' && C === '') ||
            (B === '' && C === '')
        ) {
            continue;
        }

        if (A === '' && B === computerSymbol && C === computerSymbol) {
            return boxA;

        } else if (B === '' && A === computerSymbol && C === computerSymbol) {
            return boxB;

        } else if (C === '' && A === computerSymbol && B === computerSymbol) {
            return boxC;

        } else {
            continue;
        };
    };

    return null;
}


function blockOpponent() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        let boxA = boxes[a];
        let boxB = boxes[b];
        let boxC = boxes[c];

        let A = boxA.innerText;
        let B = boxB.innerText;
        let C = boxC.innerText;

        if (
            (A === '' && B === '') ||
            (A === '' && C === '') ||
            (B === '' && C === '')
        ) {
            continue;
        }

        if (A === '' && B === playerSymbol && C === playerSymbol) {
            return boxA;

        } else if (B === '' && A === playerSymbol && C === playerSymbol) {
            return boxB;

        } else if (C === '' && A === playerSymbol && B === playerSymbol) {
            return boxC;

        } else {
            continue;
        };
    };

    return null;
}


function computerMove() {
    let emptyBoxes = [];

    for (let box of boxes) {
        if (box.innerText === '') {
            emptyBoxes.push(box);
        }
    }

    let targetBox = null;

    targetBox = winningMove();

    if (targetBox === null) {
        targetBox = blockOpponent();
    }

    if (targetBox === null) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        targetBox = emptyBoxes[randomIndex];
    }

    markBox(targetBox)
    afterMove();
};

// ------------- Main Function ------------- 
function main() {
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            if (gameMode === 'twoPlayers') {
                handleClick(box)

            } else if (gameMode === 'computer' && currentPlayer === 'user') {
                markBox(box);

                afterMove();
            } else { return };
        });
    });
};

// ------------- Calling ------------- 
computerModeBtn.addEventListener('click', selectComputerMode);
twoPlayersModeBtn.addEventListener('click', selectTwoPlayersMode);
chooseXBtn.addEventListener('click', chooseX);
chooseOBtn.addEventListener('click', chooseO);
startBtn.addEventListener('click', startGame);

newGameBtn.addEventListener('click', () => {
    resetBoard();
    startTurn();
});

resetScoreBtn.addEventListener('click', () => {
    fullReset();
    startTurn();
});

changeSettingsBtn.addEventListener('click', changeSettings);

selectComputerMode();
main();
