import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import debounce from 'lodash/debounce';

import { Flex, SvgIcon, AutocompleteInput } from '/imports/core/ui/atoms';
import { inputStyle } from '/imports/core/ui/mixins';
import Icon from '/imports/core/ui/atoms/ValidatedInputIcon';

class SuggestionInput extends PureComponent {
  state = {
    value: this.props.defaultValue || '',
    expanded: false,
    area: ''
  };

  componentDidMount() {
    if(this.props.startExpanded) {
      this.toggleExpanded();
      this._input.focus();
    }
  };

  _input = null;

  getInput = (node) => {
    this._input = node;
  };

  componentWillUnmount() {
    window.removeEventListener('click', this.windowClick);
  };

  windowClick = () => {
    this.setState({ expanded: false });
    window.removeEventListener('click', this.windowClick);
  };

  toggleExpanded = (e) => {
    if(e) e.stopPropagation();
    if (this.state.expanded === false) {
      window.addEventListener('click', this.windowClick);
    } else {
      window.removeEventListener('click', this.windowClick);
    }
    this.setState(st => ({ expanded: !st.expanded }));
  };

  toggleInnerClick = e => {
    e.stopPropagation();
  };

  onChange = debounce(value => {
    this.setState({ value }, () => {
      this.props.onChange({ target: { value }});
    });
  }, 300);

  onSelect = (value, selected) => {
    if(!selected) {
      this.setState({ value, expanded: false }, () => {
        this.props.onChange({ target: { value: this.state.value } });
      });
    }
  };

  onAreaChange = area => {
    this.setState({ area }, () => {
      const { onDataSelect } = this.props;
      if(onDataSelect) onDataSelect(this.state.area);
    });
  };

  addSuggestedSkill = () => {
    const { options, selectedOptions = [] } = this.props;
    const { area } = this.state;
    const availableOptions = options.filter(option => !selectedOptions.some(val => val === option));
    const select = availableOptions.length > 0 ? availableOptions[0] : '';
    this.onSelect(select);
  };

  render() {
    const { value, expanded, forceClose } = this.state;
    const { options = [], selectedOptions = [], areas = [], area, onDataChange, onDataSelect, lastJob } = this.props;
    return (
      <DropdownContent>
        <Input
          defaultValue={value}
          onChange={e => this.onChange(e.target.value)}
          onClick={e => { if(!expanded) this.toggleExpanded(e) }}
          ref={this.getInput}
        />
        <Icon empty={!value} hide={expanded} />
        <DropdownMenu expanded={expanded} onClick={this.toggleInnerClick}>
          <AutocompleteWrap>
            <AutocompleteInput
              options={areas}
              defaultValue={area}
              area={area}
              onSelect={this.onAreaChange}
              onDataChange={onDataChange}
              light
              lastJob={lastJob}
            />
          </AutocompleteWrap>
          <OptionsContainer>
            <OptionsScroll>
              {options.map((option, index) => {
                const selected = selectedOptions.some(val => val === option);
                return (
                  <OptionButton
                    key={index}
                    value={option}
                    onSelect={() => this.onSelect(option, selected)}
                    selected={selected}
                  />
                )}
              )}
            </OptionsScroll>
          </OptionsContainer>
        </DropdownMenu>
      </DropdownContent>
    );
  }
}

const OptionButton = ({ value, selected, onSelect, primary }) => {
  return (
    <Option onClick={onSelect}>
      <Decoration selected={selected}>
        {selected ? <SvgIcon.Minus /> : <SvgIcon.Plus />}
      </Decoration>
      <OptionText primary={primary}>
        {value}
      </OptionText>
    </Option>
  );
};

const DropdownContent = styled.div`
  position: relative;
  z-index: 100;
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 100%;
  top: 46px;
  border-radius: 3px;
  border: solid 1px #dbe0e5;
  background-color: ${p => p.theme.colors.gray.lighter};
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  ${p => p.expanded && css`
    transform: scaleY(1);
    opacity: 1;
  `}
`;

const OptionsContainer = styled.div`
  padding: 15px;
`;

const OptionsScroll = styled.div`
  max-height: 240px;
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

const AddSuggestedSkill = styled.div`
  padding: 10px 15px 0;
  border-bottom: solid 2px #dbe0e5;
`;

const Option = styled(p => <Flex {...p}/>)`
  padding-bottom: 10px;
  cursor: pointer;
  ${p => p.theme.max('xs')`
    flex-direction: row-reverse;
    padding: 8px;
    background: #fff;
    align-items: center;
  `};
`;

const Decoration = styled(p => <Flex alignItems="center" justifyContent="center" {...p}/>)`
  width: 16px;
  height: 16px;
  background: ${p => p.theme.colors.primary};
  margin-right: 9px;
  border-radius: 10px;
  margin-top: 2px;
  flex-shrink: 0;
  color: #fff;
  position: relative;
  ${p => p.selected && css`
    background: ${p => p.theme.colors.gray.light};
  `}
  & svg {
    position: absolute;
    top: -2px;
    left: 4px;
    width: 12px;
  }
`;

const OptionText = styled.div`
  flex-grow: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray.regular};
  ${p => p.primary && css`
    color: ${p => p.theme.colors.primary};
    font-size: 15px;
  `}
  ${p => p.theme.max('xs')`
    padding-right: 10px;
  `};
`;

const Input = styled.input`
  z-index: 99;
 ${inputStyle}
 && {
    ${({error, theme}) =>
  error &&
  css`
   border-color: ${theme.colors.red};
  `};
  }
}
`;

const AutocompleteWrap = styled.div`
  padding: 15px 15px 0;
`;

export default SuggestionInput;
