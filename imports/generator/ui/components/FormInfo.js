import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import last from 'lodash/last';

import { PERCENTAGE_IMPACT, BLOCK_NAMES } from '/imports/generator/api/constants';
import { Flex, Box, Button, SvgIcon } from '/imports/core/ui/atoms';
import SuggestionButton from '/imports/generator/ui/components/SuggestionButton';

const getColor = percentage => {
  if (percentage >= 70) return 'success';
  else if (percentage >= 30 && percentage < 70) return 'warning';
  return 'danger';
};

const getTotalBlockPercentage = (type, length, weights) => {
  return Array(length).fill().reduce((res, _, i) => res + getPercentageByIndex(type, i, weights) , 0);
};

const getPercentageByIndex = (type, index, weights) => {
  if (index + 1 > weights.length) return last(weights);
  return weights[index];
};


const getPercentage = resume => {
  let percentage = 10;
  if (resume.details.professionalSummary) {
    percentage += PERCENTAGE_IMPACT.professionalSummary
  }
  if (resume.details.title) {
    percentage += PERCENTAGE_IMPACT.title;
  }
  Object.entries(PERCENTAGE_IMPACT.blocks).forEach(([type, weights]) => {
    const addedToResume = resume.blocks.find(b => b.type === type);
    if (!addedToResume) return;
    const itemsLength = (addedToResume.items || []).length;
    if (!itemsLength) return;
    percentage += getTotalBlockPercentage(type, itemsLength, weights);
  });
  return percentage > 100 ? 100 : percentage;
};

const sortSuggestions = (a, b) => {
  if (a.percentage > b.percentage) return -1;
  else if (a.percentage < b.percentage) return 1;
  else {
    const keys = Object.keys(PERCENTAGE_IMPACT.blocks);
    if (keys.indexOf(a.name) > keys.indexOf(b.name)) return -1;
    else if (keys.indexOf(a.name) > keys.indexOf(b.name)) return 1;
    return 0;
  }
};

const getSuggestions = resume => {
  const res = [];
  if (!resume.details.professionalSummary) {
    res.push({ name: 'professionalSummary', percentage: PERCENTAGE_IMPACT.professionalSummary });
  }
  if (!resume.details.title) {
    res.push({ name: 'title', percentage: PERCENTAGE_IMPACT.title });
  }
  Object.entries(PERCENTAGE_IMPACT.blocks).forEach(([type, weights]) => {
    const addedToResume = resume.blocks.find(b => b.type === type);
    if (!addedToResume) {
      res.push({
        name: type,
        percentage: weights[0]
      });
    } else if (addedToResume.items) {
      res.push({
        name: type,
        percentage: getPercentageByIndex(type, addedToResume.items.length, weights)
      });
    } else {
      res.push({
        name: type,
        percentage: getPercentageByIndex(type, 0, weights)
      });
    }
  });
  return res.sort(sortSuggestions).slice(0, 6);
};

const SUGGESTIONS_NAMES = {
  ...BLOCK_NAMES,
  professionalSummary: 'professional summary',
  title: 'title'
};

class FormInfo extends PureComponent {
  state = {
    expanded: false,
    weights: [],
    isFixed: false,
    left: 0,
    width: 0,
  };
  componentDidMount() {
    this.handleResize();
    const el = document.getElementById('scroll-cont');
    el.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    const el = document.getElementById('scroll-cont');
    el.removeEventListener('scroll', this.handleScroll);
    el.removeEventListener('resize', this.handleResize);
    window.removeEventListener('click', this.windowClick);
  }

  getContainerRef = (node) => {
    this.container = node;
  };

  handleScroll = e => {
    if (!this.container) return;
    if (this.container.offsetTop < e.target.scrollTop && !this.state.isFixed) {
      this.setState({ isFixed: true });
    }
    if (this.container.offsetTop >= e.target.scrollTop && this.state.isFixed) {
      this.setState({ isFixed: false });
    }
  };

  handleResize = () => {
    if (!this.container) return;
    const left = this.container.offsetLeft;
    const width = this.container.offsetWidth;
    this.setState({ left, width });
  };

  windowClick = () => {
    this.setState({ expanded: false });
    window.removeEventListener('click', this.windowClick);
  };

  toggleExpanded = (e) => {
    e.stopPropagation();
    if(this.state.expanded === false) {
      window.addEventListener('click', this.windowClick);
    } else {
      window.removeEventListener('click', this.windowClick);
    }
    this.setState(st => ({ expanded: !st.expanded }));
  };

  render() {
    const { isFixed, left, width, expanded } = this.state;
    const { resume } = this.props;
    const percentage = getPercentage(resume);
    const suggestions = getSuggestions(resume);
    return (
      <FormContainer ref={this.getContainerRef}>
        <Wrapper isFixed={isFixed} left={left} width={width}>
          <Flex>
            <Title>
              <Percent color={getColor(percentage)}>{percentage}</Percent>
              Profile completeness
            </Title>
            <Suggestion>
              <SuggestionButton suggestion={suggestions[0]} resume={resume} hideMobile thin>
                <Percent color={this.props.points > 70 ? 'regular' : 'success'}>+{suggestions[0].percentage}</Percent>
                Add {SUGGESTIONS_NAMES[suggestions[0].name].toLowerCase()}
              </SuggestionButton>
              <Expand expanded={expanded} onClick={this.toggleExpanded}>
                {expanded ? <SvgIcon.HintClose/> : <SvgIcon.Hint/>}
              </Expand>
            </Suggestion>
          </Flex>
          <Stripe percentage={percentage} />
          <Expanded expanded={expanded} onClick={e => e.stopPropagation()}>
            <Flex grid>
              {suggestions.map(s => (
                <Box md={6} padded key={`suggestion-${s.name}`}>
                  <SuggestionButton suggestion={s} resume={resume}>
                    <span>{s.percentage}%</span> Add {SUGGESTIONS_NAMES[s.name].toLowerCase()}
                  </SuggestionButton>
                </Box>
            ))}
            </Flex>
          </Expanded>
        </Wrapper>
      </FormContainer>
    );
  }
}

const Expand = styled(p => <Button unstyled {...p} />)`
  width: 26px;
  height: 20px;
  color: ${({ expanded, theme }) => expanded && theme.colors.primary || theme.colors.success};
  margin-left: 16px;
  position: relative;
  cursor: pointer;
  // transition: background-color 0.1s ease;
  
  &:hover {
    color: ${p => p.theme.colors.primary};
  }

  & > svg {
    width: 100%;
    height: 100%;
  }
`;


const Expanded = styled.div`
  position: absolute;
  top: 51px;
  padding: ${p => p.theme.general.gridGap} calc(${p => p.theme.general.gridGap} * 2);
  z-index: ${p => p.theme.zIndex.popover};
  width: 100%;
  background: ${p => p.theme.colors.gray.lighter};
  min-height: 100px;
  border-bottom-left-radius: ${p => p.theme.general.borderRadius};
  border-bottom-right-radius: ${p => p.theme.general.borderRadius};
  box-shadow: rgba(207, 214, 230, 0.7) 0px 14px 16px -10px, rgba(207, 214, 230, 0.12) 0px 20px 40px -8px;
  // transition: ${p => p.theme.transitions.fast};
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  ${p => p.expanded && css`
    transform: scaleY(1);
    opacity: 1;
  `}
  button {
    margin-bottom: calc(${p => p.theme.general.gridGap} / 2);
  }
  ${p => p.theme.max('lg')`
    top: 51px;
  `}
  ${p => p.theme.max('sm')`
    padding: ${p => p.theme.general.gridGap};
  `}
`;

const Stripe = styled.div`
  position: relative;
  height: 3px;
  background: ${p => p.theme.colors.gray.lighter};
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: ${p => p.percentage || 0}%;
    left: 0;
    top: 0;
    background: ${p => p.theme.colors[getColor(p.percentage)]};
  }
`;

const Title = styled(Flex)`
  margin-right: 8px;
  margin-bottom: 8px;
  color: ${p => p.theme.colors.gray.regular};
  font-size: 16px;
  line-height: 20px;
`;

const Percent = styled.span`
  font-size: 14px;
  line-height: 20px;
  display: inline-block;
  font-weight: 600;
  margin-right: 6px;
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.gray[color]};
  
  &:after {
    margin-left: 2px;
    content: '%';
  }
`;

const Suggestion = styled(p => <Flex alignItems="center" justifyContent="flex-end" {...p} />)`
  flex: 1;
  margin-bottom: 8px;
`;

const FormContainer = styled.div`
  display: block;
  user-select: none;
  height: 71px;
  margin-bottom: 12px;
  position: relative;
`;

const FixedWrapper = css`
  position: fixed;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  right: auto;
`;

const Wrapper = styled.div`
  display: block;
  background-color: white;
  padding: 20px 0 16px;
  top: 0;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1000;
  ${({ isFixed }) => isFixed && FixedWrapper || ''};
`;


export default FormInfo;
