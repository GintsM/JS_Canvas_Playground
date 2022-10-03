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

let markedSqureX = 0, markedSqureY = 0, tempX = 0, tempY = 0, tempV = 0;
let ableToWrite = false;

const clearBox = (x, y, width = boxSize) => {
  tempX = Math.floor(y / width);
  tempY = Math.floor(x / width);
  ctx.clearRect(tempY * width, tempX * width, width, width)
  tempV = table[tempX * ROW + tempY].value; // Figure out what valuae are here
  console.log(tempV, "thios is tempVal")
  markedSqureX = tempY * width;
  markedSqureY = tempX * width;
  ableToWrite = true
}

// draw value on grid
const drawValue = (val, f_style = '', textCol = '') => {
  ctx.font = `${f_style} ${boxSize / 2}px serif`;
  ctx.fillStyle = `${textCol}`;
  ctx.fillText(`${val}`, markedSqureX + boxSize * .25, markedSqureY + boxSize * 0.75);

}

// Event Listeners
canvas.addEventListener('click', (e) => {
  if (tempV) drawValue(tempV, '', 'blue');// When click on other cell restore value
  drawBox(ctx, ROW, boxSize, DIM)//Restore board
  clearBox(e.offsetX, e.offsetY)
  console.table(table[tempX * ROW + tempY]);
  console.log("Cell: ", tempX * ROW + tempY)
  console.log("TempV: ", tempV, ableToWrite, 'ab_write')
})

document.addEventListener('keydown', (e) => {

  // if tempV than
  // i can restrict access to all functions, beause there are already value
  // if e.key is number (!isNan(e.key)) must update Cell
  // Should think how to read if there other clikc
  console.log(e.key)
  let pKey = parseInt(e.key)
  // if there are value
  if (tempV && pKey) {
    for (let [_, values] of Object.entries(table[tempX * ROW + tempY])) {
      if (Array.isArray(values)) {
        values[tempV - 1] = tempV;
        values[pKey - 1] = 0;
      }
    }
    table[tempX * ROW + tempY].value = pKey
    drawValue(pKey)
    tempV = 0;
  }

  // if no values
  else if ((table[tempX * ROW + tempY].line[pKey - 1] && table[tempX * ROW + tempY].col[pKey - 1]
    && table[tempX * ROW + tempY].grid[pKey - 1] && ableToWrite)) {
    for (let [_, values] of Object.entries(table[tempX * ROW + tempY])) {
      values ? values[pKey - 1] = 0 : table[tempX * ROW + tempY].value = pKey;
    }
    drawValue(pKey, 'bold', 'black')
  }


  ableToWrite = false;

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