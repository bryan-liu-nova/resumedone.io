import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { Text } from '/imports/core/ui/atoms';
import { ContentSection } from '/imports/checkout/ui/atoms';

class PaymentStatusMessage extends PureComponent {
  render() {
    return this.props.message ? (
      <ContentSectionMessage>
        <PaymentStatusText {...this.props}>
          {this.props.message}
        </PaymentStatusText>
      </ContentSectionMessage>
    ) : null;
  }
}

const PaymentStatusText = styled(p => <Text {...p} />)`
  background: #dfffe9;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.success};
  padding: 15px 20px;
  margin: 0;
  font-size: 15px;
  ${({ error, theme }) =>
    error &&
    css`
      color: ${theme.colors.danger};
      background: #ffdfdf;
    `}
`;

const ContentSectionMessage = styled(p => <ContentSection {...p} />)`
  padding: 35px 40px;
  ${({ theme }) => theme.max('xs')`
    padding: 25px 15px;
    border-radius: 0;
  `}
`;

export default PaymentStatusMessage;
