import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  text: {
    backgroundImage: 'linear-gradient(90deg, #43c6ac, #f8ffae)',
  },
};

const NavBar = props => {
  const { classes } = props;

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
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg,#43c6ac,#f8ffae)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Background Stripe Generator
            </span>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(NavBar);
