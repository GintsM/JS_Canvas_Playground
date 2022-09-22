// Square Canvas
import getRandom from './ran_fr_arr.js'


// side dimensions
const DIM = 600;


const canvas = document.getElementById("myCanvas");
canvas.setAttribute('width', `${DIM}px`)
canvas.setAttribute('height', `${DIM}px`)
const ctx = canvas.getContext("2d"),
  boxSize = 60,
  boxes = Math.floor(DIM / boxSize);
let zero_to_n = Array(boxes * boxes).fill().map((_, i) => i)

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

  let posX = 0;
  let posY = 0;

  const slowFilling = async () => {
    while (zero_to_n.length > 0) {
      await new Promise(r => setTimeout(r, 200));
      let randomValue = getRandom(zero_to_n);
      ctx.font = `${boxSize / 2}px serif`;
      // here comes drawing
      ctx.fillText(`${randomValue + 1}`, posX, posY + boxSize * 0.75);
      posX += boxSize;
      if (posX === boxSize * boxes) {
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
