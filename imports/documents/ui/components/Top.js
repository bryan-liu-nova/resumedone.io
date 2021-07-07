import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import history from '/imports/core/api/history';
import { hiddenMixin } from "/imports/core/ui/helpers";
import { Link, Select } from '/imports/core/ui/atoms';

const menuLinks = [
  {
    option: 'Disclaimer',
    value: 'disclaimer'
  },
  {
    option: 'Terms of Service',
    value: 'tos'
  },
  {
    option: 'Privacy Policy',
    value: 'policy'
  }
];

class Top extends PureComponent {
  goToPage = page => {
    history.push(`/${page}`);
  };

  onChange = e => {
    history.push(`/${e.target.value}`);
  }

  render() {
    const { activePage } = this.props;
    return (
      <TopContainer>
        <TopContent>
          <h1>Legal Documents</h1>
          <Subtitle>
            All documents were updated
            <br />
            on May 21, 2016
          </Subtitle>
          <TabList hiddenSM>
            {
              menuLinks.map(link => (
                <MenuLink
                  key={link.value}
                  active={activePage === link.value}
                  onClick={() => this.goToPage(link.value)}
                >
                  {link.option}
                  </MenuLink>
              ))
            }
          </TabList>
          <SelectContainer>
            <SelectIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M9.11651618,7.57183221 L11,5.5 L16.9417419,10.9640839 C17.5527527,11.5195482 17.5527527,12.4804518 16.9417419,13.0359161 L11,18.5 L9.11651618,16.4281678 L13.9187504,12 L9.11651618,7.57183221 Z"></path>
            </SelectIcon>
            <MenuSelect value={activePage} onChange={this.onChange}>
              {menuLinks.map(link => (
                <option key={link.value} value={link.value}>{link.option}</option>
              ))}
            </MenuSelect>
          </SelectContainer>
        </TopContent>
      </TopContainer>
    );
  }
}

const TopContainer = styled.div`
  padding-top: 80px;
  background-color: #f2f5fa;
  ${({ theme }) => theme.max('sm')`
      padding-top: 40px;
    `}
`;

const TopContent = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  & h1 {
    font-family: ${({ theme }) => theme.font.family.header};
    font-weight: 700;
    font-size: 48px;
    line-height: 52px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
    margin-top: 0;
    ${({ theme }) => theme.max('sm')`
      font-weight: 700;
      font-size: 34px;
      line-height: 40px;
    `}
  }
`;

const Subtitle = styled.div`
  font-family: ${({ theme }) => theme.font.family.text};
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
  ${({ theme }) => theme.max('sm')`
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 32px;
    `}
`;

const TabList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${hiddenMixin}
`;

const MenuLink = styled(p => <Link {...p} />)`
  display: inline-block;
  font-family: ${({ theme }) => theme.font.family.text};
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  text-align: center;
  flex: 1 1;
  padding: 10px;
  color: ${({ theme }) => theme.colors.gray.regular};
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 3px;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${p => p.active && css`
    background-color: #fff;
  `}
`;

const SelectContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 0 20px;
  ${({ theme }) => theme.min('sm')`
     display: none;
  `}
`;

const SelectIcon = styled.svg`
  position: absolute;
  fill: ${({ theme }) => theme.colors.primary};
  top: 8px;
  right: 30px;
  transform: rotate(90deg);
`;

const MenuSelect = styled(p => <select {...p} />)`
  width: 100%;
  border: none;
  padding: 12px 20px;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
  letter-spacing: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export default Top;