import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { GET_RESUME } from '/imports/generator/api/apollo/client/queries';
import { withRouter } from 'react-router-dom';

import { LoaderContainer } from '/imports/generator/ui/atoms';
import PreviewHeader from '/imports/generator/ui/components/PreviewHeader';
import { PDF_LOADER } from '/imports/generator/api/constants';
import Loading from '/imports/core/ui/components/Loading';
import ErrorOccured from '/imports/core/ui/components/ErrorOccured';
import PDFViewer from '/imports/pdf/core/ui/components/PDFViewer';
import { Analytics } from '/imports/core/api/analytics';

@withRouter
@graphql(GET_RESUME, {
  options: p => ({
    variables: {
      resumeId: p.match.params.resumeId
    }
  })
})
class PreviewPage extends PureComponent {
  state = {
    loading: true,
    numPages: null,
    currentPage: 1,
    width: 0,
  };

  componentDidMount() {
    Analytics.track('preview_view');
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.loading && !this.props.data.loading) {
      this.updateWidth();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  setPageState = (currentPage, numPages) => {
    this.setState({ currentPage, numPages });
  };

  onPreviousPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage - 1,
    }));
  };

  onNextPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage + 1,
    }));
  };

  updateWidth = () => {
    console.log('Att');
    if (!this.preview) return;
    console.log('Trying', this.preview.offsetWidth);
    const width = this.preview.offsetWidth;
    this.setState({ width });
  };

  getPreviewRef = r => {
    this.preview = r;
  };

  renderNoData = () => (
    <LoaderContainer>
      <img src={PDF_LOADER}/>
    </LoaderContainer>
  );

  render() {
    const { currentPage, numPages, width } = this.state;
    const { data: { getResume, loading: dataLoading, error } } = this.props;
    console.log('pasdgsd', this.props);
    if (error) return <ErrorOccured/>;
    return (
      <Page>
        <PreviewHeader
            resume={getResume}
            currentPage={currentPage}
            numPages={numPages}
            loading={dataLoading}
            onPreviousPage={this.onPreviousPage}
            onNextPage={this.onNextPage}
        />
        <PreviewContent>
          <Preview ref={this.getPreviewRef}>
            {dataLoading
              ? this.renderNoData()
              : <PDFViewer
                  resume={getResume}
                  updateCount={getResume.updatesCount}
                  currentPage={currentPage}
                  setPageState={this.setPageState}
                  width={width}
                  noDebounce
              />
            }
          </Preview>
        </PreviewContent>
      </Page>
    );
  }
}


const Page = styled.section`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  pointer-events: auto;
  transform: translateY(0px);
  flex-flow: column nowrap;
`;

const PreviewContent = styled.div`
  background: ${p => p.theme.colors.gray.regular};
  overflow-y: auto;
  flex: 1 0 0px;
  padding: 0px 44px;
  ${({ theme }) => theme.max('sm')`
    padding: 0px 20px;
 `}
`;

const Preview = styled.div`
  max-width: 928px;
  overflow: hidden;
  height: ${({ height }) => height}px;
  transform: translateY(0px);
  opacity: 1;
  margin: 60px auto;
  // transition: transform 0.4s ease 0s, opacity 0.4s ease 0s;
  background: white;
  border-radius: ${p => p.theme.general.borderRadius};
  ${({ theme }) => theme.max('md')`
    margin: 44px auto;
  `}
  ${({ theme }) => theme.max('sm')`
    margin: 20px auto;
  `}
`;

export default PreviewPage;
