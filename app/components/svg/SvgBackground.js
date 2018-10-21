import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import Stripe from './Stripe';
import CirclesGroup from './CirclesGroup';

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

const SvgBackground = ({ store, store: { linearGradientBackground, randomGeneratedStripesSvg, circlePosition } }) => {
  return (
    <svg style={getStyles(linearGradientBackground)} xmlns="http://www.w3.org/2000/svg" version="1.1">
      <style>
        {store.circleAnimation &&
          `
        @-webkit-keyframes circle-small-scale {
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
           WebkitAnimation: circle-small-scale 3s ease-in-out infinite alternate;
           animation: circle-small-scale 3s ease-in-out infinite alternate;
           animationTimingFunction: cubic-bezier(.6, 0, .4, 1);
           transform-origin: center;
           `}
      </style>
      <defs>
        <filter id="drop-shadow" x="-100%" y="-50%" width="300%" height="300%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feFlood floodColor="#000000" floodOpacity=".2" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="shadow-gradient">
          <stop offset="0%" stopColor="rgba(0,0,0, .7)" />
          <stop offset="60%" stopColor="rgba(0,0,0, .1)" />
          <stop offset="99%" stopColor="rgba(0,0,0, .0)" />
        </linearGradient>
      </defs>
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
      <CirclesGroup
        palette={store.palette}
        size={store.circleSize}
        position={store.circlePosition}
        circles={store.circleQuantity}
        style={store.circleStyle}
        circleAnimation={store.circleAnimation}
      />
    </svg>
  );
};

SvgBackground.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject('store')(observer(SvgBackground));
