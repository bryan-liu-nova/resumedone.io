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
import Header from '../components/Header';
import { needPopup } from '/imports/generator/api/helpers';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import MobileItemContent from '../components/MobileItemContent';
import { UPDATE_WIZARD_STEPS } from '/imports/generator/api/apollo/client/mutations';
import { Analytics } from '/imports/core/api/analytics';
import '../../../../public/css/experiment.css';

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
          <Container>
            {currentStepIndex < RESUME_ONBOARDING_STEPS.length - 1 && (
              <Header
                isMobile={isMobile}
                currentStepIndex={currentStepIndex}
                back={this.back}
                goTo={this.goTo}
                RESUME_ONBOARDING_STEPS={RESUME_ONBOARDING_STEPS}
                currentStep={currentStep}
                currentProgressIndex={currentProgressIndex}
              />            
            )}
            <div className="b-template-customization__content">
              <div className="b-template-customization__content-inner">
                <div className="b-template-customization__heading">
                  {this.props.header}
                </div>
                {this.props.form}
                {step !== 'finish' &&
                <Footer>
                  {!isMobile && <Back onClick={this.back} hide={!currentStepIndex}>Back</Back>}
                  <button className="b-template-customization__btn-next" onClick={this.popupNext}>
                    <span className="b-template-customization__btn-next-text">Next to Experience</span>
                  </button>
                
                </Footer>}
                
              </div>
            </div>

            {isMobile && <MobileItemContent resume={resume}/>}
          </Container>
        )}
      </ResponsiveConsumer>
    );
  }
}

const Container = styled.div`
  display: flex;
  overflow: hidden;
  overflow-y: auto;
  height: 100vh;
  flex-direction: column;
  font-family: Poppins,sans-serif !important;
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

export default WizardLayout;
