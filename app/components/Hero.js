import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import SvgBackground from './SvgBackground';

const styles = {
  content: {
    flexGrow: 1,
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    height: '760px',
    overflow: 'auto',
  },
};

const Hero = ({ classes }) => {
  return (
    <main className={classes.content}>
      <SvgBackground />
    </main>
  );
};

Hero.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

Hero.defaultProps = {};

export default withStyles(styles)(Hero);
