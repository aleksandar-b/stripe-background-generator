/* eslint-disable react/prop-types */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button/Button';
import Icon from '@material-ui/core/Icon/Icon';
import SvgBackground from '../svg/SvgBackground';

function TabCode(props) {
  const { store } = props;

  return (
    <div style={{ overflow: 'hidden' }}>
      <CopyToClipboard text={renderToString(<SvgBackground store={store} />)} onCopy={() => store.toggleSnackBar()}>
        <Button variant="contained" size="large" color="primary" style={{ width: '100%' }}>
          <Icon>file_copy_icon</Icon>
          Copy Svg
        </Button>
      </CopyToClipboard>
    </div>
  );
}

export default inject('store')(observer(TabCode));
