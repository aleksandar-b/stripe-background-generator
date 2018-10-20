import React from 'react';
import { coinFlip } from '../../utils/Helpers';

const getAttributes = ({ height, width, top, left, r, stroke, fill }) => {
  return {
    x: `${left}%`,
    y: `${top}%`,
    width: `${width}%`,
    height: `${height}%`,
    translate: `0, -${height}%`,
    stroke,
    fill,
    ...(r && { rx: r / 2 }),
    ...(r && { ry: r / 2 }),
  };
};

const Stripe = props => {
  const attributes = getAttributes(props);
  const { circlePosition } = props;

  return coinFlip() ? (
    <rect {...attributes} />
  ) : (
    circlePosition !== 'none' && (
      <circle
        r={attributes.width}
        stroke={circlePosition === 'none' ? 'none' : attributes.stroke}
        fill={circlePosition === 'none' ? 'none' : attributes.fill}
        cx={circlePosition === 'random' ? attributes.x : 0}
        cy={circlePosition === 'random' ? attributes.x : 0}
      />
    )
  );
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
