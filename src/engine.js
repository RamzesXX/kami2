export default class Kami2 {
  constructor(gameField) {
    this.newGame(gameField);
  }

  newGame(gameField) {
    this.field = gameField;
    this.fieldWidth = gameField[0].length;
    this.fieldHeight = gameField.length;
    this.gameFinished = null;
    this.fillAll = true;
  }

  doTurn(x, y, colorToFill) {
    let cellToProcess = [];
    const cellColor = this.field[y][x];

    if (colorToFill === cellColor) {
      return;
    }

    cellToProcess.push({ x, y });
    while (cellToProcess.length > 0) {
      let cell = cellToProcess.shift();
      if (this.field[cell.y][cell.x] !== cellColor) {
        continue;
      }

      this.field[cell.y][cell.x] = colorToFill;
      if (this.fillAll) {
        switch (cell.x % 4) {
          case 0:
            if (cell.x > 0) {
              cellToProcess.push({ x: cell.x - 1, y: cell.y });
            }
            cellToProcess.push({ x: cell.x + 1, y: cell.y });
            if (cell.y < this.fieldHeight - 1) {
              cellToProcess.push({ x: cell.x + 1, y: cell.y + 1 });
            }
            break;

          case 1:
            if (cell.y > 0) {
              cellToProcess.push({ x: cell.x - 1, y: cell.y - 1 });
            }
            cellToProcess.push({ x: cell.x - 1, y: cell.y });
            if (cell.x < this.fieldWidth - 1) {
              cellToProcess.push({ x: cell.x + 1, y: cell.y });
            }
            break;

          case 2:
            if (cell.y > 0) {
              cellToProcess.push({ x: cell.x + 1, y: cell.y - 1 });
            }
            cellToProcess.push({ x: cell.x - 1, y: cell.y });
            cellToProcess.push({ x: cell.x + 1, y: cell.y });
            break;
          case 3:
            cellToProcess.push({ x: cell.x - 1, y: cell.y });
            if (cell.x < this.fieldWidth - 1) {
              cellToProcess.push({ x: cell.x + 1, y: cell.y });
            }
            if (cell.y < this.fieldHeight - 1) {
              cellToProcess.push({ x: cell.x - 1, y: cell.y + 1 });
            }
            break;
        }
      }
    }
  }

  isGameFinished() {
    return (this.gameFinished =
      this.gameFinished || this.checkIfGameFinished());
  }

  checkIfGameFinished() {
    const colorToCheck = this.field[0][0];

    for (var h = 0; h < this.fieldHeight; h++) {
      for (var w = 0; w < this.fieldWidth; w++) {
        if (this.field[h][w] !== colorToCheck) {
          return false;
        }
      }
    }

    return true;
  }
}
