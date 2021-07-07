import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { Button } from '/imports/core/ui/atoms';
import { Selected, Icon } from './Select';
import InputStripe from './InputStripe';

class UserDropdown extends PureComponent {
  static propTypes = {
    selected: PropTypes.string,
    defaultSelected: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    dark: PropTypes.bool,
    stripe: PropTypes.bool,
  };

  state = {
    expanded: false,
    hovered: this.props.selected || '',
    selected: (this.props.options.find(o => o.value === this.props.defaultSelected)) || {},
  };


  componentWillUnmount() {
    window.removeEventListener('click', this.windowClick);
  }

  windowClick = () => {
    this.setState({ expanded: false });
    window.removeEventListener('click', this.windowClick);
  };

  toggleExpanded = (e) => {
    e.stopPropagation();
    if (this.state.expanded === false) {
      window.addEventListener('click', this.windowClick);
    } else {
      window.removeEventListener('click', this.windowClick);
    }
    this.setState(st => ({ expanded: !st.expanded }));
  };

  handleSelect = (option) => {
    this.props.onChange({ target: { value: option.value } });
    this.setState({ selected: option, expanded: false });
  };

  handleHover = (hovered) => {
    this.setState({ hovered });
  };

  title() {
    const { expanded, selected } = this.state;
    const { dark, placeholder } = this.props;
    if (dark && expanded) {
      return 'Template';
    }
    return selected.title || <span>{placeholder}</span>;
  }

  render() {
    const { expanded, selected, hovered } = this.state;
    const { options, dark, stripe, preview } = this.props;
    return (
      <DropdownContent dark={dark}>
        <Selected onClick={this.toggleExpanded} dark={dark} huge={preview}>
          {this.title()}
          <Icon icon={`chevron-${expanded ? 'up' : 'down'}`}/>
        </Selected>
        <InputStripe focus={stripe && expanded} />
        <DropdownMenu dark={dark} expanded={expanded} onClick={e => e.stopPropagation()}>
          {options.length && options.map(option => (
            <DropdownButton key={option.value} dark={dark}
                onMouseEnter={() => this.handleHover(option.value)}
                onClick={() => this.handleSelect(option)}
                selected={option.value === selected.value}
                hovered={hovered === option.value}
                preview={preview}
            >
              {option.title}
            </DropdownButton>
          )) || this.props.children()}
        </DropdownMenu>
      </DropdownContent>
    );
  }
}

const DropdownContent = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  > button {
    font-size: 32px;
  }
  ${p => p.dark && css`
    width: auto;
  `}
`;

const DropdownMenu = styled.div`
  z-index: 150;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 154px;
  background-color: ${p => p.theme.colors.gray.lighter};
  border-radius: ${p => `0 0 ${p.theme.general.borderRadius}px ${p.theme.general.borderRadius}px`};
  padding: 6px 0;
  // transition: ${p => p.theme.transitions.fast};
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  overflow: auto;
  box-shadow: rgba(207, 214, 230, 0.7) 0px 14px 16px -10px, rgba(207, 214, 230, 0.12) 0px 20px 40px -8px;
  &::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.colors.gray.regular};
    border: 4px solid ${p => p.theme.colors.gray.lighter};
    border-radius: 6px;
    ${p => p.dark && css`
      border-color: ${p => p.theme.colors.black};
    `}
    &:hover {
      background-color: ${p => p.theme.colors.primary};
    }
  }
  ${p => p.expanded && css`
    transform: scaleY(1);
    opacity: 1;
  `}
  ${p => p.dark && css`
    top: calc(100% + 17px);
    width: 170px;
    height: 176px;
    background-color: ${p => p.theme.colors.black};
    box-shadow: none;
    padding: 0 20px 7px 20px;
    // transition: opacity 0.12s ease 0s;
  `}
`;

const DropdownButton = styled(p => <Button {...p}/>)`
  text-align: left;
  width: 100%;
  display: block;
  color: ${p => p.theme.colors.black};
  font-size: 16px;
  font-weight: 400;
  padding: 6px 16px;
  line-height: 24px;
  background: transparent;
  border: 0;
  &:hover {
    box-shadow: none;
    color: ${p => p.theme.colors.primary};
    background: ${p => rgba(p.theme.colors.primary, 0.1)};
    border-radius: 0;
  }
  ${p => p.selected && css`
    color: ${p.theme.colors.gray.light};
  `}
  ${p => p.preview && css`
    font-size: 19px;
  `}
  ${p => p.hovered && css`
    color: ${p.theme.colors.primary};
    background: ${rgba(p.theme.colors.primary, 0.1)};
    border-radius: 0;
  `}
  ${p => p.dark && css`
    padding: 5px 0px;
    color: #ffffff;
    ${p.selected && css`
      color: ${p.theme.colors.gray.regular};
    `}
    &:hover {
      background: none;
    }
    ${p.hovered && css`
      background: none;
    `}
  `}
`;

export default UserDropdown;
