import { observable, action, computed } from 'mobx';
import { flatten, repeat } from 'ramda';
import Grid from '../utils/Grid';
import { coinFlip, random } from '../utils/Helpers';

class Store {
  @observable
  background = [{ value: '#fff', id: Math.random() }];

  @observable
  stripeSize = 1;

  @observable
  stripeStyle = 'fill';

  @observable
  rows = 8;

  @observable
  columns = 8;

  @observable
  palette = [{ value: '#ff9968', id: Math.random() }];

  @action
  addPalette(color) {
    this.palette.push(color);
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

  @computed
  get randomGeneratedStripes() {
    const grid = new Grid(this.columns, this.rows, 760, 1200);
    const { stripeStyle, stripeSize } = this;

    return flatten(repeat(this.palette, Math.floor(this.rows / 2))).map(({ value }) => {
      return {
        position: grid.getRandomPosition(),
        value,
        stripeStyle,
        stripeSize,
        fill: coinFlip() ? 'none' : value,
        forceWidth: stripeSize === 4 ? random(0, 3) : stripeSize,
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
        ? this.background.map(v => v.value).join(',')
        : `${this.background.get(0).value}, ${this.background.get(0).value}`
    })`;
  }
}
export default new Store();
// Stripe Opacity or RGBA / Stripe numbers / cache generated grid positions / ui gradients random
