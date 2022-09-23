// Square Canvas
import getRandom from './ran_fr_arr.js'
import Cell from './Cell.js';

const canvas = document.getElementById("myCanvas");

const canvasScreen = (GRIDROWS = 4) => {
  const DIM = 600;
  const roundedHeightWidth = DIM % GRIDROWS === 0 ? DIM : Math.floor(DIM / GRIDROWS) * GRIDROWS

  canvas.setAttribute('width', `${roundedHeightWidth}px`)
  canvas.setAttribute('height', `${roundedHeightWidth}px`)
  const ctx = canvas.getContext("2d"),
    boxSize = Math.floor(DIM / GRIDROWS);
  let table = Array(GRIDROWS * GRIDROWS).fill().map(_ => new Cell(GRIDROWS))

  function drawBox() {
    ctx.fillStyle = 'darkblue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    let x = 0, y = 0;

    for (let row = 0; row <= GRIDROWS; row++) {
      ctx.beginPath();

      // X axe
      x = row * boxSize;
      (row % Math.sqrt(GRIDROWS)) === 0 ? ctx.lineWidth = 4 : ctx.lineWidth = 2;
      ctx.moveTo(x, y)
      ctx.lineTo(x, y + DIM)
      ctx.stroke();

      // Y axe
      ctx.moveTo(y, x)
      ctx.lineTo(y + DIM, x)
      ctx.stroke();
      ctx.closePath();
    }
  }

  const syncTimeout = 200

  const slowFilling = async (array, posX, posY) => {
    const savedXvalue = posX
    while (array.length > 0) {
      await new Promise(r => setTimeout(r, syncTimeout));
      let randomValue = getRandom(array);
      ctx.font = `${boxSize / 2}px serif`;

      // here comes drawing
      ctx.fillText(`${randomValue + 1}`, posX + boxSize * .25, posY + boxSize * 0.75);
      posX += boxSize;
      if (posX === boxSize * Math.sqrt(GRIDROWS) + savedXvalue) {
        posX = savedXvalue;
        posY += boxSize;
      }
      array = array.filter((val) => {
        return val !== randomValue;
      })
    }
  }

  const fillCells = () => {
    let posX = 0;
    let posY = 0;
    let loopThroughTable = 0
    const outerGrid = async () => {
      while (loopThroughTable < GRIDROWS) {
        await new Promise(r => setTimeout(r, syncTimeout * GRIDROWS + syncTimeout));
        slowFilling(table[loopThroughTable].options, posX, posY)
        posX += (Math.sqrt(GRIDROWS) * boxSize)
        if (posX === boxSize * GRIDROWS) {
          posX = 0;
          posY += boxSize * Math.sqrt(GRIDROWS);
        }
        loopThroughTable++
      };
    }
    outerGrid()
  }
  drawBox()
  fillCells();
}

canvasScreen();

const fillButton = document.getElementById('fillButton');
const choiceNumber = document.getElementById('sqNumber')

fillButton.addEventListener('click', () => {
  fillButton.disabled = true;
  canvasScreen(parseInt(choiceNumber.value, 10))
});
