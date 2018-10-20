export default class Stripe {
  constructor(columnStart, columnEnd, rowStart, rowEnd, colors = []) {
    this.id = Math.random();
    this.columnStart = columnStart;
    this.columnEnd = columnEnd;
    this.rowStart = rowStart;
    this.rowEnd = rowEnd;
    this.colors = colors;
  }
}
