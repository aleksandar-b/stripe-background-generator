/* eslint-disable react/prop-types */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { inject, observer } from 'mobx-react';
import SvgBackground from './SvgBackground';

function TabCode(props) {
  const { store } = props;
  return (
    <pre style={{ whiteSpace: 'pre-wrap' }}>
      <code>{renderToString(<SvgBackground store={store} />)}</code>
    </pre>
  );
}

export default inject('store')(observer(TabCode));
