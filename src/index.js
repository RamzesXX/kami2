var margin = 1;
var size = 40;
var fullSize = 2 * (size + margin);
var colors = ["#000000", "#F9A520", "#FF6347", "#236734"];
var field = [[0, 1, 1, 1, 0, 3], [0, 1, 2, 1, 0, 3]];
var w = field[0].length;
var h = field.length;
var wPix = Math.floor(w / 2) * fullSize;
var hPix = h * fullSize - size - 1;

function createCanvas() {
  var canvas = document.createElement("canvas");
  document.getElementById("root").innerHTML = "";
  canvas.width = wPix;
  canvas.height = hPix;
  canvas.onclick = onClick;
  document.getElementById("root").appendChild(canvas);

  return canvas.getContext("2d");
}

/*
We check if dot is below the line y = kx (k = size / (2 * size) = 1/2)
|\  |
| \ |
|  \|

|  /|
| / |
|/  |
*/
function onClick(e) {
  //we substract 8 to adjust cursor's position
  var rectLocalX = (e.clientX - 8) % fullSize;
  var rectLocalY = (e.clientY - 8) % (size + margin);
  var x = 2 * Math.floor(e.clientX / fullSize);
  var y = Math.floor(e.clientY / (size + margin));

  //case - A(/)
  if (x % 2) {
    if (y % 2) {
      if (rectLocalY < rectLocalX / 2) {
        x++;
      }
    } else {
    }
  } else {
    if (y % 2) {
      y >>= 1;
      if (rectLocalY > size - rectLocalX / 2) {
        x++;
        y++;
      }
    } else {
      y >>= 1;
      if (rectLocalY < rectLocalX / 2) {
        x++;
      }
    }
  }

  //

  console.log(`X=${rectLocalX}, Y=${rectLocalY}`);
  console.log(`x=${x}, y=${y}`);
  field[y][x] = (field[y][x] + 1) % colors.length;
  draw();
}

function draw() {
  console.log("-----");
  var ctx = createCanvas();
  drawField(ctx);
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

draw();
