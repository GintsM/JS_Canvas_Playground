// Square Canvas
import getRandom from './ran_fr_arr.js'


// side dimensions
const DIM = 600;


const canvas = document.getElementById("myCanvas");
canvas.setAttribute('width', `${DIM}px`)
canvas.setAttribute('height', `${DIM}px`)
const ctx = canvas.getContext("2d"),
  boxSize = 30,
  boxes = Math.floor(DIM / boxSize);

const zero_to_n = Array(boxes * boxes).fill(4)

// const handleClick = () => console.log(getRandom(zero_to_n))


function drawBox() {
  ctx.beginPath();
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
}

function handleClick(e) {
  let x, y = 0;
  x = Math.floor(e.offsetX / boxSize) * boxSize
  y = Math.floor(e.offsetY / boxSize) * boxSize
  ctx.font = '18px serif';
  ctx.fillText(`${getRandom(zero_to_n)}`, x, y - 9 + boxSize);
}

/*function handleClick(e) {
  let x, y = 0;
  x = Math.floor(e.offsetX / boxSize) * boxSize
  y = Math.floor(e.offsetY / boxSize) * boxSize
  ctx.font = '18px serif';
  const countYPart = y > 0 ? y / boxSize * (DIM / boxSize) : y

  // fillText writes up from passed arg. y 
  // TODO here must call function to fill all cells
  ctx.fillText(`${x > 0 ? x / boxSize + 1 + countYPart : (x + 1) + countYPart}`, x, y + boxSize);
  // ctx.fillStyle = "black";
  // to fill rectang with black uncomment next line
  // ctx.fillRect(x, y, boxSize, boxSize);
}*/

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
canvas.addEventListener('click', handleClick);
