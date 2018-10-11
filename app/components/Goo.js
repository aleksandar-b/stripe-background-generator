import React from 'react';

const Goo = props => {
  return (
    <svg {...props}>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
      <rect x="0" y="0" width="30px" height="100%" style={{ stroke: 'none', fill: 'url(#ruler)' }} />
    </svg>
  );
};

export default Goo;
