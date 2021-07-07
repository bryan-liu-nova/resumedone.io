import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import history from '/imports/core/api/history';
import {
  DropdownAutosave,
  Button,
  Icon,
  Separator,
} from '/imports/core/ui/atoms';
import Logo from '/imports/core/ui/components/Logo';
import { SlidersMobileButton } from '/imports/generator/ui/atoms';
import ColorDropdown from './ColorDropdown';
import DownloadButtonAtom from '/imports/pdf/core/ui/components/DownloadButton';
import PageNavigatorComponent from './PageNavigator';
import { TEMPLATES } from '/imports/generator/api/constants';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';

const templateOptions = TEMPLATES.map(({ name: title, id: value }) => ({
  title,
  value,
}));

@withAccount
class PreviewHeader extends PureComponent {
  back = () => {
    const { resume: { currentStep, _id } } = this.props;
    localStorage.removeItem('resumedone:from-finalize');
    history.push(`/resume/${_id}/${currentStep}`);
  };

  isFromFinalize = () => {
    return localStorage.getItem('resumedone:from-finalize');
  };

  render() {
    const { loading, resume } = this.props;
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <Header>
            {isMobile ? (!loading && (
              <SlidersMobileButton resume={resume} />
            )) : (
              <>
                <HeaderLogo>
                  <Logo noLink light />
                </HeaderLogo>
                <HeaderContainer>
                  {
                    !loading && (
                      <TemplateParams>
                        <ColorDropdown
                          selected={resume.settings.color}
                          resumeId={resume._id}
                          template={resume.settings.template}
                        />
                        <Separator/>
                        <DropdownAutosave
                          dark
                          options={templateOptions}
                          mutation={UPDATE_RESUME_DETAIL}
                          variables={{
                            docId: resume._id,
                            path: `settings.template`,
                          }}
                          value={resume.settings.template}
                          preview
                        />
                      </TemplateParams>
                    )
                  }
                </HeaderContainer>
              </>
            )}
            <HeaderClose>
              <CloseButton onClick={this.back}>
                <Icon icon="x"/>
              </CloseButton>
            </HeaderClose>
            {this.isFromFinalize() && <DownloadButton resume={resume} />}
          </Header>
        )}
      </ResponsiveConsumer>
    );
  }
}

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  background-color: ${p => p.theme.colors.previewBlack};
  color: #ffffff;
  height: 80px;
  flex: 0 0 80px;
  flex-flow: row nowrap;
  padding: 0px 32px;
`;

const HeaderLogo = styled.div`
  flex: 1 1 0;
  align-items: center;
  display: flex;
  margin-right: 15px;
`;

const HeaderClose = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1 1 0;
`;

const HeaderContainer = styled.div`
  width: 928px;
  display: flex;
  position: relative;
  z-index: 1;
  flex-flow: row nowrap;
`;

const TemplateParams = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 0;
  flex-flow: row nowrap;
  p:hover {
    color: ${p => p.theme.colors.primary};
    i {
      color: ${p => p.theme.colors.primary};
    }
  }
`;

const DownloadButton = styled(DownloadButtonAtom)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 22px;
  font-weight: 600;
  text-align: center;
  z-index: 1;
  padding: 14px 24px;
  border-width: 0px;
  font-size: 18px;
  background-color: ${p => p.theme.colors.cta};
  border-color: ${p => p.theme.colors.cta};
`;

const CloseButton = styled(p => <Button unstyled {...p} />)`
  color: #ffffff;
  font-size: 24px;
  &:hover {
    color: ${p => p.theme.colors.primary};
  }
`;

const PageNavigator = styled(PageNavigatorComponent)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 0;
  flex-flow: row nowrap;
  span {
    color: white;
    font-size: 16px;
  }
`;

export default PreviewHeader;
