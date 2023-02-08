const gameBoard = (() => {
  let board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  const forcePlace = (ind1, ind2, sign) => {
    board[ind1][ind2] = sign;
    var tile = (ind1 + "-" + ind2).toString();
    const changeTile = document.getElementById(tile);
    changeTile.innerText = sign;
  };

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

  const returnTile = (ind1, ind2) => {
    return board[ind1][ind2];
  };

  return { arrayCopy, printBoard, place, returnTile, forcePlace };
})();

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
  let turn = 0;
  let gameOver = false;
  let player1 = Player("1", "x");
  let player2 = Player("2", "O");
  let currentPlayer = player1;
  let newBoard = gameBoard.arrayCopy();
  const display = () => {
    gameBoard.printBoard();
  };

  const returnPiece = (ind1, ind2) => {
    return gameBoard.returnTile(ind1, ind2);
  };

  let boxes = document.getElementsByTagName("td");

  for (let i = 0; i < 3; i++) {
    boxes[i].addEventListener("click", () => {
      newGame.move(0, i, newGame.getPlayerSign());
      newGame.checkWin(newGame.getPlayerSign(), 0, i);
    });
  }

  for (let i = 3; i < 6; i++) {
    boxes[i].addEventListener("click", () => {
      newGame.move(1, i - 3, newGame.getPlayerSign());
      newGame.checkWin(newGame.getPlayerSign(), 1, i - 3);
    });
  }

  for (let i = 6; i < boxes.length; i++) {
    boxes[i].addEventListener("click", () => {
      newGame.move(2, i - 6, newGame.getPlayerSign());
      newGame.checkWin(newGame.getPlayerSign(), 2, i - 6);
    });
  }

  const resetGame = () => {
    turn = 0;
    const winBox = document.getElementById("win");
    winBox.innerText = "";
    gameOver = false;
    currentPlayer = player1;
    console.log("player sign: " + newGame.getPlayerSign());
    console.log("gameOver variable" + gameOver);

    for (let i = 0; i < 3; i++) {
      gameBoard.forcePlace(0, i, " ");
      newBoard = gameBoard.arrayCopy();
    }

    for (let i = 3; i < 6; i++) {
      gameBoard.forcePlace(1, i - 3, " ");
      newBoard = gameBoard.arrayCopy();
    }

    for (let i = 6; i < boxes.length; i++) {
      gameBoard.forcePlace(2, i - 6, " ");
      newBoard = gameBoard.arrayCopy();
    }
  };

  const tileReset = (ind1, ind2) => {
    gameBoard.forcePlace(ind1, ind2, " ");
    newBoard = gameBoard.arrayCopy();
  };

  const move = (ind1, ind2, playerSymbol) => {
    let piece = newGame.returnPiece(ind1, ind2);
    if (piece != "x" && piece != "O" && gameOver === false) {
      gameBoard.place(ind1, ind2, playerSymbol);
      newBoard = gameBoard.arrayCopy();
      turn++;
      currentPlayer === player1
        ? (currentPlayer = player2)
        : (currentPlayer = player1);
      checkWin(playerSymbol, ind1, ind2);
    } else {
      console.log("already occupied slot! " + newBoard[ind1][ind2]);
    }
  };

  const checkWin = (playerSymbol, ind1, ind2) => {
    if (
      checkRow(playerSymbol, ind1) ||
      checkColumn(playerSymbol, ind2) ||
      checkDiag(playerSymbol) ||
      checkAntiDiag(playerSymbol)
    ) {
      gameOver = true;
      console.log("Winner! gameOver variable " + gameOver);
      const winBox = document.getElementById("win");
      winBox.innerText = playerSymbol + " Player Wins!";
    } else if (turn == 9 && !gameOver) {
      gameOver = true;
      const winBox = document.getElementById("win");
      winBox.innerText = "Game is a tie!";
    }
  };

  const checkRow = (playerSymbol, row) => {
    for (let col = 0; col < 3; col++) {
      if (
        playerSymbol != newBoard[row][col] ||
        playerSymbol === " " ||
        playerSymbol === "_"
      ) {
        return false;
      }
    }
    return true;
  };

  const checkColumn = (playerSymbol, col) => {
    for (let row = 0; row < 3; row++) {
      if (
        playerSymbol != newBoard[row][col] ||
        playerSymbol === " " ||
        playerSymbol === "_"
      ) {
        return false;
      }
    }
    return true;
  };

  const checkDiag = (playerSymbol) => {
    for (let i = 0; i < 3; i++) {
      if (
        playerSymbol != newBoard[i][i] ||
        playerSymbol === " " ||
        playerSymbol === "_"
      ) {
        return false;
      }
    }
    return true;
  };

  const checkAntiDiag = (playerSymbol) => {
    for (let i = 2, j = 0; i > 0, j < 3; i--, j++) {
      if (
        playerSymbol != newBoard[i][j] ||
        playerSymbol === " " ||
        playerSymbol === "_"
      ) {
        return false;
      }
    }
    return true;
  };

  const getPlayerSign = () => {
    return currentPlayer.getSign();
  };

  return {
    display,
    move,
    checkWin,
    getPlayerSign,
    resetGame,
    returnPiece,
    tileReset,
  };
};

newGame = Game();
let buttonContainer = document.getElementById("buttons");
let button = document.createElement("button");
button.innerText = "Reset";
button.addEventListener("click", () => {
  newGame.resetGame();
});
buttonContainer.appendChild(button);
