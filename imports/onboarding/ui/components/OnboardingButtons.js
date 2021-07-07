import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Flex, Link } from '/imports/core/ui/atoms';
import { OnboardingButton } from '/imports/onboarding/ui/atoms';
import { rgba } from 'polished';

class OnboardingButtons extends PureComponent {
  static propTypes = {
    goBack: PropTypes.func.isRequired,
    back: PropTypes.string,
    next: PropTypes.string,
  };

  static defaultProps = {
    back: 'Back',
    next: 'Next',
  };

  goBack = (e) => {
    e.preventDefault();
    if (this.props.goBack) {
      this.props.goBack();
    }
  };

  goNext = () => {
    if (this.props.goNext) {
      this.props.goNext();
    }
  };

  render() {
    const { back, next } = this.props;
    return (
      <Flex>
        <Left>
          <ButtonLink onClick={this.goBack} outline>{back}</ButtonLink>
        </Left>
        <Right>
          <OnboardingButton fullWidth type="submit" onClick={this.goNext}>{next}</OnboardingButton>
        </Right>
      </Flex>
    );
  }
}

const Left = styled.div`
  display: flex;
  margin: 12px 12px 0 0;
  text-align: left;
  flex: 1
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-weight: 400;
  text-align: center;
  border: 2px solid transparent;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.font.size.h6};
  line-height: 1;
  cursor: pointer;
  padding: 14px 32px;
  text-decoration: none !important;
  ${({ outline }) => outline && css`
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    border-color: ${({ theme }) => theme.colors.primary};
    &:hover {
     color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => rgba(theme.colors.primary, 0.1)};
    }
  `}
`;

const Right = styled.div`
  display: flex;
  margin: 12px 0 0 12px;
  text-align: right;
  flex: 1
`;

export default OnboardingButtons;
