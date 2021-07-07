import React from 'react';
import styled, { css } from 'styled-components';
import { SvgIcon } from '/imports/core/ui/atoms';
import HeaderMobileNav from './HeaderMobileNav';
import MobileBack from './MobileBack';

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: relative;
  margin-top: 15px;
  z-index: 10;
`;

const Stripe = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  top: 30px;
  background-color: ${p => p.theme.colors.gray.lighter};
  border-radius: 100px;
  &:after {
    content: "";
    position: absolute;
    height: 100%;
    left: 0;
    width: calc(100% / (${p => p.length} * 2) * (${p => p.current} * 2 + 1));
    background-color: ${p => p.theme.colors.primary};
    border-radius: 100px;
  }
  ${({ theme }) => theme.max('xs')`
    height: 4px;
    top: 40px;
    &:after {
      background-color: ${p => p.theme.colors.secondary};
    }
  `}
`;

const HeaderItem = styled.div`
  position: relative;
  width: calc(100%/${p => p.length});
  text-align: center;
  color: ${p => p.isPassedText ? p.theme.colors.primary : p.theme.colors.gray.light};
  font-weight: normal;
  font-size: 12px;
  > div:nth-child(1) {
    text-transform: uppercase;
    margin-bottom: 10px;
    ${p => p.current && css`
      font-weight: 600;
    `}
  }
  > div:nth-child(2) {
    width: 10px;
    height: 10px;
    line-height: 26px;
    margin-left:auto;
    margin-right:auto;
    margin-bottom: 0;
    text-align: center;
    color: ${p => p.isPassedText ? 'white' : p.theme.colors.gray.regular};
    border-radius: 50%;
    background: #fff;
    border: 2px solid ${p => p.isPassed ? p.theme.colors.primary : p.theme.colors.gray.lighter};
  }
  > div {
    cursor: ${p => p.isPassed ? 'pointer' : 'default'};
  }
`;

export default ({
  isMobile,
  currentStepIndex,
  back,
  RESUME_ONBOARDING_STEPS,
  currentStep,
  currentProgressIndex,
  goTo
}) => (
  <Header>
    <Stripe
      length={RESUME_ONBOARDING_STEPS.length}
      current={currentProgressIndex}
    />
    {isMobile ?
      <HeaderMobileNav>
        <MobileBack onClick={back} hide={!currentStepIndex}><SvgIcon.BackMobile height="16px" viewBox="0 0 24 16" /></MobileBack>
        <div>{RESUME_ONBOARDING_STEPS[currentStepIndex].title}</div>
      </HeaderMobileNav>
      : RESUME_ONBOARDING_STEPS.map((step, i) => (
        <HeaderItem
          key={`step-${i}`}
          isPassed={i <= currentProgressIndex}
          isPassedText={currentStepIndex >= i}
          current={step.status === currentStep}
          length={RESUME_ONBOARDING_STEPS.length}
        >
          <div onClick={() => goTo(step.status)}>
            {step.title}
          </div>
          <div onClick={() => goTo(step.status)} />
        </HeaderItem>
      ))}
  </Header>
);
