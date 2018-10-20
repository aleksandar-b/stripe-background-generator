import React from 'react';
import propTypes from 'prop-types';
import chroma from 'chroma-js';
import { coinFlip } from '../../utils/Helpers';
// import { coinFlip } from '../../utils/Helpers';

const CirclesGroup = ({ palette, circles = 5, size = 10, position = 'center' }) => {
  const positions = {
    topLeft: { cx: '0', cy: '0' },
    bottomLeft: { cx: '0', cy: '100%' },
    bottomRight: { cx: '100%', cy: '100%' },
    topRight: { cx: '100%', cy: '0%' },
    center: { cx: '50%', cy: '50%' },
  };

  const scaled = chroma.scale(palette.map(c => c.standard)).colors(circles);

  return scaled.reverse().map((color, idx) => {
    return (
      <circle
        r={`${(scaled.length - idx + 1) * size}%`}
        stroke={color}
        className="puls"
        style={{
          animation: `circle-small-scale 3s ease-in-out ${(scaled.length - 1 - idx) * 0.3}s infinite alternate`,
        }}
        fill={coinFlip() ? color : 'none'}
        {...positions[position]}
      />
    );
  });
};

CirclesGroup.propTypes = {
  width: propTypes.number.isRequired,
  fill: propTypes.string.isRequired,
  stroke: propTypes.string.isRequired,
};

export default CirclesGroup;
