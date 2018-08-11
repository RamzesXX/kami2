import Render from "./renderer";

const field = [
  [1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1]
];
const fieldCanvas = document.getElementById("field");
const paletteCanvas = document.getElementById("palette");
const render = new Render(fieldCanvas, paletteCanvas);
document.getElementById("fillAll").onchange = render.onChangeOptions;
render.start(field);
