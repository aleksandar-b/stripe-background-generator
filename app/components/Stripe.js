import React from 'react';

const getStyles = ({ height, width, top, left, r, stroke, fill, opacity }) => {
  return {
    x: `${left}%`,
    y: `${top}%`,
    width: `${width}%`,
    height: `${height}%`,
    translate: `0, -${height}%`,
    opacity,
    stroke,
    strokeWidth: 1.5,
    fill,
    rx: r / 2,
    ry: r / 2,
  };
};

const Stripe = props => {
  return <rect {...getStyles(props)} />;
};

Stripe.defaultProps = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  opacity: 1,
  stroke: '#111111',
  color: '#fff',
  r: 0,
  stripeStyle: 'fill',
  forceWidth: 1,
};

export default Stripe;
