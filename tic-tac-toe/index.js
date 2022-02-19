const gameArea = document.querySelector('.game-area');
const clickSound = document.querySelector('.click-sound');
const winSound = document.querySelector('.win-sound');
const drawSound = document.querySelector('.draw-sound');
const restartSound = document.querySelector('.restart-sound');
const cells = document.querySelectorAll('.cell');
const gameResultWrapper = document.querySelector('.game-result-wrapper');
const gameResultOverlay = document.querySelector('.game-result-overlay');
const gameResultInfo = document.querySelector('.game-result-info');
const playAgainButton = document.querySelector('.play-again');
const restartButton = document.querySelector('.restart-game');
const githubLink = document.querySelector('.github-link');
const whosTurn = document.querySelector('.x-or-o');
const volumeButton = document.querySelector('.volume');
const scoreTableBody = document.querySelector('.table-body');
let numberOfMoves = 0;
const winningOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let result = '';
let winnerName = '';
let gameWinner = {};
let scoreArr = [];

cells.forEach((elem) => {
    elem.addEventListener('click', event => {
        numberOfMoves % 2 === 0 ? event.target.classList.add('cross') : event.target.classList.add('circle');
        numberOfMoves % 2 === 0 ? whosTurn.innerHTML = 'O' : whosTurn.innerHTML = 'X';
        clickSound.play();
        numberOfMoves++;
        //console.log(numberOfMoves);
        //console.log(result);
        checkIfWin();
        if (numberOfMoves === 9 && result == '') {
            whosTurn.innerHTML = '-';
            announceDraw(numberOfMoves);
            /* numberOfMoves = 0; */
        }
    })
})

function checkIfWin() {
    for (let i = 0; i < winningOptions.length; i++) {
        if (cells[winningOptions[i][0]].classList.contains('cross') == true && cells[winningOptions[i][1]].classList.contains('cross') == true && cells[winningOptions[i][2]].classList.contains('cross') == true) {
            //console.log('X win');
            //console.log(numberOfMoves);
            result = 'X';
            whosTurn.innerHTML = '-';
            announceWinner(result, numberOfMoves);
            /* numberOfMoves = 0;
            result = ''; */
        } else if (cells[winningOptions[i][0]].classList.contains('circle') == true && cells[winningOptions[i][1]].classList.contains('circle') == true && cells[winningOptions[i][2]].classList.contains('circle') == true) {
            //console.log('O win');
            //console.log(numberOfMoves);
            result = 'O';
            whosTurn.innerHTML = '-';
            announceWinner(result, numberOfMoves);
            /* numberOfMoves = 0;
            result = ''; */
        } 
    }
}

function announceWinner(winner, moves) {
    const gameOver = document.createElement('p');
    gameOver.classList.add('game-over');
    gameOver.textContent = 'Game Over';
    gameResultInfo.append(gameOver);
    
    const winnerInfo = document.createElement('div');
    winnerInfo.classList.add('winner-info');
    winnerInfo.textContent = `The Winner is "${winner}" !`;
    gameResultInfo.append(winnerInfo);

    const winnerNameDiv = document.createElement('div');
    winnerNameDiv.classList.add('winner-name-block');
    gameResultInfo.append(winnerNameDiv);

    const winnerNameBlock = document.querySelector('.winner-name-block');
    const winnerNameText = document.createElement('input');
    winnerNameText.classList.add('winner-name-field');
    winnerNameText.setAttribute('type', 'text');
    winnerNameText.setAttribute('placeholder', `Enter winner's name`);
    winnerNameText.setAttribute('maxlength', '12');
    winnerNameBlock.append(winnerNameText);

    const movesNumber = document.createElement('div');
    movesNumber.classList.add('moves-number');
    movesNumber.textContent = `Moves total: ${moves}`;
    gameResultInfo.append(movesNumber);

    winSound.play();
    gameResultWrapper.style.display = 'block';
    githubLink.style.pointerEvents = 'none';
}

function announceDraw(moves) {
    const gameOver = document.createElement('p');
    gameOver.classList.add('game-over');
    gameOver.textContent = 'Game Over';
    gameResultInfo.append(gameOver);
    
    const winnerInfo = document.createElement('div');
    winnerInfo.classList.add('winner-info');
    winnerInfo.textContent = `Game ended in a draw!`;
    gameResultInfo.append(winnerInfo);

    const movesNumber = document.createElement('div');
    movesNumber.classList.add('moves-number');
    movesNumber.textContent = `Moves total: ${moves}`;
    gameResultInfo.append(movesNumber);

    drawSound.play();
    gameResultWrapper.style.display = 'block';
    githubLink.style.pointerEvents = 'none';
}

function restartGame() {
    restartSound.play();
    gameArea.style.pointerEvents = 'auto';
    whosTurn.innerHTML = 'X';
    cells.forEach((elem) => {
        if (elem.classList.contains('cross') == true) {
            elem.classList.remove('cross');
        } else if (elem.classList.contains('circle') == true) {
            elem.classList.remove('circle');
        }
    });
    numberOfMoves = 0;
}

function getGameResult() {
    const winnerInfoAnnounce = document.querySelector('.winner-info');
    const winnerNameField = document.querySelector('.winner-name-field');

    if (winnerInfoAnnounce.innerHTML === 'Game ended in a draw!') {
        gameWinner = {
            winner: 'Draw game! No winner',
            moves: `${numberOfMoves}`
        };
    } else if (winnerNameField.value === '') {
        gameWinner = {
            winner: `No name - "${result}"`,
            moves: `${numberOfMoves}`
        };
    } else {
        let winnerValue = (winnerNameField.value).charAt(0).toUpperCase() + (winnerNameField.value).slice(1);
        gameWinner = {
            winner: `${winnerValue} - "${result}"`,
            moves: `${numberOfMoves}`
        };
    }

    if (scoreArr.length < 10) {
        scoreArr.push(gameWinner);
    } else {
        scoreArr.shift();
        scoreArr.push(gameWinner);
    }
    
    console.log(gameWinner);
    console.log(scoreArr);
}

function addToScore() {
    if (scoreTableBody.rows.length < 10) {
        let newRow = scoreTableBody.insertRow(-1);
        let newCell1 = newRow.insertCell(0);
        newCell1.textContent = `${gameWinner['winner']}`;
        let newCell2 = newRow.insertCell(1);
        newCell2.textContent = `${gameWinner['moves']}`;
    } else {
        scoreTableBody.deleteRow(0);
        let newRow = scoreTableBody.insertRow(-1);
        let newCell1 = newRow.insertCell(0);
        newCell1.textContent = `${gameWinner['winner']}`;
        let newCell2 = newRow.insertCell(1);
        newCell2.textContent = `${gameWinner['moves']}`;
    }
}

function closeWrapper() {
    getGameResult();
    addToScore();
    
    numberOfMoves = 0;
    result = '';

    gameArea.style.pointerEvents = 'none';
    gameResultInfo.innerHTML = '';
    gameResultWrapper.style.display = 'none';
    githubLink.style.pointerEvents = 'auto';
}

function playAgain() {
    getGameResult();
    addToScore();

    numberOfMoves = 0;
    result = '';

    restartSound.play();
    whosTurn.innerHTML = 'X';
    cells.forEach((elem) => {
        if (elem.classList.contains('cross') == true) {
            elem.classList.remove('cross');
        } else if (elem.classList.contains('circle') == true) {
            elem.classList.remove('circle');
        }
    });
    gameResultInfo.innerHTML = '';
    gameResultWrapper.style.display = 'none';
    githubLink.style.pointerEvents = 'auto';
}

restartButton.addEventListener('click', restartGame);
gameResultOverlay.addEventListener('click', closeWrapper);
playAgainButton.addEventListener('click', playAgain);

function muteAudio() {
    const audio = [clickSound, winSound, drawSound, restartSound];
    audio.forEach((elem) => {
        elem.muted = !elem.muted;
        if (elem.muted) {
          volumeButton.classList.add('muted');
        } else {
          volumeButton.classList.remove('muted');
        };
    })
  };
  
  volumeButton.addEventListener('click', muteAudio);