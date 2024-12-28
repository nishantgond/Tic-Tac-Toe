const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const restartButt = document.getElementById('restartButton');
let circleTurn;
const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let board = document.getElementById('board');
let winningMessageEle = document.getElementById('winningMessage');
let winningMessageTextElement = document.getElementById('winningMessageText');
const cellElements = document.querySelectorAll('[data-cell]');

startGame();

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, {once: true });
  });
  setBoardHoverClass();
  winningMessageEle.classList.remove('show');
}
function handleClick(e){
  const cell = e.target;
  const currClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currClass);
  if(checkWin(currClass)) {
    endGame(false);
  } else if(isDraw()){
      endGame(true);
  } else {
    changeTurn();
    setBoardHoverClass();
  }
}
function isDraw() {
  return [...cellElements].every(cell =>{
    return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS);
  })
}
function endGame(draw) {
  if(draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "0's" : "X's"} wins!`;
  }
  winningMessageEle.classList.add('show');
}
function placeMark(cell, currClass) {
  cell.classList.add(currClass);
}
function changeTurn() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if(circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
function checkWin(currClass) {
  return WINNING_COMBINATIONS.some(combination =>{
    return combination.every(idx =>{
      return cellElements[idx].classList.contains(currClass);
    })
  })
}
restartButt.addEventListener('click', startGame);
