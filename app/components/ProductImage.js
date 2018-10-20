import React from 'react';
import styled from 'styled-components';
import img from '../assets/images/devices.png';

const ProductImage = styled.div`
  position: absolute;
  top: 100px;
  left: 55%;
  right: 0;
  margin: 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

export default () => (
  <ProductImage>
    <img style={{ transform: 'rotate(-12deg)' }} alt="Devices" src={img} />
  </ProductImage>
);
