const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');
const cells = document.getElementsByClassName('cell');
const cellArrays = Array.from(cells);
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];
let running = false;
let currentPlayer = 'Putin';

initializeGame();

function initializeGame() {
  cellArrays.forEach((cell) => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  running = 'true';
}
function cellClicked() {
  let cellIndex = this.getAttribute('cellIndex');
  if (options[cellIndex] != '' || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  const imgSrc = currentPlayer == 'Putin' ? 'putin.png' : 'seiyan.png';
  cell.innerHTML = `<img src=${imgSrc} class = 'img-size'>`;
}
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    let condition = winConditions[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == '' || cellB == '' || cellC == '') {
      continue;
    } else if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      /*cells[condition[0]].style.backgroundColor='rgb(80,80,80)';
        cells[condition[1]].style.backgroundColor='rgb(80,80,80)';
        cells[condition[2]].style.backgroundColor='rgb(80,80,80)';*/
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} won`;
    running = false;
  } else if (!options.includes('')) {
    statusText.textContent = 'draw';
    running = false;
  } else {
    changePlayer();
  }
}
function changePlayer() {
  currentPlayer = currentPlayer == 'Putin' ? 'Seiyan' : 'Putin';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function restartGame() {
  currentPlayer = 'Saiyan';
  options = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cellArrays.forEach((cell) => (cell.textContent = ''));
  running = true;
  location.reload();
}
