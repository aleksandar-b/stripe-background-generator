import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import Stripe from './Stripe';

const getStyles = linearGradientBackground => {
  return {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    transform: 'skewY(-12deg)',
    transformOrigin: 0,
    background: linearGradientBackground,
  };
};

const SvgBackground = ({ store: { linearGradientBackground, randomGeneratedStripes } }) => {
  return (
    <svg style={getStyles(linearGradientBackground)} xmlns="http://www.w3.org/2000/svg" version="1.1">
      <g>
        {randomGeneratedStripes.map(({ value, position, stripeStyle, stripeSize, fill, forceWidth }) => {
          return (
            <Stripe
              color={value}
              key={Math.random()}
              {...position}
              stripeStyle={stripeStyle}
              stripeSize={stripeSize}
              fill={fill}
              forceWidth={forceWidth}
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
