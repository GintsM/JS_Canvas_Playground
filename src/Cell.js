/**
 * Table class
 * @type {{elmOptions:Array}}
 * 1/3 part lines, 2/3 columns, 3/3 Grid
 */

export class Table {
  constructor(elmOptions) {
    this.elmOptions = Array(elmOptions).fill().map((_, i) => i)
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

  check() { // may consider to pass for 
    if (!this.value) {
      this.line.length === 1 ? this.value = this.line[0] :
        this.col.length === 1 ? this.value = this.col[0] :
          this.grid === 1 ? this.value = this.grid[0] :
            "keep removing";
    }
    return this.value
  }
}

export default Cell