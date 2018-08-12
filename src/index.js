import Render from "./renderer";

const field = [
[1,1,1,1,1,1,1,1,3,1,1,1],
[1,1,1,1,3,3,3,1,3,1,1,1],
[1,1,1,1,1,1,3,1,3,3,1,1],
[4,1,1,3,1,3,1,1,1,1,1,1],
[4,4,4,4,4,3,1,1,1,1,1,1],
[0,4,4,4,4,4,1,4,1,1,2,1],
[0,0,0,0,0,4,4,4,4,4,1,4],
[0,0,0,0,0,0,0,0,0,4,4,4],
[0,0,0,0,0,0,0,0,0,0,0,0]];
const fieldCanvas = document.getElementById("field");
const paletteCanvas = document.getElementById("palette");
const render = new Render(fieldCanvas, paletteCanvas);
document.getElementById("fillAll").onchange = render.onChangeFillOptions;
document.getElementById("gameView").onchange = render.onChangeViewOptions;
document.getElementById("newGame").onclick = render.onNewGame;
render.start(field);
