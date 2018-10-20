import { toRgbString } from '../utils/Helpers';

export default class Color {
  constructor(value) {
    this.id = Math.random();
    this.value = value;
    this.standard = toRgbString(value);
  }
}
