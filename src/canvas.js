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
let zero_to_n = Array(boxes * boxes).fill(4)

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

const fillCells = () => {
  while (zero_to_n.length > 1) {
    let randomValue = getRandom(zero_to_n);
    zero_to_n = zero_to_n.filter((val, index) => {
      val = index
      return index !== randomValue;
    })

  }
}

// function handleClick(e) {
//   let x, y = 0;
//   x = Math.floor(e.offsetX / boxSize) * boxSize
//   y = Math.floor(e.offsetY / boxSize) * boxSize
//   ctx.font = `${boxSize / 2}px serif`;
//   // TODO clear field if there something is already
//   ctx.fillText(`${getRandom(zero_to_n)}`, x, y + boxSize * 0.75);
// }

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

drawBox();
canvas.addEventListener('click', fillCells);
