import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'
import emitter from 'react-ab-test/lib/emitter'

import { Page } from '/imports/core/ui/atoms';
import { LoaderContainer } from '/imports/generator/ui/atoms';
import GeneratorForm from '/imports/generator/ui/components/GeneratorForm';
import Preview from '/imports/generator/ui/components/Preview';
import ErrorOccured from '/imports/core/ui/components/ErrorOccured';
import { GET_RESUME } from '/imports/generator/api/apollo/client/queries';
import history from '/imports/core/api/history';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { FORM_LOADER } from '/imports/generator/api/constants';
import { RESUME_ONBOARDING_STEPS } from '/imports/generator/api/onboarding';
import PreviewPageLoadable from '/imports/generator/ui/loadable/PreviewPageLoadable';
import CheckoutLoadable from '/imports/checkout/ui/loadable/CheckoutLoadable';
import '../../../../public/css/experiment.css';

const componentsMap = {
  edit: GeneratorForm,
  ...RESUME_ONBOARDING_STEPS.reduce((res, item) => {
    res[item.status] = item.component;
    return res;
  }, {})
};

@withRouter
class GeneratorPage extends PureComponent {
  componentDidMount() {
    PreviewPageLoadable.preload();
    CheckoutLoadable.preload();
  }

  back = () => history.push('/resumes');

  renderLoading = () => (
    <PageWrap>
      <LoaderContainer>
        <img src={FORM_LOADER} alt="loader" />
      </LoaderContainer>
    </PageWrap>
  );

  render() {
    const { match: { params: { resumeId, step, intro } } } = this.props;
    const Component = componentsMap[step];

    return (
      <ResponsiveConsumer>
        {({ breakpoint }) => (
          <Query query={GET_RESUME} variables={{ resumeId }}>
            {({ data, loading, error }) => {
              if (error) return <ErrorOccured/>;
              if (loading) return this.renderLoading();
              const { status } = data.getResume.settings;
              return (
                <PageWrap>
                  <Side id="scroll-cont">
                    <Component resume={data.getResume} intro={intro} />
                  </Side>
                  {breakpoint === 'lg' &&
                    <Side right>
                      <Preview
                        resume={data.getResume}
                        loading={loading}
                        updatesCount={data.getResume ? data.getResume.updatesCount : null}
                      />
                    </Side>
                  }
                </PageWrap>
              );
            }}
          </Query>
        )}
      </ResponsiveConsumer>
    );
  }
}

const PageWrap = styled(Page)`
  display: flex;
  justify-content: center;
  width: 50%;
  min-height: 100vh;
  ${p => p.theme.min('lg')`
    max-width: 960px;
  `};
`;

const Side = styled.div`
  position: absolute;
  top: 0;
  left: ${p => p.right ? '50vw' : 0};
  width: 50vw;
  height: 100vh;
  overflow-y: scroll;
  flex: 1;
  ${p => !p.right && css`
    ${p.theme.max('lg')`
      width: 100%;
      margin: 0 auto;
    `};
  `}
  ${p => p.right && css`
    background-color: ${p.theme.colors.gray.previewBackground};
    user-select: none;
    z-index: 3;
    ${p.theme.max('lg')`
      display: none;
    `};
  `}
`;

export default GeneratorPage;
