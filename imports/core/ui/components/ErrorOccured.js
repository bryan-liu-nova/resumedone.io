import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { Heading, Text, Link } from '/imports/core/ui/atoms';

class ErrorOccured extends PureComponent {
  render() {
    console.log(this.props.error);
    return (
      <ErrorCont>
        <Heading>Unexpected error occured:(</Heading>
        <Text>
          We are already notified, and will solve the issue as soon as possible, but if you have
          something to add , please contact the support team here:{' '}
          <Link href="mailto:support@resumedone.io">support@resumedone.io</Link>
        </Text>
      </ErrorCont>
    );
  }
}

const ErrorCont = styled.div`
  background: ${props => rgba(props.theme.colors.danger, 0.1)};
  border: ${props => props.theme.general.borderWidth} solid ${props => props.theme.colors.danger};
  margin: 20px;
  padding: 20px;
  text-align: center;
`;

export default ErrorOccured;
