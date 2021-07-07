import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Image } from '/imports/core/ui/atoms';

class PaymentProviderIcon extends PureComponent {
  render() {
    return (
      <PaymentProviderButton onClick={this.props.handleClick}>
        {this.props.src.map((img, index) => (
          <ImageSmall src={img.src} height={img.height} key={index} />
        ))}
      </PaymentProviderButton>
    );
  }
}

const ImageSmall = styled(Image)`
  float: left;
  margin-right: 4px;
`;

const PaymentProviderButton = styled.div`
  float: left;
  padding: 0 5px 15px 5px;
  cursor: pointer;
  margin-right: 20px;
`;

export default PaymentProviderIcon;
