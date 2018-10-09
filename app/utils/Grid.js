import { random } from './Helpers';

class Grid {
  constructor (columns, rows, gridHeight, gridWidth) {
    this.columns = columns;
    this.rows = rows;
    this.gridHeight = gridHeight;
    this.gridWidth = gridWidth;
    this.cellHeight = this.gridHeight / this.rows;
    this.cellWidth = this.gridWidth / this.numberOfColumns;
  }

  getCellHeight() {
    return this.gridHeight / this.rows;
  }

  getCellWidth() {
    return this.gridWidth / this.columns;
  }

  static random (min, max) {
    return random(min, max);
  }

  static toPercent (rel, abs) {
    return (rel * 100) / abs;
  }

  getRandomPosition () {
    const top = Grid.random(0, this.rows - 1) * this.getCellHeight();
    const left = Grid.random(0, this.columns - 1) * this.getCellWidth();
    return {
      top: Grid.toPercent(top, this.gridHeight),
      left: Grid.toPercent(left, this.gridWidth),
      width: Grid.toPercent(this.getCellWidth(), this.gridWidth),
      height: Grid.toPercent(this.getCellHeight(), this.gridHeight),
    };
  }
}

export default Grid;
