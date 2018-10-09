/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { observer, inject } from 'mobx-react';
import SvgBackground from './SvgBackground';

class TabCode extends Component {
  render() {
    const { store } = this.props;
    const {
      store: { palette },
    } = this.props;

    console.log('render to string', palette);
    return (
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        <code>{renderToString(<SvgBackground store={store} palette={palette} />)}</code>
      </pre>
    );
  }
}

export default inject('store')(observer(TabCode));
