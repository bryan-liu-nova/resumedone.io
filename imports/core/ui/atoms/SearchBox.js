import React, { PureComponent, Component } from 'react';
import styled, { css } from 'styled-components';

import { SvgIcon, Flex, SearchInput, AutocompleteInput } from '/imports/core/ui/atoms';

import theme from '/imports/core/ui/theme';

const splitOption = option => {
  if(!option || !option.includes('[')) return option;
  let parts = [], start = 0, end = 0;
  while(option.includes('[')) {
    start = option.search('\\[');
    end = option.search('\\]');
    if(start === 0) {
      parts.push(option.substring(0, end + 1));
      option = option.substring(end + 1, option.length);
    } else {
      parts.push(option.substring(0, start));
      option = option.substring(start, option.length);
    }
  }
  parts.push(option);
  return (
    <span>
      {parts.map((part, index) => (
        <span key={index}>
          {(part.includes('[')) ?
            <span style={{ color: theme.colors.primary }}>
              {part}
            </span>
            : part}
        </span>
      ))}
    </span>
  );
};

class SearchBox extends PureComponent {
  state = {
    searchValue: '',
    open: true,
  };

  componentDidUpdate(prevProps) {
    if(prevProps.area !== this.props.area) {
      this.forceUpdate();
    }
    if(prevProps.data.length !== this.props.data.length) {
      this.props.updateUnchanged();
    }
  }

  onChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  onAreaChange = area => {
    const { onDataSelect } = this.props;
    if(onDataSelect) onDataSelect(area);
  };

  toggleOpen = () => {
    this.setState(st => ({ open: !st.open }));
  };

  renderSearchBar = () => {
    const { searchValue } = this.state;
    const {
      onDataChange,
      area,
      areas,
      simpleSearch,
      hideSearchBar,
      lastJob
    } = this.props;
    if (hideSearchBar) return null;
    return simpleSearch ? (
      <SearchInput
        value={searchValue}
        onChange={this.onChange}
      />
    ) : (
      <AutocompleteInput
        options={areas}
        defaultValue={area}
        onSelect={this.onAreaChange}
        onDataChange={onDataChange}
        area={area}
        areas={areas}
        lastJob={lastJob}
        showIcon
      />
    );
  };

  render() {
    const { searchValue, open } = this.state;
    const { data, simpleSearch, hideSearchBar, unchanged, onSelect } = this.props;
    const filteredData = simpleSearch
      ? (data || []).filter(p => p.text.toLowerCase().search(searchValue.toLowerCase()) !== -1)
      : data;
    const renderData = filteredData.map(p => ({ _id: p._id, value: p.text }));
    return (
      <Container>
        <HelpHeader>
          <p>Description examples</p>
          <span onClick={this.toggleOpen}>{open ? 'Close' : 'Open'}</span>
        </HelpHeader>
        <HelpContent open={open}>
          {this.renderSearchBar()}
          <Help fullSize={hideSearchBar}>
            <SearchList
              data={renderData}
              onSelect={onSelect}
              unchanged={unchanged}
            />
          </Help>
        </HelpContent>
      </Container>
    );
  }
}

class SearchList extends Component {
  shouldComponentUpdate(nextProps) {
    for (let key in nextProps) {
      if(nextProps[key] !== this.props[key]) return true;
    }
    return (
      this.props.data.length !== nextProps.data.length ||
      this.props.unchanged.length !== nextProps.unchanged.length
    );
  }

  render() {
    const { data, onSelect, unchanged } = this.props;
    return (
      data.map(({ _id, value, selected }, index) => (
        <SearchPhrase
          key={index}
          _id={_id}
          selected={unchanged.includes(_id)}
          value={value}
          onSelect={onSelect}
        />
      ))
    );
  }
}

class SearchPhrase extends PureComponent {
  onSelect = () => {
    const { _id, value, selected, onSelect } = this.props;
    onSelect(value, _id, selected);
  };

  render() {
    const { value, selected } = this.props;
    return (
      <PhraseCont onClick={this.onSelect}>
        <Decoration selected={selected}>
          {selected ? <SvgIcon.Minus /> : <SvgIcon.Plus />}
        </Decoration>
        <Phrase>
          {selected ? value : splitOption(value)}
        </Phrase>
      </PhraseCont>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  font-size: 12px;
  padding: 15px;
  ${p => p.theme.max('xs')`
     padding-top: 0;
   `};
`;

const HelpHeader = styled(p => <Flex alignItems="center" justifyContent="space-between" {...p}/>)`
    ${p => p.theme.min('xs')`
      display: none;
    `};
    & p {
      font-size: 14px;
    }
    & span {
      font-size: 11px;
      text-transform: uppercase;
      cursor: pointer;
    }
`;

const HelpContent = styled.div`
  // transition: all .25s;
  height: auto;
  ${p => !p.open && css`
      ${p => p.theme.max('xs')`
        height: 0;
        overflow: hidden;
      `};
  `}
`;

const Help = styled.div`
  overflow: auto;
  flex-grow: 1;
  padding-right: 10px;
  height: 210px;
  margin-top: 10px;
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
  ${p => p.fullSize && css`
    height: 250px;
  `}
  ${p => p.theme.max('xs')`
    padding-right: 0;
    height: 350px;
  `};
`;

const PhraseCont = styled(p => <Flex {...p}/>)`
  margin-bottom: 10px;
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
    background: #bac0c6;
  `}
  & svg {
    position: absolute;
    top: -2px;
    left: 4px;
    width: 12px;
  }
`;

const Phrase = styled.div`
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.gray.regular};
  ${p => p.theme.max('xs')`
    padding-right: 10px;
  `};
`;

export default SearchBox;
