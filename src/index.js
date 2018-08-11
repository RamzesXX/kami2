import Render from "./renderer";

const field = [
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1]
];
const fieldCanvas = document.getElementById("field");
const paletteCanvas = document.getElementById("palette");
const render = new Render(fieldCanvas, paletteCanvas);

render.start(field);
