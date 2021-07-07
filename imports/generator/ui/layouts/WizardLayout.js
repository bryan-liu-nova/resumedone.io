import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { darken } from 'polished';
import PropTypes from 'prop-types';
import animateScrollTo from 'animated-scroll-to';

import { Button, Flex, SvgIcon, Image } from '/imports/core/ui/atoms';
import { RESUME_ONBOARDING_STEPS } from '/imports/generator/api/onboarding';
import history from '/imports/core/api/history';
import WizardModal from '/imports/generator/ui/components/WizardModal';
import { needPopup } from '/imports/generator/api/helpers';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import MobileItemContent from '../components/MobileItemContent';
import { UPDATE_WIZARD_STEPS } from '/imports/generator/api/apollo/client/mutations';
import { Analytics } from '/imports/core/api/analytics';

const getMandatoryFieldName = pathname => {
  if (pathname.match('start')) return 'mandatory_field_heading';
  else if (pathname.match('experience')) return 'mandatory_field_xp';
  else if (pathname.match('education')) return 'mandatory_field_education';
  return '';
};

const getPopupEventName = (pathname, num) => {
  if (pathname.match('experience') && !num) return 'popup_no_xp';
  if (pathname.match('experience') && num === 1) return 'popup_one_xp';
  else if (pathname.match('experience')) return 'popup_one_xp';
  else if (pathname.match('education')) return 'popup_no_educ';
  else if (pathname.match('skills')) return 'popup_no_skills';
  else if (pathname.match('summary')) return 'popup_no_summary';
  return '';
};

@withAccount
@withRouter
@graphql(UPDATE_WIZARD_STEPS, { name: 'updateSteps' })
class WizardLayout extends PureComponent {
  static propTypes = {
    isFormValid: PropTypes.func,
  };

  state = {
    modalOpen: false,
    num: 0
  };

  toggleModal = (num) => {
    this.setState(st => ({ modalOpen: !st.modalOpen, num }));
  };

  componentDidMount() {
    // const { match: { params: { intro } } } = this.props;
    // if(intro && intro === 'intro'){
    //   this.enterRef.focus();
    // }
    this.checkStep();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.step !==
      prevProps.match.params.step
    ) {
      window.scrollTo(0, 0);
      this.checkStep();
    }
  }

  checkStep = () => {
    const { match: { params: { step, resumeId } }, updateSteps, resume: { currentStep, steps } } = this.props;
    if (!steps.some(st => st === step) || step !== currentStep) {
      updateSteps({
        variables: {
          docId: resumeId,
          value: step,
        },
      });
    }
  };

  back = () => {
    const { match: { params: { step, resumeId } } } = this.props;
    const currentStepIndex = RESUME_ONBOARDING_STEPS.findIndex(i => i.status === step);
    localStorage.removeItem('resumedone:from-finalize');
    if (currentStepIndex) {
      history.push(`/resume/${resumeId}/${RESUME_ONBOARDING_STEPS[currentStepIndex - 1].status}`);
    }
  };

  next = () => {
    const { match: { params: { step, resumeId, intro } } } = this.props;
    const currentStepIndex = RESUME_ONBOARDING_STEPS.findIndex(i => i.status === step);
    const nextStepIndex = RESUME_ONBOARDING_STEPS[currentStepIndex + 1];
    const nextStep = nextStepIndex ? nextStepIndex.status : 'preview';
    if(this.props.onSubmit) this.props.onSubmit();
    localStorage.removeItem('resumedone:from-finalize');
    let urlAdd = (nextStepIndex && nextStepIndex.intro) && !intro ? '/intro' : '';
    if (intro && intro === 'intro') {
      history.push(`/resume/${resumeId}/${step}`);
    } else {
      history.push(`/resume/${resumeId}/${nextStep}${urlAdd}`);
    }
  };

  popupNext = async () => {
    const { resume, match: { params }, location: { pathname }, isFormValid } = this.props;
    if (isFormValid) {
      const valid = await isFormValid();
      if (!valid) {
        const input = document.querySelector('[data-error]').parentNode.firstChild.firstChild;
        animateScrollTo(input, { offset: -200 });
        Analytics.track(getMandatoryFieldName(pathname));
        input.focus();
        return;
      }
    }
    if (needPopup(resume, params)) {
      const { step } = params;
      let num = 0;
      if(step === 'experience') {
        const { blocks } = resume;
        const block = blocks.find(b => b.type === 'EMPLOYMENT');
        num = block && block.items && block.items.length;
      }
      Analytics.track(getPopupEventName(pathname, num));
      this.toggleModal(num);
    } else {
      this.next();
    }
  };

  goTo = nextStep => {
    const { match: { params: { step, resumeId } }, resume: { steps } } = this.props;
    if (!steps.some(st => st === nextStep)) return false;
    if (nextStep !== step) {
      history.push(`/resume/${resumeId}/${nextStep}`);
    }
  };

  getCurrentIndex = (step) => {
    const { resume: { blocks, details } } = this.props;
    const currentIndex = RESUME_ONBOARDING_STEPS.findIndex(i => i.status === step);
    let resultIndex = 0;
    if (details.professionalSummary !== null) {
      resultIndex = 4;
    } else if (blocks.find(block => block.type === 'SKILLS').items) {
      resultIndex = 3;
    } else if (blocks.find(block => block.type === 'EDUCATION').items) {
      resultIndex = 2;
    } else if (blocks.find(block => block.type === 'EMPLOYMENT').items) {
      resultIndex = 1;
    }
    return resultIndex > currentIndex ? resultIndex : currentIndex;
  };

  handleKeyPress = e => {
    if(e.key === 'Enter') {
      this.popupNext();
    }
  };

  render() {
    const { resume, match: { params: { step, intro } }, centerButton } = this.props;
    const { modalOpen } = this.state;
    const { currentStep, steps } = this.props.resume;
    const currentStepIndex = RESUME_ONBOARDING_STEPS.findIndex(i => i.status === step);
    const currentProgressIndex = RESUME_ONBOARDING_STEPS.findIndex(i => i.status === steps[steps.length - 1]);
    if (currentStepIndex == null) return null;
    let nextName = RESUME_ONBOARDING_STEPS[currentStepIndex + 1]
      ? RESUME_ONBOARDING_STEPS[currentStepIndex + 1].title
      : 'Preview';
    if (intro && intro === 'intro') {
      nextName = RESUME_ONBOARDING_STEPS[currentStepIndex].title;
    }
    return (
      <ResponsiveConsumer>
        {({ breakpoint, isMobile }) => (
          <>
            {currentStepIndex < RESUME_ONBOARDING_STEPS.length - 1 ?
              <Header>
                <Stripe
                  length={RESUME_ONBOARDING_STEPS.length}
                  current={currentProgressIndex}
                />
                {isMobile ?
                  <HeaderMobileNav>
                    <MobileBack onClick={this.back} hide={!currentStepIndex}><SvgIcon.BackMobile height="16px" viewBox="0 0 24 16" /></MobileBack>
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
                    <div onClick={() => this.goTo(step.status)}>
                      {step.title}
                    </div>
                    <div onClick={() => this.goTo(step.status)}/>
                  </HeaderItem>
                ))}
              </Header>
              : null}
            <WizardCont onKeyPress={e => (step === 'start') && this.handleKeyPress(e)} tabIndex="0" ref={(c) => { this.enterRef = c }} center={centerButton}>
              {this.props.children}
              {step !== 'finish' &&
              <Footer>
                {!isMobile && <Back onClick={this.back} hide={!currentStepIndex}>Back</Back>}
                {centerButton ?
                  <NextContainer>
                    <Next onClick={this.popupNext} center={centerButton}>
                      Save & Discover our <br/> automatic completion feature
                    </Next>
                  </NextContainer> :
                  <Next onClick={this.popupNext} center={centerButton}>
                    Next to {nextName}
                  </Next>
                }
              </Footer>}
            </WizardCont>
            <WizardModal
              open={modalOpen}
              onClose={this.toggleModal}
              onAction={this.next}
              step={step}
              num={this.state.num || 0}
            />
            {isMobile && <MobileItemContent resume={resume}/>}
          </>
        )}
      </ResponsiveConsumer>
    );
  }
}

const WizardCont = styled.div`
  position: relative;
  max-width: 860px;
  margin: auto;
  padding: 20px 50px 50px;
  ${p => p.theme.max('sm')`
    padding: 20px;
  `}
  ${p => p.center && css`
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
    ${p => p.theme.max('sm')`
      padding-top: 80px;
      padding-bottom: 80px;
    `}
  `}
`;

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: relative;
  margin-top: 15px;
  z-index: 10;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 30px;
  ${p => p.theme.max('xs')`
    justify-content: flex-end;
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

const HeaderMobileNav = styled(p => <Flex alignItems="center" {...p} />)`
  width: 100%;
  color: #3d4047;
  font-weight: bold;
  font-size: 18px;
  > div {
    flex-grow: 1;
    text-align: center;
    padding-right: 50px;
  }
`;

const MobileBack = styled.button`
  font-weight: normal;
  text-transform: none;
  font-size: 14px;
  left: 25px;
  top: 0;
  border: none;
  background: transparent;
  transform: rotateZ(180deg);
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
  ${p => p.hide && css`
    opacity: 0;
    pointer-events: none;
  `}
`;

const Back = styled(p => <Button link {...p} />)`
  color: ${p => p.theme.colors.black};
  background-image: url(/img/ui/wizard/arrow-pointing-to-left.svg);
  background-repeat: no-repeat;
  background-position: 2px;
  padding-left: 28px;
  ${p => p.hide && css`
    opacity: 0;
    pointer-events: none;
    width: 0;
    padding: 0;
  `}
  &:hover {
    background-color: #fff;
    background-image: url(/img/ui/wizard/arrow-pointing-to-left.svg);
    background-repeat: no-repeat;
    background-position: 2px;
  }
`;

const NextContainer = styled.div`
  min-width: 400px;
  max-width: 60%;
  padding-left: 18px;
  padding-right: 18px;
  margin: 0 auto;
`;

const Next = styled(p => <Button cta {...p} />)`
  background-image: url(/img/ui/wizard/arrow-pointing-to-right.svg);
  background-repeat: no-repeat;
  padding: 0.8em 1.7em;
  padding-right: 50px;
  background-position: 90% 14px;
  &:hover {
    background-color: ${p => darken(0.1, p.theme.colors.primary)};
    background-image: url(/img/ui/wizard/arrow-pointing-to-right.svg);
    background-repeat: no-repeat;
    background-position: 90% 14px;
  }
  ${p => p.center && css`
    width: 100%;
    padding: 0.8em 0.2em;
    padding-right: 2.2em;
    background-position: 92% 24px;
    font-size: 17px;
    &:hover {
      background-position: 92% 24px;
    }
  `}
`;

export default WizardLayout;
