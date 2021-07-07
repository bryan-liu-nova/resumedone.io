import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import '../../../../public/css/all.min.css';

export default styled.span.attrs({
  className: 'b-hero__heading-text_highlighted'
})`
  color: ${({ variant }) => {
    if (variant == '0') return '#d4472f !important';
    if (variant == '1') return '#2274b0 !important';
    if (variant == '2') return '#f37101 !important';
    if (variant == '3') return '#00b065 !important';
    if (variant == '4') return '#2274b0 !important';
    if (variant == '5') return '#2274b0 !important';
    if (variant == '6') return '#f37101 !important';
  }};
`;
