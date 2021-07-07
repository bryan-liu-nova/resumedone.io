import React, { PureComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { Button } from '/imports/core/ui/atoms';

class CheckoutButtonBig extends PureComponent {
  render() {
    return (
      <StyledButton {...this.props}>
        {this.props.children}
        {this.props.lock && (
          <LockIcon>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              attr="[object Object]"
              height="1em"
              width="1em"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
            </svg>
          </LockIcon>
        )}
        {this.props.spin && <Spinner />}
      </StyledButton>
    );
  }
}

const StyledButton = styled(p => <Button {...p} />)`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 40px;
  min-width: 290px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: none;
  font-size: ${({ theme }) => theme.font.size.h4};
  padding: 18px 20px 19px 0;
  padding-left: 35px;
  display: inline-block;
  margin-bottom: 10px;
  position: relative;
  color: #fff;
  font-family: ${({ theme }) => theme.font.family.arial};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
  ${p =>
    p.spin &&
    css`
      padding-left: 54px;
    `}
`;

const LockIcon = styled.span`
  position: absolute;
  top: 18px;
  left: 20px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const sweep = keyframes`
  0% {
  clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
}
  50% {
  clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);
}
  100% {
  clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);
}
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 10px solid #333;
  box-sizing: border-box;
  animation: ${sweep} 1s linear alternate infinite,
    ${rotate} 0.8s linear infinite;
  width: 34px;
  height: 34px;
  border-color: rgb(216, 237, 255);
  border-width: 3px;
  position: absolute;
  top: 11px;
  left: 11px;
`;

export default CheckoutButtonBig;
