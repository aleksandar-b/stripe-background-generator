import { observable, action, computed } from 'mobx';
import { flatten, repeat } from 'ramda';
import Grid from '../utils/Grid';
import { coinFlip, random } from '../utils/Helpers';

class Store {
  @observable
  background = [{ value: { r: 240, g: 240, b: 240, a: 1 }, id: Math.random(), standard: 'rgba(245, 245, 245, 1)' }];

  @observable
  palette = [
    { value: { r: 23, g: 54, b: 1, a: 1 }, id: Math.random(), standard: 'rgba(0, 0, 0, 1)' },
    { value: { r: 23, g: 54, b: 1, a: 1 }, id: Math.random(), standard: 'rgba(0, 0, 0, 0)' },
    { value: { r: 23, g: 224, b: 216, a: 1 }, id: Math.random(), standard: '#23B5DC' },
  ];

  @observable
  currentPaletteName = '';

  @observable
  currentBackgroundName = '';

  @observable
  stripeSize = 4;

  @observable
  stripeStyle = 'mixed';

  @observable
  rows = 17;

  @observable
  columns = 8;

  @observable
  stripeRound = 0;

  @observable
  stripeAlpha = 1;

  @action
  setPalette(palette) {
    this.palette = palette;
  }

  @action
  addPalette(color) {
    this.palette.push(color);
  }

  @action
  setBackgroundPalette(palettes) {
    this.background = palettes;
  }

  @action
  addBackgroundPalette(color) {
    this.background.push(color);
  }

  @action
  handleChangeColor(color) {
    const idx = this.palette.findIndex(clr => clr.id === color.id);
    this.palette.splice(idx, 1, color);
  }

  @action
  deleteColorFromPalette(color) {
    const idx = this.palette.findIndex(clr => clr.id === color.id);
    this.palette.splice(idx, 1);
  }

  @action
  handleChangeBackgroundColor(color) {
    const idx = this.background.findIndex(clr => clr.id === color.id);
    this.background.splice(idx, 1, color);
  }

  @action
  deleteColorFromPaletteBackground(color) {
    const idx = this.background.findIndex(clr => clr.id === color.id);
    this.background.splice(idx, 1);
  }

  @action
  handleStripeStyle(data) {
    this.stripeStyle = data;
  }

  @action
  handleStripeSize(data) {
    this.stripeSize = data;
  }

  @action
  handleStripeRound(data) {
    this.stripeRound = data;
  }

  @action
  handleStripeAlpha(data) {
    this.stripeAlpha = data / 100;
  }

  @action
  handleRows(data) {
    this.rows = data;
  }

  @action
  handleColumns(data) {
    this.columns = data;
  }

  @computed
  get getPalette() {
    return this.palette;
  }

  fill(value) {
    const { stripeStyle } = this;
    if (stripeStyle === 'fill') {
      return value;
    }
    return stripeStyle === 'outline' ? 'none' : (coinFlip() && 'none') || value;
  }

  @computed
  get randomGeneratedStripesSvg() {
    const grid = new Grid(this.columns, this.rows, 760, 1200);
    const randomPosition = grid.getRandomPosition();
    const { stripeSize } = this;

    return flatten(repeat(this.palette, Math.floor(this.rows / 2))).map(({ standard }) => {
      return {
        position: grid.getRandomPosition(),
        fill: this.fill(standard),
        stroke: standard,
        width: stripeSize === 4 ? random(0, 3) * randomPosition.width : randomPosition.width * stripeSize,
      };
    });
  }

  @computed
  get getBackground() {
    return this.background;
  }

  @computed
  get linearGradientBackground() {
    return `linear-gradient(to right, ${
      this.background.length > 1
        ? this.background.map(v => v.standard).join(',')
        : `${this.background.get(0).standard}, ${this.background.get(0).standard}`
    })`;
  }
}
export default new Store();
