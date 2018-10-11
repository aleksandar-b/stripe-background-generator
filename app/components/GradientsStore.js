import { observable, action, computed } from 'mobx';
import chroma from 'chroma-js';
import { random } from '../utils/Helpers';
import Store from './Store';

class GradientsStore {
  @observable
  gradients = [];

  convertGradients = gradients => {
    const mapped = gradients.map(gradient => {
      return gradient.colors.map(hex => {
        const color = chroma(hex);
        const [r, g, b, a] = color.rgba();
        return { id: Math.random(), value: { r, g, b, a }, standard: color.css() };
      });
    });
    return mapped;
  };

  @action
  fetchGradients() {
    window
      .fetch('https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json')
      .then(response => response.json())
      .then(gradients => {
        this.setGradients(gradients);
      });
  }

  @action
  setGradients(gradients) {
    this.gradients = this.convertGradients(gradients);
  }

  generatePaletteFromUiGradients = randomGradients => {
    /*
     .mode('lrgb');
     .mode('lab');
     .mode('hsl');
     .mode('lch');
    */
    return chroma
      .scale(randomGradients.map(({ standard }) => standard))
      .domain([0, 0.25])
      .mode('lrgb')
      .colors(Math.floor(Store.rows / 2))
      .map(hex => {
        const color = chroma(hex);
        const [r, g, b, a] = color.rgba();
        return { id: Math.random(), value: { r, g, b, a }, standard: color.css() };
      });
  };

  @action
  setRandomBackgroundAndPaletteFromGradients() {
    const randomGradients = this.gradients[random(0, this.gradients.length)];
    Store.setBackgroundPalette(randomGradients);
    Store.setPalette(this.generatePaletteFromUiGradients(randomGradients));
  }

  @computed
  get getGradients() {
    return this.gradients;
  }
}

export default new GradientsStore();
