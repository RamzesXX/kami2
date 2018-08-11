function Kami2(gameField) {
  this.field = gameField;
  this.fieldWidth = gameField[0].length;
  this.fieldHeight = gameField.length;

  this.doTurn = function(x, y, colorToFill) {
    var cellToProcess = [];
    var cellColor = this.field[y][x];

    cellToProcess.push({ x, y });
    while (cellToProcess.length > 0) {
      var cell = cellToProcess.shift();
      if (this.field[cell.y][cell.x] !== cellColor) {
        continue;
      }

      this.field[cell.y][cell.x] = colorToFill;
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
  };

  this.isGameFinished = function() {
    var colorToCheck = this.field[0][0];

    for (var h = 0; h < this.fieldHeight; h++) {
      for (var w = 0; w < this.fieldWidth; w++) {
        if (this.field[h][w] !== colorToCheck) {
          return false;
        }
      }
    }

    return true;
  };
}
