/* eslint-disable react/prop-types */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button/Button';
import Icon from '@material-ui/core/Icon/Icon';
import SvgBackground from '../svg/SvgBackground';

function TabCode(props) {
  const { store } = props;
  return (
    <div style={{ maxWidth: 200, overflow: 'none' }}>
      <Button variant="contained" size="large" color="primary" fullWidth>
        <Icon>file_copy_icon</Icon>
        Copy Svg
      </Button>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{renderToString(<SvgBackground store={store} />)}</pre>
    </div>
  );
}

export default inject('store')(observer(TabCode));
