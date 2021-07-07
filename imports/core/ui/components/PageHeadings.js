import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Heading, Text } from '/imports/core/ui/atoms';

class PageHeadings extends PureComponent {
  render() {
    return (
      <Section>
        <PageTitle white>{this.props.title}</PageTitle>
        <PageSubTitle color="white" align="center">
          {this.props.subtitle}
        </PageSubTitle>
      </Section>
    );
  }
}

const Section = styled.section`
  text-align: center;
  padding: 30px 0;
  position: relative;
  z-index: 999;
  ${({ theme }) => theme.max('xs')`
    padding-bottom: 15px;
  `}
`;

const PageTitle = styled(p => <Heading level={3} {...p} />)`
  font-family: ${p => p.theme.font.family.header};
  font-size: 40px;
  margin: 0;
  text-align: center;
  && {
    color: ${p => p.white ? 'white' : p.theme.colors.black};
  }
  ${({ theme }) => theme.max('xs')`
    font-size: 31px;
  `}
`;

const PageSubTitle = styled(Text)`
  font-family: ${p => p.theme.font.family.text};
  font-size: ${({ theme }) => theme.font.size.h6};
  line-height: ${({ theme }) => theme.font.lineHeight.base};
  padding: 0 10px;
  ${({ theme }) => theme.max('xs')`
    padding: 0 15px;
  `}
`;

export default PageHeadings;