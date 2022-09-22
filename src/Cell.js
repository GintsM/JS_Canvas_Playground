class Cell {
  constructor(options) {
    this.options = Array(options)
    this.value = ''
  }
  check() {
    if (this.options.length === 1) {
      this.value = this.options[0]
      return "probably value is updated"
    }
    return "Still some elements"
  }
}

// const table = Array(9).fill().map(_ => new Cell())
export default Cell