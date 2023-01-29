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
  const display = () => {
    game.printBoard();
  };
  const checkRow = (playerSymbol) => {
    for (let row = 0; row < 3; row++) {
      for (let column = 2; column >= 0; column--) {
        if (playerSymbol != game[row][column]) {
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
        if (playerSymbol != game[column][row]) {
          break;
        } else {
          console.log("Win!");
        }
      }
    }
  };

  const checkDiag = (playerSymbol) => {
    for (let i = 0; i < 3; i++) {
      if (playerSymbol != game[i][i]) {
        break;
      } else {
        console.log("Win!");
      }
    }
  };

  const checkAntiDiag = (playerSymbol) => {
    //some code
  };

  game.place(0, 1, player1.getSign());
  game.place(0, 2, player2.getSign());
  return { display, checkRow, checkColumn, checkDiag, checkAntiDiag };
};

let player1 = Player("1", "x");
let player2 = Player("2", "O");
newGame = Game();
newGame.display();
