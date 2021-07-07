import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default class OnboardingNavigator extends PureComponent {
  render() {
    return (
      <Container>
        <StatusHeader>
          <StatusHeaderItem>
            <ItemTitle>Step 1 of 4</ItemTitle>
          </StatusHeaderItem>
          <StatusHeaderItem>
            <Navigator>
              <NavContainer>
                <NavItem>
                  <Button disabled></Button>
                </NavItem>
                <NavItem>
                  <Button onClick={this.props.onSelect}/>
                </NavItem>
              </NavContainer>
            </Navigator>
          </StatusHeaderItem>
        </StatusHeader>
        <StatusSlider>
          <SliderBar></SliderBar>
        </StatusSlider>
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
  right: 0;
  top: -130px;
`;

const StatusSlider = styled.div`
  position: relative;
  width: 300px;
  height: 1px;
  background-color: #000;
`;

const SliderBar = styled.div`
  width: 25%;
  position: absolute;
  top: -2px;
  left: 0;
  height: 5px;
  background-color: #de6902;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px -10px 10px;
  width: 320px;
`;

const StatusHeaderItem = styled.div`
  padding: 10px;
`;

const ItemTitle = styled.div`
  margin: -7px 0;
  color: #000;
  line-height: 24px;
  letter-spacing: .04em;
  font-family: Poppins, sans-serif !important;
  font-weight: 700 !important;
  font-size: 14px !important;
`;

const Navigator = styled.div`
  display: flex;
  margin: -6px -7px -5px 0;
`;

const NavContainer = styled.div`
  display: flex;
  margin: -8px;
`;

const NavItem = styled.div`
  padding: 8px;

  button {
    position: relative;
    width: 21px;
    height: 21px;
    background-color: hsla(0,0%,100%,0);
    transition: background-color .2s;
    text-align: left;
  }
`;

const Button = styled.button`
  border: 0;
  cursor: pointer;
  &::after {
    color: #a1aab3;
    content: "\\e908";
  }

  &:disabled::after {
    color: #a1aab3;
    transform: rotateY(180deg);
  }

  &:after {
    position: absolute;
    top: 5px;
    left: 7px;
    color: #000;
    font-size: 11px;
    transition: all .2s;
  }

  &:after {
    font-family: icomoon!important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    line-height: 1;
    letter-spacing: 0;
    text-transform: none;
  }
`;
