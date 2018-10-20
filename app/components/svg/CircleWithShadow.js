import React from 'react';
import propTypes from 'prop-types';

const CircleWithShadow = props => {
  const { height, left, top, rectAttributes } = props;
  return (
    <g style={{ transform: 'rotate(40deg)', transformOrigin: 'center' }}>
      <rect {...rectAttributes} fill="url(#shadow-gradient)" stroke="url(#shadow-gradient)" width={80} />
      <circle
        r={`${height / 4}%`}
        cx={`${left + height / 8}%`}
        cy={`${top + height / 2}%`}
        fill="white"
        stroke="none"
        strokeWidth={4}
      />
    </g>
  );
};

CircleWithShadow.propTypes = {
  rectAttributes: propTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  height: propTypes.number.isRequired,
  left: propTypes.number.isRequired,
  top: propTypes.number.isRequired,
};

CircleWithShadow.defaultProps = {};

export default CircleWithShadow;
