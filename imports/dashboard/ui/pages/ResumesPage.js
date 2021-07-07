import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { graphql, compose } from 'react-apollo';

import { Page, Container, Flex, Box, Button, Icon } from '/imports/core/ui/atoms';
import { DashboardHeading } from '/imports/dashboard/ui/atoms';
import history from '/imports/core/api/history';
import ResumeItem from '/imports/dashboard/ui/components/ResumeItem';
import { LIST_RESUMES } from '/imports/dashboard/api/apollo/client/queries';
// import { CREATE_RESUME } from '/imports/dashboard/api/apollo/client/mutations';
import ErrorOccured from '/imports/core/ui/components/ErrorOccured';
import Loading from '/imports/core/ui/components/Loading';
import { Analytics } from '/imports/core/api/analytics';

import SelectTemplatePageLoadable from '/imports/generator/ui/loadable/SelectTemplatePageLoadable';
import GeneratorPageLoadable from '/imports/generator/ui/loadable/GeneratorPageLoadable';

@compose(
  graphql(LIST_RESUMES),
  // graphql(CREATE_RESUME, {
  //   options: {
  //     refetchQueries: [{ query: LIST_RESUMES }],
  //     onCompleted: ({ createResume }) => {
  //       if (createResume) {
  //         history.push(`/resume/${createResume._id}/start`);
  //       }
  //     },
  //   },
  // }),
)
class ResumesPage extends PureComponent {
  componentDidMount() {
    Analytics.track('dashboard_view');
    try {
      document.getElementsByTagName('body')[0].classList.remove('_container');
    } catch(error) {
      console.error("Can't find body tag");
    }
    SelectTemplatePageLoadable.preload();
    GeneratorPageLoadable.preload();
  }

  renderList = () => {
    const { data: { listResumes, loading, error } } = this.props;
    if (error) return <ErrorOccured error={error}/>;
    else if (loading) return <Loading/>;
    return (
      <ItemsGrid>
        {listResumes.map(resume => <ResumeItem key={resume._id} resume={resume}/>)}
      </ItemsGrid>
    );
  };

  handleClick = () => {
    history.push(`/resume/create`);
  };

  render() {
    return (
      <PageCont>
        <DashboardContainer>
          <HeadingFlex>
            <Box grow={1}>
              <DashboardHeading>Dashboard</DashboardHeading>
            </Box>
            <Box>
              <DashboardButton cta onClick={this.handleClick}><Icon icon="plus"/> Create New</DashboardButton>
            </Box>
          </HeadingFlex>
          {this.renderList()}
        </DashboardContainer>
      </PageCont>
    );
  }
}

const DashboardButton = styled(Button)`
  line-height: 20px;
  border-width: 0;
  padding: 8px 10px 8px 4px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.family.text};
  display: flex;
  align-items: center;
  font-size: .8125rem;
  > i {
    width: 20px;
    font-weight: 600;
    margin-right: 3px;
  }
  ${({ theme }) => theme.max('sm')`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

const DashboardContainer = styled(Container)`
  max-width: 1120px;
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(${p => p.theme.general.gridGap} * 2);
  margin-bottom: calc(${p => p.theme.general.gridGap} * 4);
  ${({ theme }) => theme.max('md')`
    display: block;
    padding: ${theme.general.mobilePadding};
    margin-bottom: ${theme.general.mobilePadding};
  `}
  ${({ theme }) => theme.max('sm')`
    padding: 0;
  `}
`;

export const HeadingFlex = styled(p => <Flex alignItems="center" {...p} />)`
  border-bottom: 1px solid ${({ theme }) => lighten(0.07, theme.colors.gray.light)};
  margin-bottom: 40px;
  line-height: 34px;
  padding-bottom: 15px;
  ${({ theme }) => theme.max('md')`
    padding: 30px ${theme.general.mobilePadding} 10px ${theme.general.mobilePadding};
    margin-bottom: 0;
  `}
  ${({ theme }) => theme.max('sm')`
    flex-direction: column;
    border-bottom: 0;
    padding: 0;
    > div {
      width: 100%;
    }
    button {
      width: 100%;
      margin-top: ${theme.general.mobilePadding};
    }
    margin-bottom: ${theme.general.mobilePadding};
  `}
`;

const PageCont = styled(Page)`
  padding: 60px 32px;
  ${({ theme }) => theme.max('sm')`
    padding: 40px 20px 48px;
  `}
`;

export default ResumesPage;
