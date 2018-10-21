import { observable, action, computed } from 'mobx';
import { flatten, repeat, last, head } from 'ramda';
import chroma from 'chroma-js';
import Grid from '../utils/Grid';
import { coinFlip, random } from '../utils/Helpers';
import Color from '../model/Color';
import Stripe from '../model/Stripe';

class Store {
  @observable
  grid = {
    columns: 10,
    rows: 10,
    gap: 10,
  };

  @observable
  background = [new Color({ r: 240, g: 240, b: 240, a: 1 })];

  @observable
  stripes = [
    new Stripe(1, 3, 2, 3, [new Color({ r: 23, g: 54, b: 1, a: 1 }), new Color({ r: 123, g: 154, b: 100, a: 1 })]),
    new Stripe(4, 6, 3, 4, [
      new Color({ r: 23, g: 54, b: 1, a: 1 }),
      new Color({ r: 223, g: 154, b: 100, a: 1 }),
      new Color({ r: 123, g: 154, b: 100, a: 1 }),
    ]),
    new Stripe(7, 9, 6, 8, [
      new Color({ r: 165, g: 124, b: 100, a: 1 }),
      new Color({ r: 123, g: 154, b: 100, a: 1 }),
      new Color({ r: 123, g: 154, b: 100, a: 1 }),
    ]),
  ];

  @action
  resetStripes() {
    this.stripes = chroma
      .bezier([chroma.random(), chroma.random(), chroma.random()])
      .scale()
      .colors(10)
      .map((hex, idx) => {
        const [r, g, b, a] = chroma(hex).rgba();
        return new Stripe(random(0, this.grid.columns), random(0, this.grid.columns), 2 + idx, 3 + idx, [
          new Color({ r, g, b, a }),
        ]);
      });
  }

  @observable
  palette = [
    new Color({ r: 23, g: 54, b: 1, a: 1 }),
    new Color({ r: 23, g: 54, b: 1, a: 1 }),
    new Color({ r: 23, g: 224, b: 216, a: 1 }),
  ];

  @observable
  isTabsOpen = false;

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

  @observable
  showCirclesSection = true;

  @observable
  circlesGroup = [
    {
      id: Math.random(),
      circlePosition: 'center',
      circleSize: 10,
      circleQuantity: 5,
      circleStyle: 'mixed',
      circleAnimation: true,
    },
  ];

  @observable
  isCopied = false;

  @observable
  isRectangular = true;

  @action
  setPalette(palette) {
    this.palette = palette;
  }

  @action
  addPalette(color) {
    this.palette.push(new Color(color));
  }

  @action
  setBackgroundPalette(palettes) {
    this.background = palettes;
  }

  @action
  addBackgroundPalette(color) {
    this.background.push(new Color(color));
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

  @action
  toggleTabs() {
    this.isTabsOpen = !this.isTabsOpen;
  }

  @action
  forceRefreshPalette() {
    this.palette = this.palette.slice();
  }

  @action
  forceRefreshBackground() {
    this.background = this.background.slice();
  }

  @action
  forceRefresh() {
    this.forceRefreshPalette();
    this.forceRefreshBackground();
  }

  @action
  addCircleGroup() {
    this.circlesGroup.push({
      id: Math.random(),
      circlePosition: 'topLeft',
      circleSize: 5,
      circleQuantity: 5,
      circleStyle: 'fill',
      circleAnimation: true,
    });
  }

  @action
  deleteCircleGroup(idx) {
    this.circlesGroup.splice(idx, 1);
  }

  @action
  handleCirclePosition(data, idx) {
    this.circlesGroup[idx].circlePosition = data;
  }

  @action
  handleCircleSize(data, idx) {
    this.circlesGroup[idx].circleSize = data;
  }

  @action
  handleCircleQuantity(data, idx) {
    this.circlesGroup[idx].circleQuantity = data;
  }

  @action
  handleCircleStyle(data, idx) {
    this.circlesGroup[idx].circleStyle = data;
  }

  @action
  handleCircleAnimation(data, idx) {
    this.circlesGroup[idx].circleAnimation = !this.circlesGroup[idx].circleAnimation;
  }

  @computed
  get getPalette() {
    return this.palette;
  }

  @computed
  get headOfPalette() {
    return head(this.palette);
  }

  @computed
  get lastOfPalette() {
    return last(this.palette);
  }

  @action
  toggleSnackBar() {
    this.isCopied = !this.isCopied;
  }

  @action
  toggleRectangular() {
    this.isRectangular = !this.isRectangular;
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
