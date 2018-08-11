import Palette from "./palete";
import Field from "./field";
import Kami2 from "./engine";

const SIZE = 40;
const MARGIN = 1;

export default class Render {
  constructor(fieldCanvas, paletteCanvas) {
    this.fieldCanvas = fieldCanvas;
    this.paletteCanvas = paletteCanvas;
    this.onUserClickOnField = this.onUserClickOnField.bind(this);
    this.field = null;
    this.game = null;
    this.palette = null;
    this.field = null;
  }

  start(field) {
    this.field = field;
    this.game = new Kami2(this.field);
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
    if (this.game.isGameFinished()) {
      alert("WON");
    }
  }
}
