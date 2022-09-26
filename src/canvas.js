// Square Canvas
import getRandom from './ran_fr_arr.js'
import Cell from './Cell.js';
import { Table } from './Cell.js';

const canvas = document.getElementById("myCanvas");

const canvasScreen = (ROWS = 1) => {
  const DIM = 600;
  const sqR = Math.sqrt(ROWS)
  const roundedHeightWidth = DIM % ROWS === 0 ? DIM : Math.floor(DIM / ROWS) * ROWS

  canvas.setAttribute('width', `${roundedHeightWidth}px`)
  canvas.setAttribute('height', `${roundedHeightWidth}px`)
  const ctx = canvas.getContext("2d"),
    boxSize = Math.floor(DIM / ROWS);
  let frame = Array(ROWS * 3).fill().map(_ => new Table(ROWS))// TODO Rename Cell

  let line = 0, row = 0, grid = 0;
  const table = Array(ROWS * ROWS).fill().map((_, i) => {
    line = Math.floor(i / ROWS) // SORT HORIZONTAL
    row = i - ROWS * (line) //SORT VERTICAL
    grid = (Math.floor(row / sqR) + Math.floor(line / sqR) * sqR)
    return new Cell(frame[line].elmOptions, frame[row + ROWS].elmOptions, frame[grid + 2 * ROWS].elmOptions)
  })

}
canvasScreen(4);

/* Comented out for nice flow*/

//   function drawBox() {
//     ctx.fillStyle = 'darkblue';
//     ctx.fill();
//     ctx.strokeStyle = 'black';
//     let x = 0, y = 0;

//     for (let row = 0; row <= ROWS; row++) {
//       ctx.beginPath();

//       // X axe
//       x = row * boxSize;
//       (row % sqR) === 0 ? ctx.lineWidth = 4 : ctx.lineWidth = 2;
//       ctx.moveTo(x, y)
//       ctx.lineTo(x, y + DIM)
//       ctx.stroke();

//       // Y axe
//       ctx.moveTo(y, x)
//       ctx.lineTo(y + DIM, x)
//       ctx.stroke();
//       ctx.closePath();
//     }
//   }

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
//     if (ROWS === 1) return;
//     let posX = 0;
//     let posY = 0;
//     let loopThroughTable = 0
//     const outerGrid = async () => {
//       while (loopThroughTable < ROWS) {
//         await new Promise(r => setTimeout(r, syncTimeout * ROWS + syncTimeout));
//         slowFilling(table[loopThroughTable].options, posX, posY)
//         posX += (sqR * boxSize)
//         if (posX === boxSize * ROWS) {
//           posX = 0;
//           posY += boxSize * sqR;
//         }
//         loopThroughTable++
//       };
//     }
//     outerGrid()
//   }
//   drawBox()
//   fillCells();
// }

// canvasScreen();

// const fillButton = document.getElementById('fillButton');
// const choiceNumber = document.getElementById('sqNumber')

// fillButton.addEventListener('click', () => {
//   fillButton.disabled = true;
//   canvasScreen(parseInt(choiceNumber.value, 10))
// });
