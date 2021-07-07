import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text } from '/imports/pdf/newYork/ui/atoms';

const ORDERED_ADDRESS_FIELDS = [
  'city',
  'postalCode',
  'country'
];

class TitleLine extends PureComponent {
  getAddress = () => {
    const { details } = this.props;
    if (ORDERED_ADDRESS_FIELDS.every(d => !details[d])) {
      return null;
    }
    const fields = ORDERED_ADDRESS_FIELDS.filter(f => details[f]);
    return  fields.map((f, i) => details[f]).join(', ');
  };

  render() {
    const { title, phone, city } = this.props;
    if(!title && !phone && !city) {
      return null;
      return (
      <TitleContainer>
        <Title isPlaceholder>
          {'Recruitment Officer     |     San Francisco, USA     |     415-202-0759'}
          </Title>
      </TitleContainer>
      );
    }
    let fields = [];
    if(title) fields.push(title);
    if(city) fields.push(this.getAddress());
    if(phone) fields.push(phone);
    return (
      <TitleContainer>
        <Title>
          {fields.join('     |     ')}
        </Title>
      </TitleContainer>
    );
  }
}

const Title = styled(Text)`
  font-size: 10.75pt;
  line-height: 1;
  color: #aeaeae;
`;

const TitleContainer = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export default TitleLine;
