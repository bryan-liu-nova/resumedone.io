import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { Button, Icon } from '/imports/core/ui/atoms';
import history from '/imports/core/api/history';

class PreviewButton extends PureComponent {
  state = {
    expanded: false,
    prevScroll: 0,
    direction: 'UP'
  };

  componentDidMount() {
    window.addEventListener('scroll', this.trackScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.trackScroll);
  }

  trackScroll = () => {
    const form = window;
    const scrollPos = form.pageYOffset || form.scrollTop || form.scrollY;
    if (scrollPos < 0 || scrollPos > (document.documentElement.scrollHeight - window.innerHeight)) return;
    if (this.state.prevScroll > scrollPos && this.state.direction !== 'UP') {
      this.setState({ direction: 'UP', prevScroll: scrollPos });
    } else if (this.state.prevScroll < scrollPos && this.state.direction !== 'DOWN') {
      this.setState({ direction: 'DOWN', prevScroll: scrollPos });
    } else {
      this.setState({ prevScroll: scrollPos });
    }
  };

  goTo = () => history.push(`/resume/${this.props.resumeId}/preview`);

  render() {
    const { direction } = this.state;
    return (
      <ButtonStyled direction={direction} onClick={this.goTo}>
        <span>Preview & Download</span> <Icon icon="file" />
      </ButtonStyled>
    );
  }
}

const ButtonStyled = styled(Button)`
   position: fixed;
   right: ${p => p.theme.general.mobilePadding};
   bottom: ${p => p.theme.general.mobilePadding};
   height: 60px;
   width: 60px;
   overflow: hidden;
   // transition: ${p => p.theme.transitions.medium};
   border-radius: 100px;
   i {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    font-size: 24px;
   }
   span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 155px;
    opacity: 0;
    visibility: hidden;
    // transition: ${p => p.theme.transitions.medium};
    right: 50px;
   }
   ${p => p.direction === 'UP' && css`
     width: 228px;
     span {
      opacity: 1;
      visibility: visible;
     }
  `}
`;

export default PreviewButton;
