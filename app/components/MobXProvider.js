import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import AppWrapper from './AppWrapper';
import Store from './Store';

class MobXProvider extends Component {
  render() {
    return (
      <Provider store={Store}>
        <AppWrapper />
      </Provider>
    );
  }
}

export default MobXProvider;
