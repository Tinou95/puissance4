document.addEventListener("DOMContentLoaded", () => {
  const PLAYER_1 = 1;
  const PLAYER_2 = 2;
  
  let currentPlayer = PLAYER_1;
  let gameEnded = false;
  let board = [];
  
  const boardElement = document.getElementById('board');
  const resetButton = document.getElementById('resetButton');
  
  // Initialize the board
  function initializeBoard() {
    for (let row = 0; row < 6; row++) {
      board[row] = [];
      for (let col = 0; col < 7; col++) {
        board[row][col] = 0;
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', () => makeMove(col));
        boardElement.appendChild(cell);
      }
    }
  }
  
  // Make a move in the specified column
  function makeMove(col) {
    if (gameEnded) return;
    const row = getAvailableRow(col);
    if (row !== -1) {
      board[row][col] = currentPlayer;
      renderBoard();
      if (checkWin(row, col)) {
        announceWinner(currentPlayer);
        gameEnded = true;
        return;
      }
      if (checkTie()) {
        announceTie();
        gameEnded = true;
        return;
      }
      currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
      if (currentPlayer === PLAYER_2) {
        // AI Player's turn
        setTimeout(makeAIMove, 500);
      }
    }
  }
  
  // AI Player's move
  function makeAIMove() {
    const availableCols = [];
    for (let col = 0; col < 7; col++) {
      if (getAvailableRow(col) !== -1) {
        availableCols.push(col);
      }
    }
    if (availableCols.length > 0) {
      const randomCol = availableCols[Math.floor(Math.random() * availableCols.length)];
      makeMove(randomCol);
    }
  }
  
  // Get the first available row in a column
  function getAvailableRow(col) {
    for (let row = 5; row >= 0; row--) {
      if (board[row][col] === 0) {
        return row;
      }
    }
    return -1;
  }
  
  // Check if the current player has won
  function checkWin(row, col) {
    return (
      checkDirection(row, col, 1, 0) || // Horizontal
      checkDirection(row, col, 0, 1) || // Vertical
      checkDirection(row, col, 1, 1) || // Diagonal /
      checkDirection(row, col, 1, -1)   // Diagonal \
    );
  }
  
  // Check for four connected tokens in a specified direction
  function checkDirection(row, col, deltaRow, deltaCol) {
    const token = board[row][col];
    let count = 1;
    let r = row + deltaRow;
    let c = col + deltaCol;
  
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === token) {
      count++;
      r += deltaRow;
      c += deltaCol;
    }
  
    r = row - deltaRow;
    c = col - deltaCol;
  
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === token) {
      count++;
      r -= deltaRow;
      c -= deltaCol;
    }
  
    return count >= 4;
  }
  
  // Check if the game ended in a tie
  function checkTie() {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col] === 0) {
          return false;
        }
      }
    }
    return true;
  }
  
  // Render the current state of the board
  function renderBoard() {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = board[row][col] === 1 ? 'X' : board[row][col] === 2 ? 'O' : '';
      }
    }
  }
  
  // Announce the winner
  function announceWinner(player) {
    alert(`Joueur ${player} a gagné !`);
  }
  
  // Announce a tie
  function announceTie() {
    alert("Match nul !");
  }
  
  // Reset the game
  function resetGame() {
    currentPlayer = PLAYER_1;
    gameEnded = false;
    board = [];
    boardElement.innerHTML = '';
    initializeBoard();
  }
  
  // Initialize the game
  initializeBoard();

  // Reset the game when the user clicks the reset button
  const resetButtonn = document.querySelector('.reset');
  resetButtonn.addEventListener('click', resetGame);

  //jouer un son asset/minecraft.mp3 quand je pose un pion
  const sound = new Audio('asset/minecraft.mp3');
  const cell = document.querySelectorAll('.cell');
  cell.forEach(cell => {
    cell.addEventListener('click', () => {
      sound.play();
    });
  }
  );
 



});

  