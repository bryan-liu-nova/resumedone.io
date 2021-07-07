import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { SvgIcon } from '/imports/core/ui/atoms';
import { inputStyle } from '/imports/core/ui/mixins';

class SearchInput extends PureComponent {
  render() {
    const { value, onChange } = this.props;
    return (
      <InputWrapper>
        <SvgIcon.Search />
        <Input
          value={value}
          onChange={onChange}
          placeholder="Search..."
        />
      </InputWrapper>
    );
  }
}

const InputWrapper = styled.div`
  position: relative;
  & svg {
    position: absolute;
    top: 10px;
    left: 12px;
    z-index: 100;
    width: 18px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Input = styled.input`
  ${inputStyle}
  font-size: 12px;
  border-radius: 3px;
  height: 36px;
  padding-left: 30px;
  margin-bottom: 20px;
  flex-shrink: 0;
  ${p => p.theme.max('xs')`
    background: #fff;
    border-radius: 22px;
    border: solid 1px #e1e5e8;
  `};
`;

export default SearchInput;