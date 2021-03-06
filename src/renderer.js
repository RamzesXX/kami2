import Palette, { COLORS } from "./palete";
import Field, { GRAPH_MODE, GAME_MODE } from "./field";
import Kami2 from "./engine";
import Solver from "./solver";

const SIZE = 40;
const MARGIN = 2;

export default class Render {
  constructor(fieldCanvas, paletteCanvas) {
    this.fieldCanvas = fieldCanvas;
    this.paletteCanvas = paletteCanvas;
    this.onUserClickOnField = this.onUserClickOnField.bind(this);
    this.onChangeFillOptions = this.onChangeFillOptions.bind(this);
    this.onChangeViewOptions = this.onChangeViewOptions.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
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
    this.solver.graph = this.solver.fieldToGraph(this.game.field);
    this.solver.graph = this.solver.simplifyGraph(this.solver.graph);
    this.field.draw({ field: this.game.field, graph: this.solver.graph });
  }

  onUserClickOnField(coord) {
    this.game.doTurn(coord.x, coord.y, this.palette.selectedColorIndex);
    this.solver.graph = this.solver.fieldToGraph(this.game.field);
    this.solver.graph = this.solver.simplifyGraph(this.solver.graph);
    this.field.draw({ field: this.game.field, graph: this.solver.graph });
    if (this.game.isGameFinished()) {
    }
  }

  onChangeViewOptions(e) {
    this.field.setViewMode(e.target.checked ? GAME_MODE : GRAPH_MODE);
    this.field.draw({ field: this.game.field, graph: this.solver.graph });
  }

  onChangeFillOptions(e) {
    this.game.fillAll = e.target.checked;
  }

  onNewGame() {
    this.start(
      this.generateNewField(this.game.fieldHeight, this.game.fieldWidth)
    );
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
