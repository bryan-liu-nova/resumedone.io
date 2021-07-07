import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';

import { Button, Flex, Icon, SpinFrame, SvgIcon } from '/imports/core/ui/atoms';
import { LoaderContainer } from '/imports/generator/ui/atoms';
import { A4_FACTOR, PDF_LOADER, SYNCED_URL, SYNCING_URL } from '/imports/generator/api/constants';
import history from '/imports/core/api/history';
import PageNavigator from './PageNavigator';
import PDFViewer from '/imports/pdf/core/ui/components/PDFViewer';
import DownloadButton from '/imports/pdf/core/ui/components/DownloadButton';

const RESUME_WIDTH_VW = 36;

@connect(state => state.pdf)
@withRouter
class Preview extends PureComponent {
  state = {
    loading: true,
    width: window.innerWidth / 100 * RESUME_WIDTH_VW
  };

  back = () => history.push('/resumes');

  componentDidMount() {
    window.addEventListener('resize', this.handlePreviewResize);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { step } } } = this.props;
    const { match: { params: { step: prevStep } } } = prevProps;
    if(step !== prevStep && (step === 'finish' || prevStep === 'finish')) {
      this.handlePreviewResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handlePreviewResize);
  }

  handlePreviewResize = throttle(() => {
    this.setState({ width: window.innerWidth / 100 * RESUME_WIDTH_VW });
  }, 50);

  goToReview = () => history.push(`/resume/${this.props.resume._id}/preview`);

  renderSavedIndicator = () => {
    const isSyncing = this.props.savingStatus === 'SAVING';
    return (
      <SavingIndicator>
        <SyncIcon isSyncing={isSyncing}/>
        {isSyncing && 'Saving...' || 'Saved'}
      </SavingIndicator>
    );
  };

  renderNoData = () => (
    <LoaderContainer>
      <img src={PDF_LOADER} alt="loader"/>
    </LoaderContainer>
  );

  renderDownloadButtons = () => {
    const { resume, match: { params: { step } } } = this.props;
    return (
      <ButtonBlock>
        <Flex justifyContent="flex-end" grow={1} shrink={1}>
          {/*<SecondaryButton>*/}
          {/*<SecondaryButtonIcon>*/}
          {/*<SvgIcon.Share/>*/}
          {/*</SecondaryButtonIcon>*/}
          {/*<div>Share</div>*/}
          {/*</SecondaryButton>*/}
        </Flex>
        <Flex justifyContent="center" grow={1} shrink={1}>
          {(step === 'finish' || step === 'edit') && (
            <Download>
              <DownloadButton resume={resume} cta />
            </Download>
          )}
        </Flex>
        <Flex justifyContent="flex-start" grow={1} shrink={1}>
          {/*<SecondaryButton>*/}
          {/*<SecondaryButtonIcon>*/}
          {/*<SvgIcon.FullSizeLarge />*/}
          {/*</SecondaryButtonIcon>*/}
          {/*<div>Preview</div>*/}
          {/*</SecondaryButton>*/}
        </Flex>
      </ButtonBlock>
    );
  };

  isCloseVisible = step => {
    return step === 'start' ? localStorage.getItem('resumedone:finalize-seen') : true;
  };

  render() {
    const { resume, loading } = this.props;
    const { match: { params: { step } } } = this.props;
    const { width } = this.state;
    return (
      <>
        {this.isCloseVisible(step) && (
          <Close onClick={this.back}>
            <Icon icon="x"/>
          </Close>
        )}
        <FullSizeOverlay onClick={this.goToReview}>
          <FullSizeIcon>
            <SvgIcon.FullSizeLarge/>
          </FullSizeIcon>
        </FullSizeOverlay>
        <Topbar>
          {this.renderSavedIndicator()}
        </Topbar>
        <Resume>          
          {loading
            ? this.renderNoData()
            : (
              <>
                <PDFViewWrapper>
                  <PDFViewer resume={resume} width={width} updatesCount={resume.updatesCount} />
                </PDFViewWrapper>
                <ClipViewWrapper className="b-template-customization__demo-img" />
              </>
            )
          }
        </Resume>

      </>
    );
  }
}

const PDFViewWrapper = styled.div`
  overflow: hidden;
`;

const ClipViewWrapper = styled.div`
  position: absolute !important;
  left: 0;
  top: 0;
`;

const SavingIndicator = styled(p => <Flex alignItems="center" {...p}/>)`
  position: absolute;
  align-items: center;
  left: 0;
  color: white;
  font-size: 14px;
  font-family: ${p => p.theme.font.family.correctText};
`;

const Topbar = styled(p => <Flex alignItems="center" justifyContent="center" {...p}/>)`
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  height: 80px;
`;

/**
 * it does not have to be function component
 */
const ResumeCont = styled.div`
  margin: 50px auto 20px auto;
`;

const Resume = styled.div`
  position: relative;
  background: white;
  z-index: 2;
  border-radius: ${p => p.theme.general.borderRadius};
  width: ${RESUME_WIDTH_VW}vw;
  margin: 50px auto 20px auto;
`;

const ButtonBlock = styled(p => <Flex alignItems="center" justifyContent="center" {...p} />)`
  width: 100%;
  padding: 0 40px;
  position: relative;
  z-index: 100;
  padding-top: 10px;
  left: 0;
  bottom: 0;
`;

const SecondaryButton = styled(p => <Button unstyled {...p} />)`
  color: white;
  padding: 0 16px 0 8px;
  height: 38px;
  border-radius: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  background-color: ${p => p.theme.colors.gray.regular};
  // transition: background-color 0.1s ease;

  &:hover {
    background-color: ${p => p.theme.colors.gray.dark};
  }
`;

const SecondaryButtonIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`;

const Download = styled.div`
  margin: 0 20px;
`;

const FullSizeOverlay = styled(p => <Flex alignItems="center" justifyContent="center" {...p}/>)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  border-radius: 6px;
  cursor: pointer;
`;

const spinAnimation = css`
  ${SpinFrame} 0.5s infinite linear;
`;

const SyncIcon = styled(p => <Flex alignItems="center" justifyContent="center" {...p}/>)`
  margin-right: 6px;
  width: 24px;
  height: 24px;
  
  &::before {
    content: '';
    width: 24px;
    height: 24px;
    display: block;
    background-image: url(${p => (p.isSyncing ? SYNCING_URL : SYNCED_URL)});
    background-size: 100% 100%;
    background-position: center center;
    animation: ${p => (p.isSyncing ? spinAnimation : 'none')};
  }
`;

const FullSizeIcon = styled(p => <Flex alignItems="center" justifyContent="center" {...p}/>)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${p => p.theme.colors.primary};
  color: white;
  transform: scale(0);
  // transition: transform 0.1s ease;

  ${FullSizeOverlay}:hover & {
    transform: scale(1);
  }
`;

const Close = styled(p => <Button unstyled {...p} />)`
  position: fixed;
  cursor: pointer;
  top: 20px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: rgba(15, 20, 31, 0.3);
  // transition: background-color 0.1s ease;
  z-index: 10;

  &:hover {
    background-color: rgba(15, 20, 31, 0.5);
  }
`;

export default Preview;
