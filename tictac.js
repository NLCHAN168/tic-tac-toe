const gameBoard = () => {
  let board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  const place = (ind1, ind2, sign) => {
    if (board[ind1][ind2] != "x" && board[ind1][ind2] != "o") {
      board[ind1][ind2] = sign;
    }
    var tile = (ind1 + "-" + ind2).toString();
    const changeTile = document.getElementById(tile);
    changeTile.innerText = sign;
  };
  const printBoard = () => {
    console.table(board);
  };

  const arrayCopy = () => board.map((obj) => ({ ...obj }));

  return { arrayCopy, printBoard, place };
};

const Player = function (number, sign) {
  const getNumber = () => {
    return number;
  };
  const getSign = () => {
    return sign;
  };
  return { getNumber, getSign };
};

const Game = () => {
  let player1 = Player("1", "x");
  let player2 = Player("2", "O");
  let currentPlayer = player1;
  let game = gameBoard();
  let newBoard = game.arrayCopy();
  const display = () => {
    game.printBoard();
  };

  const move = (ind1, ind2, playerSymbol) => {
    game.place(ind1, ind2, playerSymbol);
    newBoard = game.arrayCopy();
    checkWin(playerSymbol, ind1);
    currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  };
  const checkWin = (playerSymbol, y) => {
    if (
      checkRow(playerSymbol, y) ||
      checkColumn(playerSymbol, y) ||
      checkDiag(playerSymbol) ||
      checkAntiDiag(playerSymbol)
    ) {
      const winBox = document.getElementById("win");
      winBox.innerText = playerSymbol + " Player Wins!";
    }
  };

  const checkRow = (playerSymbol, y) => {
    for (let col = 0, row = y; col < 3; col++) {
      if (playerSymbol != newBoard[row][col]) {
        return false;
      }
    }
    return true;
  };

  const checkColumn = (playerSymbol, y) => {
    for (let col = y, row = 0; row < 3; row++) {
      if (playerSymbol != newBoard[row][col]) {
        return false;
      }
    }
    return true;
  };

  const checkDiag = (playerSymbol) => {
    for (let i = 0; i < 3; i++) {
      if (playerSymbol != newBoard[i][i]) {
        return false;
      }
    }
    return true;
  };

  const checkAntiDiag = (playerSymbol) => {
    let i = 2;
    let j = 0;
    while (i > 0 && j < 3) {
      i--;
      j++;
      if (playerSymbol != newBoard[i][j]) {
        return false;
      }
    }
    return true;
  };

  const getPlayerSign = () => {
    return currentPlayer.getSign();
  };

  return { display, move, checkWin, getPlayerSign };
};

let boxes = document.getElementsByTagName("td");
for (let i = 0; i < boxes.length; i++) {
  let clickBox = boxes[i];
  clickBox.addEventListener("click", () => {
    // newGame.move(, , symbol);
    console.log("Move!");
  });
}
newGame = Game();
newGame.move(2, 0, newGame.getPlayerSign());
newGame.move(2, 1, newGame.getPlayerSign());
newGame.move(2, 2, newGame.getPlayerSign());
newGame.display();
