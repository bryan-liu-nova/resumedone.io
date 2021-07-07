import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/sydney/ui/atoms';

class WebSiteLink extends PureComponent {
  render() {
    const { links } = this.props;
    if(!links || (links && !links.items) || (links.items && links.items.length === 0)) return null;
    return (
      <Container>
        <Links>
          {links && links.items && links.items.map((item, index) => (
            <LinkItem key={index}>
              {item.fields ? item.fields.url : null}
            </LinkItem>
          ))}
        </Links>
        <Decoration>
          <DecorationInner>
            ”
          </DecorationInner>
        </Decoration>
        <LeftSide>
          <LeftLine />
        </LeftSide>
      </Container>
    );
  }
}

const Container = styled(View)`
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const Links = styled(View)`
  background-color: #f5d669;
  min-height: 40px;
  padding-top: 11px;
  padding-right: 12px;
  margin-right: 6px;
  padding-bottom: 8px;
`;

const LinkItem = styled(TextAtom)`
  font-family: 'Raleway Bold';
  color: #000;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  line-height: 20px;
`;

const Decoration = styled(View)`
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  background: #2d2d2d;
`;

const DecorationInner = styled(TextAtom)`
  font-size: 49px;
  font-family: 'Raleway Bold';
  color: #fff;
  display: flex;
  justify-content: center;
  line-height: 65px;
`;

const LeftSide = styled(View)`
  position: absolute;
  height: 100%;
  width: 80px;
  left: -79px;
  top: 0;
  background-color: #f5d669;
`;

const LeftLine = styled(View)`
  position: absolute;
  width: 1px;
  height: 100%;
  background: #fff;
  right: 15px;
`;

export default WebSiteLink;
