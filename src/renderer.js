import Palette, { COLORS } from "./palete";
import Field from "./field";
import Kami2 from "./engine";
import Solver from "./solver";

const SIZE = 40;
const MARGIN = 1;

export default class Render {
  constructor(fieldCanvas, paletteCanvas) {
    this.fieldCanvas = fieldCanvas;
    this.paletteCanvas = paletteCanvas;
    this.onUserClickOnField = this.onUserClickOnField.bind(this);
    this.onChangeOptions = this.onChangeOptions.bind(this);
    this.field = null;
    this.game = null;
    this.solver = null;
    this.palette = null;
    this.field = null;
  }

  start(field) {
    this.field = field;
    this.game = new Kami2(this.field);
    this.solver = new Solver(this.field);
    this.palette = new Palette(this.paletteCanvas, SIZE, MARGIN);
    this.field = new Field(
      this.fieldCanvas,
      this.game.fieldWidth,
      this.game.fieldHeight,
      SIZE,
      MARGIN,
      this.onUserClickOnField
    );
    this.field.draw(this.game.field);
  }

  onUserClickOnField(coord) {
    this.game.doTurn(coord.x, coord.y, this.palette.selectedColorIndex);
    this.field.draw(this.game.field);

    this.solver.simplifyGraph(this.solver.fieldToGraph(this.game.field));
    if (
      this.game.isGameFinished() &&
      window.confirm("You Won!!! Would you like to play one more time?")
    ) {
      this.start(
        this.generateNewField(this.game.fieldHeight, this.game.fieldWidth)
      );
    }
  }

  onChangeOptions(e) {
    this.game.fillAll = !this.game.fillAll;
  }
  generateNewField(height, width) {
    var newField = [];

    for (var h = 0; h < height; h++) {
      newField[h] = [];
      for (var w = 0; w < width; w++) {
        newField[h][w] = Math.floor(Math.random() * COLORS.length);
      }
    }

    return newField;
  }
}
