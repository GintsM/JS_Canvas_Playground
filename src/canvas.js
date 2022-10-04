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
})

document.addEventListener('keydown', (e) => {
  let pKey = parseInt(e.key)

  // if there are value in Cell
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

  // if no values in Cell 
  else if ((table[tempX * ROW + tempY].line[pKey - 1] && table[tempX * ROW + tempY].col[pKey - 1]
    && table[tempX * ROW + tempY].grid[pKey - 1] && ableToWrite)) {
    for (let [_, values] of Object.entries(table[tempX * ROW + tempY])) {
      values ? values[pKey - 1] = 0 : table[tempX * ROW + tempY].value = pKey;
    }
    drawValue(pKey, 'bold', 'black')
  }

  // delete value in Cell
  else if (tempV && e.key === 'Delete') {
    for (let [_, values] of Object.entries(table[tempX * ROW + tempY])) {
      if (Array.isArray(values)) {
        values[tempV - 1] = tempV;
      }
    }
    table[tempX * ROW + tempY].value = ''
    drawValue('')
    tempV = 0;
  }
  console.table(table[tempX * ROW + tempY])
  ableToWrite = false;
  drawBox(ctx, ROW, boxSize, DIM)
})
drawBox(ctx, ROW, boxSize, DIM);
