import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import Stripe from './Stripe';
import CirclesGroup from './CirclesGroup';

const getStyles = linearGradientBackground => {
  return {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    transformOrigin: 0,
    background: linearGradientBackground,
  };
};

const SvgBackground = ({
  store,
  store: { linearGradientBackground, randomGeneratedStripesSvg, circlePosition, circlesGroup },
}) => {
  return (
    <svg style={getStyles(linearGradientBackground)} xmlns="http://www.w3.org/2000/svg" version="1.1">
      <style>
        {circlesGroup.some(({ circleAnimation }) => circleAnimation) &&
          `
        @-webkit-keyframes circle-small-scale {
          0% {
            -webkit-transform: scale(1);
          }
          100% {
            -webkit-transform: scale(1.1);
          }
        }
        @-moz-keyframes circle-small-scale {
          0% {
            -webkit-transform: scale(1);
          }
          100% {
            -webkit-transform: scale(1.1);
          }
        }
        @keyframes circle-small-scale {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .puls{
           -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
           -moz-animation: circle-small-scale 3s ease-in-out infinite alternate;
           animation: circle-small-scale 3s ease-in-out infinite alternate;
           animationTimingFunction: cubic-bezier(.6, 0, .4, 1);
           transform-origin: center;
           `}
      </style>
      <g>
        {randomGeneratedStripesSvg.map(({ position, width, fill, stroke }) => {
          return (
            <Stripe
              key={Math.random()}
              {...position}
              circlePosition={circlePosition}
              stroke={stroke}
              width={width}
              fill={fill}
              r={store.stripeRound}
              opacity={store.opacity}
            />
          );
        })}
      </g>
      {circlesGroup.map(group => (
        <CirclesGroup
          key={group.id}
          palette={store.palette}
          size={group.circleSize}
          position={group.circlePosition}
          circles={group.circleQuantity}
          style={group.circleStyle}
          circleAnimation={group.circleAnimation}
        />
      ))}
    </svg>
  );
};

SvgBackground.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject('store')(observer(SvgBackground));
