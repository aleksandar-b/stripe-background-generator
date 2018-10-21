import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { inject, observer, PropTypes } from 'mobx-react';

const SnackBar = ({ store }) => {
  const { isCopied } = store;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isCopied}
      autoHideDuration={1000}
      onClose={() => store.toggleSnackBar()}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span>Copied!</span>}
    />
  );
};

SnackBar.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

SnackBar.defaultProps = {};

export default inject('store')(observer(SnackBar));
