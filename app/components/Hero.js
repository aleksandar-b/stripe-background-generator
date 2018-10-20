import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import SvgBackground from './svg/SvgBackground';
// import GridCssBackground from './GridCssBackground';
import Intro from './Intro';
import ProductImage from './ProductImage';

const styles = {
  content: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '760px',
    width: '100vw',
    overflow: 'hidden',
  },
};

const Hero = ({ classes }) => {
  return (
    <main className={classes.content}>
      <SvgBackground />
      <Intro />
      <ProductImage />
    </main>
  );
};

Hero.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

Hero.defaultProps = {};

export default withStyles(styles)(Hero);
