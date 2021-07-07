import React from 'react';
import styled from 'styled-components';
import { CARD_LOGOS } from '/imports/checkout/api/constants';

const CardLogoImg = styled(p => (
  <img
    alt="card logo"
    src={
      CARD_LOGOS[p.brand.toLowerCase()]
        ? CARD_LOGOS[p.brand.toLowerCase()]
        : CARD_LOGOS.visa
    }
    {...p}
  />
))`
  position: absolute;
  height: 25px;
  right: 10px;
  bottom: 0;
  top: 0;
  margin: auto;
`;

export default CardLogoImg;
