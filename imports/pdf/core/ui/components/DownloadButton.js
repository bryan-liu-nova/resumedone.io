import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { graphql } from 'react-apollo';
import styled, { css } from 'styled-components';

import { withAccount } from '/imports/core/api/accounts/accountContext';
import { Button, Icon } from '/imports/core/ui/atoms';
import last from 'lodash/last';
import history from '/imports/core/api/history';
import { GET_DOWNLOAD_LINK } from '/imports/generator/api/apollo/client/mutations';
import { Analytics } from '/imports/core/api/analytics';

@withAccount
@graphql(GET_DOWNLOAD_LINK)
class DownloadButton extends PureComponent {
  download = () => {
    const {
      currentUser: {
        serviceData: {
          subscriptionId
        }
      },
      resume: {
        _id,
        settings: {
          template
        }
      },
      mutate
    } = this.props;
    Analytics.track('download_cta', {
      context: last(window.location.pathname.split('/')),
      template
    });
    if (subscriptionId) {
      mutate({
        variables: {
          resumeId: _id
        }
      }).then(({ data: { getDownloadLink: { downloadKey, resumeId } } }) => {
        const a = document.createElement('a');
        a.target = '_blank';
        a.href = `${Meteor.absoluteUrl()}api/get-resume/${resumeId}/${downloadKey}`;
        a.click();
      });
    } else {
      history.push('/checkout');
    }
  };

  render() {
    const { className, cta, children } = this.props;
    return (
      <ButtonCont className={className} onClick={this.download} cta={cta}>{children || 'Download'}</ButtonCont>
    );
  }
}

const ButtonCont = styled(p => <Button {...p} />)`
  font-family: ${p => p.theme.font.family.correctAccent};
  background-color: ${p => p.theme.colors.cta};
  border-color: ${p => p.theme.colors.cta};
  text-transform: none;
  font-size: 18px;
  padding-top: 0.9em;
	padding-bottom: 0.7em;
  ${p => p.cta && css`
    padding: 0.9em 1.7em 0.7em;
  `}
`;

export default DownloadButton;
