import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled, { css } from 'styled-components';

import {
  Text as TextAtom,
  BlockNestedItem,
  BlockSubHeader,
  DetailsRight,
  DetailsLeft,
  Filler
} from '/imports/pdf/santiago/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, company } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <TitleContainer>
          <Filler long references />
          <TitleLeft>
            <Title>{title}</Title>
          </TitleLeft>
          <DetailsRight>
            <Phone>
              {phone}
            </Phone>
          </DetailsRight>
          {
            email &&
            <EmailContainer>
              <Info>
                {email}
              </Info>
            </EmailContainer>
          }
        </TitleContainer>
        <AdditionalInfo>
        {
          company &&
            <DetailsLeft>
              <Info company>
                {company}
              </Info>
            </DetailsLeft>
        }
        </AdditionalInfo>
      </BlockNestedItem>
    );
  }
}

const Phone = styled(TextAtom)`
  font-size: 9pt;
  background: #fff;
  padding-left: 4px;
`;

const Info = styled(TextAtom)`
  font-size: 9pt;
  text-align: right;
  ${p => p.company && css`
    font-family: 'CrimsonText Italic';
    font-size: 10pt;
    text-align: left;
  `}
`;

const TitleContainer = styled(View)`
  position: relative;
  height: 18pt;
`;

const AdditionalInfo = styled(View)`
  position: relative;
  height: 14pt;
  margin-bottom: 0;
`;

const EmailContainer = styled(View)`
  postition: absolute;
  bottom: -16pt;
  right: 0;
`;

const Title = styled(BlockSubHeader)`
  font-size: 10pt;
  background: #fff;
  padding-right: 6px;
`;

const TitleLeft = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding-right: 4pt;
`;

export default RangeActivityDisplay;
