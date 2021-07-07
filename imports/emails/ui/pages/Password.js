import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  Page
} from '/imports/core/ui/atoms';
// import Top from '../components/Top';

const data = {
  name: 'Name',
  link: 'http://resumedone.io/app/magic/sV3MKgr8nDfvWixu'
};

class Password extends PureComponent {
  render() {
    return (
      <EmailWrapper>
        <EmailContainer>
          <EmailContent>
            <Table
              align="center"
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
            >
              <tr>
                <td style={{ textAlign: 'center' }}>
                  <h1>Log in into your account</h1>
                </td>
              </tr>
            </Table>
          </EmailContent>
        </EmailContainer>
      </EmailWrapper>
    );
  }
}

const EmailWrapper = styled.div`
  width: 100%; 
  background-color: #f1f1f1;
`;

const EmailContainer = styled.div`
  width: 100%; 
  margin: 0 auto; 
  min-height: 100vh;
`;

const EmailContent = styled.div`
  max-width: 1080px; 
  background: #fff; 
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

const Table = styled.table`
  max-width: 780px; 
  margin: auto;
`;

export default Password;
