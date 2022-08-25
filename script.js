'use strict';

const xClass = 'x';
const circleClass = 'circle';
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const messageWinner = document.getElementById('winner');
const restartBtn = document.getElementById('restart-button');

let gameOn;
let xTurn;
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startNewGame = function () {
    gameOn = true;
    xTurn = true;
    cells.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.classList.remove('blocked');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    message.classList.add('hidden-message');
}


const handleClick = function (e) {
    if (!gameOn) return;

    let cell = e.target;
    let currentClass = xTurn ? xClass : circleClass;
    placeSymbol(cell, currentClass);
    setBoardHoverClass();

    if (checkWin(currentClass)) {
        handleWin();
    }
    else if (isDraw()) {
        handleDraw();
    }
    else {
        swapTurns();
        setBoardHoverClass();
    }
}

const checkWin = function (currentClass) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const handleWin = function () {
    gameOn = false;
    let winner = xTurn ? 'X' : 'O';
    message.textContent = `${winner} wins!`;
    message.classList.remove('hidden-message');
    cells.forEach(cell => {
        cell.classList.add('blocked');
    });
}

const handleDraw = function () {
    gameOn = false;
    message.textContent = `Tie!`;
    message.classList.remove('hidden-message');
}

const isDraw = function () {
    return [...cells].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
    })
}

const setBoardHoverClass = function () {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);

    if (xTurn) {
        board.classList.add(xClass);
    }
    else {
        board.classList.add(circleClass);
    }
}

const swapTurns = function () {
    xTurn = !xTurn;
}

const placeSymbol = function (cell, currentClass) {
    cell.classList.add(currentClass);
}

restartBtn.addEventListener('click', startNewGame);

startNewGame(); s