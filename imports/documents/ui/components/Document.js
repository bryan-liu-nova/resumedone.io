import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Link } from '/imports/core/ui/atoms';

class Document extends PureComponent {
  render() {
    return (
      <DocumentContainer>
        <DocumentContent>
          {this.props.children}
          <DocumentsBottom>
            <DocumentsBottomAddress>
              <FooterIcon xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g id="icon" stroke="none" strokeWidth="1" fillRule="evenodd">
                  <path d="M7.92325987,14.4023311 C6.74039163,13.3064252 6,11.7396764 6,10 C6,6.6862915 8.6862915,4 12,4 C15.3137085,4 18,6.6862915 18,10 C18,11.7155806 17.2799763,13.2629907 16.1256355,14.3565236 L12.3183103,19.1101916 C12.2999388,19.1331295 12.2790953,19.153973 12.2561573,19.1723445 C12.0837303,19.3104455 11.8319976,19.2826186 11.6938967,19.1101916 L7.92325987,14.4023311 Z M12,13 C13.6568542,13 15,11.6568542 15,10 C15,8.34314575 13.6568542,7 12,7 C10.3431458,7 9,8.34314575 9,10 C9,11.6568542 10.3431458,13 12,13 Z" id="Pin"></path>
                </g>
              </FooterIcon>
              ResumeDone.io
              <br />
              160 Kemp House, City Road,
              <br />
              London EC1V 2NX, United Kingdom
              <br />
              <Link href="mailto:support@resumedone.io">support@resumedone.io</Link>
            </DocumentsBottomAddress>
            <DocumentsBottomUpdated>
              Terms of Service was last updated on May 21, 2016
            </DocumentsBottomUpdated>
          </DocumentsBottom>
        </DocumentContent>
      </DocumentContainer>
    );
  }
}

const DocumentContainer = styled.div`
  width: 100%;
  background-color: #fff;
`;

const DocumentContent = styled.div`
    max-width: 736px;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0 100px;
    ${({ theme }) => theme.max('sm')`
      padding: 1px 20px 60px;
    `}
    & h3 {
      font-size: 22px;
      line-height: 28px;
      font-weight: 600;
      margin-bottom: 8px;
      margin-top: 40px;
      ${({ theme }) => theme.max('sm')`
        margin-top: 32px;
    `}
    }
    & h4 {
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      margin-top: 24px;
    }
    & p {
      margin-bottom: 16px;
      margin-top: 0;
      font-weight: 600;
      line-height: 24px;
    }
    & p a {
      color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      margin-left: 4px;
    }
    & ol {
      font-weight: 600;
      margin: 16px 0;
      padding-left: 64px;
    }
    & ol li {
      margin-bottom: 12px;
    }
     & ul {
      font-weight: 600;
      margin: 16px 0;
      padding-left: 64px;
    }
    & ul li {
      margin-bottom: 12px;
    }
`;

const DocumentsBottom = styled.div`
  display: flex;
  flex-flow: row nowrap;
  ${({ theme }) => theme.max('sm')`
      flex-flow: column;
  `}
`;

const DocumentsBottomAddress = styled.div`
  width: 360px;
  margin-right: 120px;
  padding-left: 30px;
  position: relative;
  & p {
    margin-bottom: 16px;
    margin-top: 0;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray.regular};
  }
  ${({ theme }) => theme.max('sm')`
      margin: 0 0 16px;
  `}
`;

const DocumentsBottomUpdated = styled.div`
  font-size: 14px;
  line-height: 20px;
  flex: 1 1;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray.light};
`;

const FooterIcon = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  fill: ${({ theme }) => theme.colors.primary};
`;

export default Document;
