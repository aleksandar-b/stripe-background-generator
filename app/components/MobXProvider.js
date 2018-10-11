import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import AppWrapper from './AppWrapper';
import Store from './Store';
import GradientStore from './GradientsStore';

class MobXProvider extends Component {
  render() {
    return (
      <Provider store={Store} gradientStore={GradientStore}>
        <AppWrapper />
      </Provider>
    );
  }
}

export default MobXProvider;
