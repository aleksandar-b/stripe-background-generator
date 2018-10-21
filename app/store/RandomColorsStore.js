import { observable, action, computed } from 'mobx';
import chroma from 'chroma-js';
import { head } from 'ramda';
import { random } from '../utils/Helpers';
import Store from './Store';

class RandomColorsStore {
  @observable
  gradients = [];

  mapGradients = gradients => {
    return gradients.map(gradient => {
      return gradient.colors.map(hex => {
        const color = chroma(hex);
        const [r, g, b, a] = color.rgba();
        return { id: Math.random(), value: { r, g, b, a }, standard: color.css(), name: gradient.name };
      });
    });
  };

  @action
  fetchGradients() {
    return window
      .fetch('https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json')
      .then(response => response.json())
      .then(gradients => {
        return this.setGradients(this.mapGradients(gradients));
      });
  }

  @action
  setGradients(gradients) {
    this.gradients = gradients;
  }

  colorModelFromHex = hex => {
    const color = chroma(hex);
    const [r, g, b, a] = color.rgba();
    return { id: Math.random(), value: { r, g, b, a }, standard: color.css() };
  };

  getRandomPaletteFromChroma = () => chroma.brewer[Object.keys(chroma.brewer)[random(0, Object.keys(chroma.brewer).length)]];

  buildPalette = palette => palette.map(hex => this.colorModelFromHex(hex));

  @action
  setRandomBackgroundAndPaletteFromChroma() {
    const chromaPalette = this.getRandomPaletteFromChroma();

    const palette = this.buildPalette(chroma.scale(chromaPalette).colors(Math.floor(Store.rows / 3)));
    const backgroundPalette = this.buildPalette([head(chromaPalette)]);

    Store.setPalette(palette);
    Store.setBackgroundPalette(backgroundPalette);
  }

  generatePaletteFromUiGradients = randomGradients => {
    return chroma
      .scale(randomGradients.map(({ standard }) => standard))
      .domain([0, 0.25])
      .mode('lrgb')
      .colors(6)
      .map(hex => this.colorModelFromHex(hex));
  };

  @action
  setRandomBackgroundAndPaletteFromGradients() {
    const randomGradients = this.gradients[random(0, this.gradients.length - 1)];
    Store.currentBackgroundName = randomGradients[0].name;
    Store.setBackgroundPalette(randomGradients);
    Store.setPalette(this.generatePaletteFromUiGradients(randomGradients));
  }

  @computed
  get getGradients() {
    return this.gradients;
  }
}

export default new RandomColorsStore();
