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
  let player1 = Player("1", "x");
  let player2 = Player("2", "O");
  const display = () => {
    game.printBoard();
  };
  const checkWin = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 2; j >= 0; j--) {}
    }
  };
  game.place(0, 1, player1.getSign());
  game.place(0, 2, player2.getSign());
  return { display };
};

newGame = Game();
newGame.display();
