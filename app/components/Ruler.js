import React from 'react';

const Ruler = (props) => {
  return (
    <svg
      width="30px"
      height="100%"
      style={{
        opacity: 0.6, position: 'absolute', left: 0, ...props,
      }}
    >
      <defs>
        <pattern id="ruler" x="0" y="0" width="30" height="100px" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="30" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="5" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="10" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="15" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="20" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="25" width="10" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="30" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="35" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="40" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="45" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="50" width="20" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="55" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="60" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="65" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="70" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="75" width="10" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="80" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="85" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="90" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
          <rect x="0" y="95" width="5" height="1" style={{ stroke: 'none', fill: '#fff' }} />
        </pattern>
      </defs>
      <rect x="0" y="0" width="30px" height="100%" style={{ stroke: 'none', fill: 'url(#ruler)' }} />
    </svg>
  );
};

export default Ruler;
