/* eslint-disable react/prop-types */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { inject, observer } from 'mobx-react';
import SvgBackground from '../svg/SvgBackground';

function TabCode(props) {
  const { store } = props;
  return (
    <div style={{ maxWidth: 200, overflow: 'none' }}>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{renderToString(<SvgBackground store={store} />)}</pre>
    </div>
  );
}

export default inject('store')(observer(TabCode));
