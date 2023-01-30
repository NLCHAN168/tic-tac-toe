const gameBoard = () => {
  let board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  const place = (ind1, ind2, sign) => {
    board[ind1][ind2] = sign;
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
  return { number, sign, getNumber, getSign };
};

const Game = () => {
  let game = gameBoard();
  let newBoard = game.arrayCopy();
  const display = () => {
    game.printBoard();
  };

  const move = (ind1, ind2, playerSymbol) => {
    game.place(ind1, ind2, playerSymbol);
    newBoard = game.arrayCopy();
  };

  const checkWin = (playerSymbol) => {
    console.log("[0][0]:" + newBoard[0][0]);
    checkRow(playerSymbol);
    checkColumn(playerSymbol);
    checkDiag(playerSymbol);
    checkAntiDiag(playerSymbol);
  };

  const checkRow = (playerSymbol) => {
    for (let row = 0; row < 3; row++) {
      for (let column = 2; column >= 0; column--) {
        if (playerSymbol != newBoard[row][column]) {
          break;
        } else {
          console.log("Win!");
        }
      }
    }
  };

  const checkColumn = (playerSymbol) => {
    for (let column = 0; column < 3; column++) {
      for (let row = 0; row < 3; row++) {
        if (playerSymbol != newBoard[column][row]) {
          break;
        } else {
          console.log("Win!");
        }
      }
    }
  };

  const checkDiag = (playerSymbol) => {
    for (let i = 0; i < 3; i++) {
      if (playerSymbol != newBoard[i][i]) {
        break;
      } else {
        console.log("Win!");
      }
    }
  };

  const checkAntiDiag = (playerSymbol) => {
    let i = 2;
    let j = 0;
    while (playerSymbol == newBoard[i][j] && i >= 0 && j < 3) {
      i--;
      j++;
      if (i === 0 && j === 2) {
        console.log("Win!");
      }
    }
  };

  return { display, move, checkWin };
};

let player1 = Player("1", "x");
let player2 = Player("2", "O");
newGame = Game();
newGame.move(0, 0, player1.getSign());
newGame.move(0, 1, player1.getSign());
newGame.move(0, 2, player1.getSign());
newGame.display();
newGame.checkWin(player1.getSign());
