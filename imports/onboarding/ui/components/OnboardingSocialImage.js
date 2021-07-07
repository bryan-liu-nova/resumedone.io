import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex, SpinFrame } from '/imports/core/ui/atoms';
import { OnboardingSocialIcon } from '/imports/onboarding/ui/atoms';

class OnboardingSocialImage extends PureComponent {
  static propTypes = {
    socials: PropTypes.array.isRequired,
  };

  render() {
    return (
      <ImageWrapper>
        <SocialImage>
          <SocialIcons>
            {this.props.socials.map((s, index) =>
              <OnboardingSocialIcon key={index} {...s} />)}
          </SocialIcons>
        </SocialImage>
      </ImageWrapper>
    );
  }
}


const ImageWrapper = styled(p =>
  <Flex alignItems="center" grow={1} justifyContent="center" {...p} />)`
  margin-right: 24px;
  ${({ theme }) => theme.max('md')`
    margin-right: 0;
    margin-bottom: 22px;
  `}
`;

const SocialImage = styled.div`
  width: 162px;
  height: 162px;
  background-image: url(/img/onboarding/social-background.svg);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
`;

const SocialIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${SpinFrame} 10s linear infinite
`;

export default OnboardingSocialImage;
