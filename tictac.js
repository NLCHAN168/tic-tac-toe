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
    checkWin(playerSymbol, ind1, ind2);
    currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  };
  const checkWin = (playerSymbol, ind1, ind2) => {
    if (
      checkRow(playerSymbol, ind1) ||
      checkColumn(playerSymbol, ind2) ||
      checkDiag(playerSymbol) ||
      checkAntiDiag(playerSymbol)
    ) {
      const winBox = document.getElementById("win");
      winBox.innerText = playerSymbol + " Player Wins!";
    }
  };

  const checkRow = (playerSymbol, row) => {
    for (let col = 0; col < 3; col++) {
      if (playerSymbol != newBoard[row][col]) {
        return false;
      }
    }
    const winBox = document.getElementById("win");
    // winBox.innerText = playerSymbol + " Player Wins by Row";
    return true;
  };

  const checkColumn = (playerSymbol, col) => {
    for (let row = 0; row < 3; row++) {
      if (playerSymbol != newBoard[row][col]) {
        return false;
      }
    }
    const winBox = document.getElementById("win");
    // winBox.innerText = playerSymbol + " Player Wins by Column";
    return true;
  };

  const checkDiag = (playerSymbol) => {
    for (let i = 0; i < 3; i++) {
      if (playerSymbol != newBoard[i][i]) {
        return false;
      }
    }
    const winBox = document.getElementById("win");
    // winBox.innerText = playerSymbol + " Player Wins by Diag";
    return true;
  };

  const checkAntiDiag = (playerSymbol) => {
    let win = false;
    let i = 2;
    let j = 0;
    while (i > 0 && j < 3) {
      if (playerSymbol != newBoard[i][j]) {
        win = false;
      }
      i--;
      j++;
    }
    const winBox = document.getElementById("win");
    // winBox.innerText = playerSymbol + " Player Wins by antidiag";
    return win;
  };

  const getPlayerSign = () => {
    return currentPlayer.getSign();
  };

  return { display, move, checkWin, getPlayerSign };
};

newGame = Game();

let boxes = document.getElementsByTagName("td");
console.log(boxes.length);
for (let i = 0; i < 3; i++) {
  let clickBox = boxes[i];
  clickBox.addEventListener("click", () => {
    newGame.move(0, i, newGame.getPlayerSign());
    newGame.checkWin(newGame.getPlayerSign(), 0, i);
  });
}
for (let i = 3; i < 6; i++) {
  let clickBox = boxes[i];
  clickBox.addEventListener("click", () => {
    newGame.move(1, i - 3, newGame.getPlayerSign());
    newGame.checkWin(newGame.getPlayerSign(), 1, i - 3);
  });
}

for (let i = 6; i < boxes.length; i++) {
  let clickBox = boxes[i];
  clickBox.addEventListener("click", () => {
    newGame.move(2, i - 6, newGame.getPlayerSign());
    newGame.checkWin(newGame.getPlayerSign(), 2, i - 6);
  });
}
