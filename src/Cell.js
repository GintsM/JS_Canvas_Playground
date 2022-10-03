/**
 * Table class
 * @type {{tIndx:Array}}
 * 1/3 part lines, 2/3 columns, 3/3 Grid
 */

export class Table {
  constructor(tIndx) {
    this.tIndx = Array(tIndx).fill().map((_, i) => i + 1)
  }
}

class Cell {// TODO create checkByLength() maybe
  // options = []
  constructor(line, col, grid) {
    this.line = line
    this.col = col
    this.grid = grid
    this.value = '';
  }

  updateValIfLast() {
    if (!this.value) {
      for (let [_, values] of Object.entries(this)) {
        if (values) {
          let count = 0, i = 0, temp = 0;
          while (count <= 1) {
            temp ? '' : temp = values[i];
            values[i] ? count += 1 : '';
            if (i === values.length - 1 && count === 1) {
              this.value = temp;
              return this.value
            }
            i += 1;
          }
        }
      }
    }
    return this.value
  }

  cellsOptions() {
    // let arr = []
    // arr = this.line.concat(this.col, this.grid)
    // console.log(arr, "cellsOptions")
  }
}

export default Cell

export function drawBox(ctx, ROW, boxSize, DIM) {
  ctx.strokeStyle = 'black';
  let x = 0, y = 0;
  for (let row = 0; row <= ROW; row++) {
    ctx.beginPath();
    // X axe
    x = row * boxSize;
    (row % Math.sqrt(ROW)) === 0 ? ctx.lineWidth = 4 : ctx.lineWidth = 2;
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