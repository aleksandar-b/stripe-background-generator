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

const SvgBackground = ({ store, store: { linearGradientBackground, randomGeneratedStripesSvg } }) => {
  return (
    <svg style={getStyles(linearGradientBackground)} xmlns="http://www.w3.org/2000/svg" version="1.1">
      <g>
        {randomGeneratedStripesSvg.map(({ position, width, fill, stroke }) => {
          return (
            <Stripe
              key={Math.random()}
              {...position}
              stroke={stroke}
              width={width}
              fill={fill}
              r={store.stripeRound}
              opacity={store.opacity}
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
