// Square Canvas

// side dimensions
DIM = 600;


const canvas = document.getElementById("myCanvas");
canvas.setAttribute('width', `${DIM}px`)
canvas.setAttribute('height', `${DIM}px`)
const ctx = canvas.getContext("2d"),
  boxSize = 30,
  boxes = Math.floor(DIM / boxSize);
canvas.addEventListener('click', clear);
canvas.addEventListener('mousemove', handleClick);

function drawBox() {

  ctx.beginPath();
  // ctx.fillStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  let x, y = 0;

  for (let row = 0; row < boxes; row++) {
    x = row * boxSize;
    ctx.rect(x, y, boxSize, DIM);
    ctx.stroke();
    ctx.rect(y, x, DIM, boxSize);
    ctx.stroke();
  }
  ctx.closePath();
  // ctx.font = '18px serif';
  // ctx.fillText("This is twxt", 0, 30)


}

function handleClick(e) {
  let x, y = 0;
  x = Math.floor(e.offsetX / boxSize) * boxSize
  y = Math.floor(e.offsetY / boxSize) * boxSize
  ctx.font = '18px serif';
  const countYPart = y > 0 ? y / boxSize * (DIM / boxSize) : y

  // fillText write up from passed arg. y 
  ctx.fillText(`${x > 0 ? x / boxSize + 1 + countYPart : (x + 1) + countYPart}`, x, y + boxSize);
  // ctx.fillStyle = "black";

  // to fill rectang with black uncomment next line
  // ctx.fillRect(x, y, boxSize, boxSize);
}

/*
options for fillText method
fillText(text, x, y)
fillText(text, x, y, maxWidth)
Text insert
*/
function clear(e) {
  ctx.fillStyle = "white";
  ctx.fillRect(Math.floor(e.offsetX / boxSize) * boxSize,
    Math.floor(e.offsetY / boxSize) * boxSize,
    boxSize, boxSize);
}

drawBox();
