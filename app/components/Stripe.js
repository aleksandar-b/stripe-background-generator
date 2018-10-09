import React from 'react';

const getStyles = ({ height, width, color, top, left, r, forceWidth, stripeStyle, fill }) => {
  return {
    x: `${left}%`,
    y: `${top}%`,
    width: `${width * forceWidth}%`,
    height: `${height}%`,
    translate: `0, -${height}%`,
    opacity: '1',
    stroke: color,
    fill: stripeStyle === 'fill' ? color : 'none',
    ...(stripeStyle === 'mixed' && { fill }),
    rx: r,
    ry: r,
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
  color: '#fff',
  r: 0,
  stripeStyle: 'fill',
  forceWidth: 1,
};

export default Stripe;
