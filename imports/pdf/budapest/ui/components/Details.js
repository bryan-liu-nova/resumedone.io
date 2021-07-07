import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom, DetailsIcon } from '/imports/pdf/budapest/ui/atoms';

const ORDERED_DETAILS_FIELDS = [
  'postalCode',
  'address',
  'city'
];

class Details extends PureComponent {
  render() {
    const {
      details,
      details: {
        phone, email
      },
      settings: {
        color
      }
    } = this.props.resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    if(fields.length === 0 && !phone && !email) return null;
    return (
      <DetailsCont>
        {fields.length > 0 && (
          <DetailsItem>
            <DetailsIcon code="e90a" color={color} />
            <Text>{fields.map(f => details[f]).join(', ')}</Text>
          </DetailsItem>
        )}
        {phone && (
          <DetailsItem>
            <DetailsIcon code="e90c" color={color} />
            <Text>{phone}</Text>
          </DetailsItem>
        )}
        {email && (
          <DetailsItem>
            <DetailsIcon email code="e90b" color={color} />
            <Text>{email}</Text>
          </DetailsItem>
        )}
      </DetailsCont>
    );
  }
}

const DetailsCont = styled(View)`
  width: 42%;
`;

const Text = styled(TextAtom)`
  font-size: 10px;
  color: #76777a;
`;

const DetailsItem = styled(View)`
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
`;

export default Details;
