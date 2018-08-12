import { COLORS, DEFAULT_COLOR } from "./palete";

export const GRAPH_MODE = "graph-mode";
export const GAME_MODE = "game-mode";

export default class Field {
  constructor(
    fieldCanvas,
    fieldWidth,
    fieldHeight,
    size,
    margin,
    onFieldClickCallback
  ) {
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.size = size;
    this.margin = margin;
    this.canvas = fieldCanvas;
    this.fullSize = 2 * (size + margin);
    this.canvas.width = Math.floor(fieldWidth / 2) * this.fullSize;
    this.canvas.height = fieldHeight * this.fullSize - size - 1;
    this.canvas.onclick = this.onClick.bind(this);
    this.context = fieldCanvas.getContext("2d");
    this.onFieldClickCallback = onFieldClickCallback;
    this.draw = this.draw.bind(this);
    this.setViewMode = this.setViewMode.bind(this);
    this.init();
  }

  init() {
    this.viewMode = GAME_MODE;
  }

  setViewMode(viewMode) {
    this.viewMode = viewMode;
  }

  onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const hitPos = {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    };
    const fieldCoord = this.convertCoordFromCanvasToField(hitPos);

    this.onFieldClickCallback(fieldCoord);
  }

  convertCoordFromCanvasToField(canvasCoord) {
    const rectLocalX = canvasCoord.x % this.fullSize;
    const rectLocalY = canvasCoord.y % (this.size + this.margin);
    let x = Math.floor(canvasCoord.x / this.fullSize);
    let y = Math.floor(canvasCoord.y / (this.size + this.margin));
    const rectType = 2 * (x % 2) + (y % 2);
    //we have 4 types our rectangles within odd/even row within odd/even columnn

    x <<= 1;
    y >>= 1;
    switch (rectType) {
      case 0:
        if (rectLocalY < rectLocalX / 2) {
          x++;
        }
        break;
      case 1:
        if (rectLocalY > this.size - rectLocalX / 2) {
          x++;
          y++;
        }
        break;
      case 2:
        if (rectLocalY > this.size - rectLocalX / 2) {
          x++;
        }
        break;
      case 3:
        if (rectLocalY < rectLocalX / 2) {
          x++;
        } else {
          y++;
        }
        break;
      default:
        break;
    }

    return { x, y };
  }

  draw(source) {
    if (this.viewMode === GAME_MODE) {
      this.drawGame(source.field);
    } else {
      this.drawGraph(source.graph);
    }
  }

  drawGame(field) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < this.fieldHeight; y++) {
      for (let x = 0; x < this.fieldWidth; x++) {
        this.drawTriangleAtPosition(x, y, field[y][x]);
      }
    }
  }

  drawGraph(graph) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Object.keys(graph).forEach(key => {
      let vertice = graph[key];
      const x = key % this.fieldWidth;
      const y = (key - x) / this.fieldWidth;

      this.drawTriangleAtPosition(x, y, vertice.color);
      vertice.adjacent.forEach(adjacentKey => {
        const adjX = adjacentKey % this.fieldWidth;
        const adjY = (adjacentKey - adjX) / this.fieldWidth;

        this.drawConnection({ x, y }, { x: adjX, y: adjY });
      });
    });
  }

  convertFieldCoordToCanvas(fieldCoord) {
    let y;
    let x = Math.floor(fieldCoord.x / 2) * this.fullSize;

    switch (fieldCoord.x % 4) {
      case 0:
      case 3:
        y = fieldCoord.y * this.fullSize + 1;
        break;
      case 1:
      case 2:
        y = fieldCoord.y * this.fullSize - this.size;
        break;
      default:
        break;
    }

    return { x, y };
  }

  drawTriangleAtPosition(x, y, color) {
    const origin = this.convertFieldCoordToCanvas({ x, y });
    const k = x % 2;

    this.context.beginPath();
    this.context.fillStyle = COLORS[color] ? COLORS[color] : DEFAULT_COLOR;
    this.context.moveTo(origin.x + 2 * this.size * k, origin.y);
    this.context.lineTo(origin.x + 2 * this.size * k, origin.y + 2 * this.size);
    this.context.lineTo(
      origin.x + 2 * this.size * (1 - k),
      origin.y + this.size
    );
    this.context.fill();
    this.context.closePath();
  }

  drawConnection(from, to) {
    const originFrom = this.convertFieldCoordToCanvas(from);
    const originTo = this.convertFieldCoordToCanvas(to);

    this.context.fillStyle = DEFAULT_COLOR;
    this.context.moveTo(originFrom.x + this.size, originFrom.y + this.size);
    this.context.lineTo(originTo.x + this.size, originTo.y + this.size);
    this.context.stroke();
  }
}
