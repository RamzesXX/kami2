var margin = 1;
var size = 40;
var fullSize = 2 * (size + margin);
var selectedColor = 0;
var colors = ["#000000", "#F9A520", "#FF6347", "#236734"];
var field = [
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1]
];
var game = new Kami2(field);
var wPix = Math.floor(game.fieldWidth / 2) * fullSize;
var hPix = game.fieldHeight * fullSize - size - 1;

function createPaletteCanvas() {
  var canvas = document.createElement("canvas");
  document.getElementById("palette").innerHTML = "";
  canvas.width = (size + 2 * margin) * colors.length;
  canvas.height = size + 2 * margin;
  canvas.onclick = onPaletteClick;
  document.getElementById("palette").appendChild(canvas);

  return canvas.getContext("2d");
}

function onPaletteClick(e) {
  var hitPos = {
    x: e.clientX - 8,
    y: e.clientY - 8
  };
  selectedColor = Math.floor(hitPos.x / (size + 2 * margin));
  var paletteCtx = createPaletteCanvas();
  drawPallette(paletteCtx);
}

function drawPallette(ctx) {
  for (var i = 0; i < colors.length; i++) {
    var startX = i * (size + 2 * margin) + margin;
    var startY = margin;
    ctx.fillStyle = colors[i];
    if (i === selectedColor) {
      ctx.fillRect(startX, startY, size, size);
    } else {
      ctx.fillRect(startX, startY, size / 2, size / 2);
    }
  }
}

function createFieldCanvas() {
  var canvas = document.createElement("canvas");
  document.getElementById("field").innerHTML = "";
  canvas.width = wPix;
  canvas.height = hPix;
  canvas.onclick = onFieldClick;
  document.getElementById("field").appendChild(canvas);

  return canvas.getContext("2d");
}

function onFieldClick(e) {
  //we substract 8 to adjust cursor's position
  var hitPos = {
    x: e.clientX - 8,
    y: e.clientY - 8
  };
  var rectLocalX = hitPos.x % fullSize;
  var rectLocalY = hitPos.y % (size + margin);
  var x = Math.floor(hitPos.x / fullSize);
  var y = Math.floor(hitPos.y / (size + margin));
  var rectType = 2 * (x % 2) + (y % 2);
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
      if (rectLocalY > size - rectLocalX / 2) {
        x++;
        y++;
      }
      break;
    case 2:
      if (rectLocalY > size - rectLocalX / 2) {
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
  }

  game.doTurn(x, y, selectedColor);
  draw();
}

function drawField(ctx) {
  for (var y = 0; y < field.length; y++) {
    for (var x = 0; x < field[y].length; x++) {
      drawTriangleAtPosition(ctx, x, y, field[y][x]);
    }
  }
}

function drawTriangleAtPosition(ctx, x, y, color) {
  var Y;
  var X = Math.floor(x / 2) * fullSize;

  ctx.beginPath();
  ctx.fillStyle = colors[color] ? colors[color] : colors[0];

  switch (x % 4) {
    case 0:
    case 3:
      Y = y * fullSize + 1;
      break;
    case 1:
    case 2:
      Y = y * fullSize - size;
      break;
  }

  if (x % 2) {
    ctx.moveTo(X + 2 * size, Y);
    ctx.lineTo(X + 2 * size, Y + 2 * size);
    ctx.lineTo(X, Y + size);
  } else {
    ctx.moveTo(X, Y);
    ctx.lineTo(X, Y + 2 * size);
    ctx.lineTo(X + 2 * size, Y + size);
  }

  ctx.fill();
  ctx.closePath();
}

function draw() {
  var fieldCtx = createFieldCanvas();
  var paletteCtx = createPaletteCanvas();
  drawField(fieldCtx);
  drawPallette(paletteCtx);
}

draw();
