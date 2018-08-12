export const COLORS = [
  "#000000",
  "#F9A520",
  "#FF1347",
  "#036783",
  "#236734",
  "#23AA34"
];
export const DEFAULT_COLOR = 0;

export default class Palette {
  constructor(paletteCanvas, size, margin) {
    this.context = paletteCanvas.getContext("2d");
    this.canvas = paletteCanvas;
    this.canvas.style.cursor = "pointer";
    this.canvas.width = (size + 2 * margin) * COLORS.length;
    this.canvas.height = size + 2 * margin;
    this.canvas.onclick = this.onClick.bind(this);
    this.size = size;
    this.margin = margin;
    this.init();
  }

  init() {
    this.selectedColorIndex = DEFAULT_COLOR;
    this.draw();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < COLORS.length; i++) {
      let startX = i * (this.size + 2 * this.margin) + this.margin;
      let startY = this.margin;
      this.context.fillStyle = COLORS[i];
      if (i === this.selectedColorIndex) {
        this.context.fillRect(startX, startY, this.size, this.size);
      } else {
        this.context.fillRect(
          startX + this.size / 4,
          startY + this.size / 4,
          this.size / 2,
          this.size / 2
        );
      }
    }
  }

  onClick(e) {
    var hitPos = {
      x: e.clientX - 8,
      y: e.clientY - 8
    };
    this.selectedColorIndex = Math.floor(
      hitPos.x / (this.size + 2 * this.margin)
    );
    this.draw();
  }
}
