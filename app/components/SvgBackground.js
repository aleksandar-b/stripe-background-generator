import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import Stripe from './Stripe';

const getStyles = (linearGradientBackground) => {
  return {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    transform: 'skewY(-12deg)',
    transformOrigin: 0,
    background: linearGradientBackground,
  };
};

const SvgBackground = ({
  store: {
    linearGradientBackground, randomGeneratedStripes, stripeSize, stripeStyle,
  },
}) => {
  return (
    <svg style={getStyles(linearGradientBackground)} xmlns="http://www.w3.org/2000/svg" version="1.1">
      <g>
        {randomGeneratedStripes.map(({ value, position }) => {
          return (
            <Stripe
              color={value}
              key={Math.random()}
              stripeStyle={stripeStyle}
              forceWidth={stripeSize}
              {...position}
            />
          );
        })}
      </g>
    </svg>
  );
};

SvgBackground.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject('store')(observer(SvgBackground));
