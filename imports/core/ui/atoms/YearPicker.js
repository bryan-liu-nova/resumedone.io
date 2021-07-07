import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { inputStyle } from '/imports/core/ui/mixins';

const years = (() => {
  const currentYear = new Date().getFullYear();
  let result = [];
  for(let i = currentYear; i >= 1980; i--) {
    result.push(i.toString());
  }
  return result;
})();

const checkYear = year => year >= 1980 ? `${year}` : '';

class YearPicker extends PureComponent {
  state = {
    value: this.props.value ? checkYear(new Date(this.props.value).getFullYear()) : '',
    expanded: true,
    options: years,
  };

  _input = null;

  componentWillUnmount() {
    window.removeEventListener('click', this.windowClick);
  };

  windowClick = () => {
    console.log('window click');
    this.setState({ expanded: false });
    window.removeEventListener('click', this.windowClick);
  };

  toggleExpanded = (e) => {
    console.log('toggle');
    if(e) e.stopPropagation();
    if (this.state.expanded === false) {
      window.addEventListener('click', this.windowClick);
    } else {
      window.removeEventListener('click', this.windowClick);
    }
    this.setState(st => ({ expanded: !st.expanded }));
  };

  handleClick = (e) => {
    e.stopPropagation();
    if(!this.state.expanded) {
      this.toggleExpanded();
    }
  };

  onChange = value => {
    this.setState({ value, expanded: true });
    const { onChange } = this.props;
    if(onChange) onChange({ target: { value }});
  };

  onSelect = (value) => {
    console.log('select', value);
    const { onChange } = this.props;
    this.setState({ value: `${value}` });
    if(onChange) onChange({ target: { value }});
    this.toggleExpanded();
  };

  getInput = (node) => {
    this._input = node;
  };

  render() {
    console.log('year props', this.props);
    console.log('year state', this.state);
    console.log('value type', typeof(this.props.value), this.props.value);
    const { light, dark, placeholder, ...rest } = this.props;
    const { value, expanded, options } = this.state;
    return (
      <InputWrapper dark={dark}>
        <Input
          value={value}
          onChange={e => this.onChange(e.target.value)}
          placeholder={placeholder || ''}
          light={light}
          dark={dark}
          expanded={expanded}
          onClick={this.handleClick}
          ref={this.getInput}
        />
        <DropdownMenu expanded={expanded} onClick={e => e.stopPropagation()} dark={dark}>
          {options && options.length && options.length > 0 ?
            <OptionsScroll>
              {options.map((option, index) => <OptionButton key={index} value={option} onSelect={e => this.onSelect(e, option)} search={value} dark={dark} />)}
            </OptionsScroll>
            : null}
        </DropdownMenu>
      </InputWrapper>
    );
  }
}

const splitOption = (option, search) => {
  if(search === '') return option;
  let _option = option.toLowerCase();
  const _search = search.toLowerCase();
  if(!_option.includes(_search)) return option;
  let words = [], pointer = 0;
  while(_option.includes(_search)) {
    pointer = _option.search(_search);
    if(pointer === 0) {
      words.push(option.substring(0, _search.length));
      option = option.substring(_search.length, option.length);
      _option = _option.substring(_search.length, _option.length);
    } else {
      words.push(option.substring(0, pointer));
      option = option.substring(pointer, option.length);
      _option = _option.substring(pointer, _option.length);
    }
  }
  words.push(option);
  return (
    <span>
      {words.map((word, index) => (
        <span key={index}>
          {(word.toLowerCase() === _search) ? <b>{word}</b> : word}
        </span>
      ))}
    </span>
  );
};

const OptionButton = ({ value, onSelect, search, dark }) => {
  return (
    <Option onClick={() => onSelect(value)}>
      <OptionText dark={dark}>
        {value}
      </OptionText>
    </Option>
  );
};

const Option = styled.div`
  cursor: pointer;
`;

const OptionText = styled.p`
  font-size: 14px;
  padding: 5px 10px 5px 30px;
  margin: 0;
  &:hover {
    color: ${p => p.theme.colors.primary};
    background-color: ${p => p.theme.colors.gray.lighter};
  }
  ${p => p.dark && css`
    &:hover {
      background-color: #fff;
    }
  `}
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  border-radius: 0 3px;
  border-top: solid 1px ${p => p.theme.colors.gray.lighter};
  background-color: #fff;
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  z-index: 10;
  ${p => p.dark && css`
    background-color: #f0f4f8;
    border: solid 1px #dbe0e5;
    top: 100%;
  `}
  ${p => p.expanded && css`
    transform: scaleY(1);
    opacity: 1;
  `}
`;

const OptionsScroll = styled.div`
  max-height: 200px;
  overflow: auto;
  &::-webkit-scrollbar-track {
      border-radius: 2px;
      background-color: ${p => p.theme.colors.gray.light};
  }    
  &::-webkit-scrollbar {
      width: 3px;
      border-radius: 2px;
      background-color: ${p => p.theme.colors.gray.light};
  }    
  &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: ${p => p.theme.colors.primary};
      height: 100px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  ${p => p.dark && css`
    z-index: 200;
  `}
`;

const Input = styled.input`
  ${inputStyle}
  font-size: 14px;
  border-radius: 3px;
  height: 44px;
  flex-shrink: 0;
  &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.colors.gray.light};
    }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
  ${p => p.light && css`
    background: #fff;
  `}
  ${p => p.expanded && p.dark && css`
    z-index: 99;
    border: 1px solid #dbe0e5;
  `}
  ${p => p.theme.max('xs')`
    background: #fff;
    border-radius: 22px;
    border: solid 1px #e1e5e8;
  `};
`;

export default YearPicker;
