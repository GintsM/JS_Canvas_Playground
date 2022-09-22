// Square Canvas
import getRandom from './ran_fr_arr.js'
import Cell from './Cell.js';

/*Values for Multigrid must be Square numbers
 ex: 4, 9, 16, 25*/
const GRIDROWS = 25
const DIM = 600;

const roundedHeightWidth = DIM % GRIDROWS === 0 ? DIM : Math.floor(DIM / GRIDROWS) * GRIDROWS

const canvas = document.getElementById("myCanvas");
canvas.setAttribute('width', `${roundedHeightWidth}px`)
canvas.setAttribute('height', `${roundedHeightWidth}px`)
const ctx = canvas.getContext("2d"),
  boxSize = Math.floor(DIM / GRIDROWS);
// boxes = Math.floor(DIM / boxSize); Replace with GRIDROWS
let zero_to_n = Array(GRIDROWS * GRIDROWS).fill().map(_ => new Cell(GRIDROWS))

function drawBox() {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  let x, y = 0;

  for (let row = 0; row < GRIDROWS; row++) {
    x = row * boxSize;
    ctx.rect(x, y, boxSize, DIM);
    ctx.stroke();
    ctx.rect(y, x, DIM, boxSize);
    ctx.stroke();
  }
  ctx.closePath();
}

const fillCells = () => {

  let posX = 0;
  let posY = 0;

  // make loop for each cell object in grid as well maybe extra line for innergrid

  const slowFilling = async () => {
    while (zero_to_n.length > 0) {
      await new Promise(r => setTimeout(r, 200));
      let randomValue = getRandom(zero_to_n);
      ctx.font = `${boxSize / 2}px serif`;
      // here comes drawing
      ctx.fillText(`${randomValue + 1}`, posX, posY + boxSize * 0.75);
      posX += boxSize;
      if (posX === boxSize * GRIDROWS) {
        posX = 0;
        posY += boxSize;
      }
      zero_to_n = zero_to_n.filter((val) => {
        return val !== randomValue;
      })
    }
  }
  slowFilling();
}


drawBox();

let emptyGrid = true
canvas.addEventListener('click', () => {
  if (emptyGrid) {
    fillCells();
  }
  emptyGrid = false
});
