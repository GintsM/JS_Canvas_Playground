// Square Canvas
import { frameElement } from './ran_fr_arr.js'
import Cell from './Cell.js';
import { Table } from './Cell.js';
import { drawBox } from './Cell.js';

const canvas = document.getElementById("myCanvas");
const DIM = 600;
let ROW = 9
let boxSize = Math.floor(DIM / ROW);
const sqR = Math.sqrt(ROW)
const roundedHeightWidth = DIM % ROW === 0 ? DIM : Math.floor(DIM / ROW) * ROW

canvas.setAttribute('width', `${roundedHeightWidth}px`)
canvas.setAttribute('height', `${roundedHeightWidth}px`)
const ctx = canvas.getContext("2d");

let frame = Array(ROW * 3).fill().map(_ => new Table(ROW))
/* frame to modify when entering random numbers in cells
so it is less iterations
frame[0 ... ROW -1] - lines
frame[ROW ... ROW * 2 -1] -columns
frame[ROW * 2 ... ROW *3-1] - grid
 */

/* Table is iteration through all Cells
can use formulas of variables to reach quickly frames
 */

let line = 0, col = 0, grid = 0;
const table = Array(ROW * ROW).fill().map((_, i) => {
  line = Math.floor(i / ROW) // SORT HORIZONTAL
  col = i - ROW * (line) //SORT VERTICAL
  grid = Math.floor(col / sqR) + Math.floor(line / sqR) * sqR
  return new Cell(frame[line].tIndx, frame[col + ROW].tIndx, frame[grid + 2 * ROW].tIndx)
})

// frame[0].tIndx.pop()
// frame[0].tIndx.pop()

drawBox(ctx, ROW, boxSize, DIM)

let markedSqureX = 0, markedSqureY = 0
let ableToWrite = false

let tempX = 0, tempY = 0, tempGr = 0;

const clearBox = (x, y, width = boxSize) => {
  tempX = Math.floor(y / width)
  tempY = Math.floor(x / width)
  tempGr = Math.floor(tempY / sqR) + Math.floor(tempX / sqR) * sqR + 2 * ROW

  x = Math.floor(x / width) * width;
  y = Math.floor(y / width) * width;
  ctx.clearRect(x, y, width, width)
  markedSqureX = x;
  markedSqureY = y;
  ableToWrite = true
}

const showFrame = () => {
  const frameList = document.getElementById('frame')
  while (frameList.firstChild) {
    frameList.removeChild(frameList.firstChild);
  }
  frame.forEach((el, i) => frameElement(i + 1, el.tIndx, frameList))
}
// Event Listeners

canvas.addEventListener('click', (e) => {
  clearBox(e.offsetX, e.offsetY)
})

document.addEventListener('keydown', (e) => {
  let pKey = parseInt(e.key)

  if (frame[tempX].tIndx[pKey - 1] && frame[tempY + ROW].tIndx[pKey - 1]
    && frame[tempGr].tIndx[pKey - 1] && ableToWrite) {
    frame[tempX].tIndx[pKey - 1] = 0;
    frame[tempY + ROW].tIndx[pKey - 1] = 0;
    frame[tempGr].tIndx[pKey - 1] = 0;
    ctx.font = `${boxSize / 2}px serif`;
    ctx.fillText(`${pKey}`, markedSqureX + boxSize * .25, markedSqureY + boxSize * 0.75);
    ableToWrite = false
  }
  drawBox(ctx, ROW, boxSize, DIM)
  showFrame()
})

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