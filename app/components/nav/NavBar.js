import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import chroma from 'chroma-js';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const NavBar = props => {
  const {
    classes,
    store: { headOfPalette },
  } = props;

  const color = value => (chroma(value).luminance() > 0.5 ? '#000' : '#fff');
  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            className={classes.grow}
            style={{ fontWeight: 300, fontFamily: 'Apercu,Helvetica Neue,Helvetica,Arial,sans-serif' }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'Apercu,Helvetica Neue,Helvetica,Arial,sans-serif',
                  color: color(headOfPalette).standard,
                }}
              >
                Background Stripe Generator
              </span>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(inject('store')(observer(NavBar)));
