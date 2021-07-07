import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import '../../../../public/css/all.min.css';

const CTAContainer = styled.a.attrs({
  className: 'b-hero__btn'
})`
  &:before,
  &:after,
  .b-hero__btn-inner:before,
  .b-hero__btn-inner:after,
  .b-hero__btn-inner-2 {
    background: ${({ variant }) => {
      if (variant == '0') return '#d4472f !important';
      if (variant == '1') return '#f37101 !important';
      if (variant == '2') return '#f37101 !important';
      if (variant == '3') return '#f37101 !important';
      if (variant == '4') return '#2274b0 !important';
      if (variant == '5') return '#77b300 !important';
      if (variant == '6') return '#2274b0 !important';
    }};
  }

  .b-hero__btn-inner-2 {
    box-shadow: ${({ variant }) => {
      if (variant == '0') return '0 20px 60px 0 rgba(212,71,47,0.3) !important';
      if (variant == '1') return '0 20px 60px 0 rgba(243,113,1,0.3) !important';
      if (variant == '2') return '0 20px 60px 0 rgba(243,113,1,0.3) !important';
      if (variant == '3') return '0 20px 60px 0 rgba(243,113,1,0.3) !important';
      if (variant == '4') return '0 20px 60px 0 rgba(34,116,176,0.3) !important';
      if (variant == '5') return '0 20px 60px 0 rgba(119,179,0,0.3) !important';
      if (variant == '6') return '0 20px 60px 0 rgba(34,116,176,0.3) !important';
    }};
  }

  &:hover {
    &:after {
      width: 120px !important;
    }

    .b-hero__btn-inner-2 {
      box-shadow: ${({ variant }) => {
        if (variant == '0') return '0 20px 60px 0 rgba(212,71,47,.5) !important';
        if (variant == '1') return '0 20px 60px 0 rgba(243,113,1,.5) !important';
        if (variant == '2') return '0 20px 60px 0 rgba(243,113,1,.5) !important';
        if (variant == '3') return '0 20px 60px 0 rgba(243,113,1,.5) !important';
        if (variant == '4') return '0 20px 60px 0 rgba(34,116,176,.5) !important';
        if (variant == '5') return '0 20px 60px 0 rgba(119,179,0,.5) !important';
        if (variant == '6') return '0 20px 60px 0 rgba(34,116,176,.5) !important';
      }};
    }
  }
`;

export default ({ onClick, variant }) => (
  <CTAContainer onClick={onClick} variant={variant}>
    <span className="b-hero__btn-inner">
      <span className="b-hero__btn-inner-2">
        <span className="b-hero__btn-text">Create my CV</span>
      </span>
    </span>
  </CTAContainer>
);
