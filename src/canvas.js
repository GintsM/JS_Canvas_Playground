// Square Canvas
import Cell, { Table, drawBox } from './Cell.js';

const canvas = document.getElementById("myCanvas");
const DIM = 600;
let ROW = 9;
let boxSize = Math.floor(DIM / ROW);
const sqR = Math.sqrt(ROW);
const roundedHeightWidth = DIM % ROW === 0 ? DIM : Math.floor(DIM / ROW) * ROW;

canvas.setAttribute('width', `${roundedHeightWidth}px`);
canvas.setAttribute('height', `${roundedHeightWidth}px`);
const ctx = canvas.getContext("2d");

let frame = Array(ROW * 3).fill().map(_ => new Table(ROW));

let line = 0, col = 0, grid = 0;
const table = Array(ROW * ROW).fill().map((_, i) => {
  line = Math.floor(i / ROW); // SORT HORIZONTAL
  col = i - ROW * (line); //SORT VERTICAL
  grid = Math.floor(col / sqR) + Math.floor(line / sqR) * sqR;
  return new Cell(frame[line].tIndx, frame[col + ROW].tIndx, frame[grid + 2 * ROW].tIndx);
})

let markedSqureX = 0, markedSqureY = 0;
let ableToWrite = false;
let tempX = 0, tempY = 0;

const clearBox = (x, y, width = boxSize) => {
  tempX = Math.floor(y / width);
  tempY = Math.floor(x / width);
  ctx.clearRect(tempY * width, tempX * width, width, width)
  markedSqureX = tempY * width;
  markedSqureY = tempX * width;
  ableToWrite = true
}

// Event Listeners
canvas.addEventListener('click', (e) => {// TODO make so it returns value if there are/ if error in logic, so you can change
  clearBox(e.offsetX, e.offsetY)
})

document.addEventListener('keydown', (e) => {
  let pKey = parseInt(e.key)
  if (table[tempX * ROW + tempY].line[pKey - 1] && table[tempX * ROW + tempY].col[pKey - 1]
    && table[tempX * ROW + tempY].grid[pKey - 1] && ableToWrite) {

    for (let [_, value] of Object.entries(table[tempX * ROW + tempY])) {
      value ? value[pKey - 1] = 0 : value = pKey;
    }
    ctx.font = `${boxSize / 2}px serif`;
    ctx.fillText(`${pKey}`, markedSqureX + boxSize * .25, markedSqureY + boxSize * 0.75);
    ableToWrite = false
  }
  drawBox(ctx, ROW, boxSize, DIM)
})

drawBox(ctx, ROW, boxSize, DIM);

//   const syncTimeout = 200

//   const slowFilling = async (array, posX, posY) => {
//     const savedXvalue = posX
//     while (array.length > 0) {
//       await new Promise(r => setTimeout(r, syncTimeout));
//       let randomValue = getRandom(array);
//       ctx.font = `${boxSize / 2}px serif`;

//       // here comes drawing
//       ctx.fillText(`${randomValue + 1}`, posX + boxSize * .25, posY + boxSize * 0.75);
//       posX += boxSize;
//       if (posX === boxSize * sqR + savedXvalue) {
//         posX = savedXvalue;
//         posY += boxSize;
//       }
//       array = array.filter((val) => {
//         return val !== randomValue;
//       })
//     }
//   }

//   const fillCells = () => {
//     if (ROW === 1) return;
//     let posX = 0;
//     let posY = 0;
//     let loopThroughTable = 0
//     const outerGrid = async () => {
//       while (loopThroughTable < ROW) {
//         await new Promise(r => setTimeout(r, syncTimeout * ROW + syncTimeout));
//         slowFilling(table[loopThroughTable].options, posX, posY)
//         posX += (sqR * boxSize)
//         if (posX === boxSize * ROW) {
//           posX = 0;
//           posY += boxSize * sqR;
//         }
//         loopThroughTable++
//       };
//     }
//     outerGrid()
//   }