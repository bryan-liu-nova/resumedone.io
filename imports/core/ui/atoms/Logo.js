import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Box, Link } from '/imports/core/ui/atoms';

class Logo extends PureComponent {
  render() {
    return (
      <TopHeader href="#">
        <Box>
          LeCVparfait
        </Box>
      </TopHeader>
    );
  }
}

const TopHeader = styled(p => <Link {...p} />)`
  text-align: left;
  font-size: 1.875rem;
  line-height: 3rem;
  color: #ffffff;
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.family.tahoma};
  ${({ theme }) => theme.max('sm')`
    padding-top: 8px;
  `}
  display: inline-block;
  ${({ theme }) => theme.max('xs')`
    font-size: 1.5rem;
    line-height: 2.4rem;
    padding-bottom: 2.375rem;
  `}
`;

export default Logo;