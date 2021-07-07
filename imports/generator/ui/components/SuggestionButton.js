import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import last from 'lodash/last';
import { Random } from 'meteor/random';
import { graphql, compose } from 'react-apollo';
import animateScrollTo from 'animated-scroll-to';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PERCENTAGE_IMPACT } from '/imports/generator/api/constants';
import { Button } from '/imports/core/ui/atoms';
import { ADD_BLOCK, ADD_BLOCK_ITEM } from '/imports/generator/api/apollo/client/mutations';
import { updateBlocksAfterItemAdd } from '/imports/generator/api/apollo/client/helpers';
import { focusElement} from '/imports/generator/api/helpers';
import { setExpandedItem } from '/imports/generator/api/redux/actions';

const scrollToElement = (name) => {
  const selector = PERCENTAGE_IMPACT.blocks[name] ? `#${name}` : `[name="${name}"]`;
  animateScrollTo(document.querySelector(selector), { offset: -50 });
  focusElement(selector);
};

@connect(
  null,
  dispatch =>
    bindActionCreators({ setExpandedItem }, dispatch)
)
@compose(
  graphql(ADD_BLOCK, { name: 'addBlock' }),
  graphql(ADD_BLOCK_ITEM, { name: 'addBlockItem' })
)
class SuggestionButton extends PureComponent {
  createElement = () => {
    const {
      suggestion: { name },
      resume,
      addBlock,
      addBlockItem,
      generator
    } = this.props;
    if (!PERCENTAGE_IMPACT.blocks[name]) {
      scrollToElement(name);
    } else {
      const block = resume.blocks.find(b => b.type === name);
      const animationKey = Random.id();
      if (block) {
        addBlockItem({
          variables: {
            resumeId: resume._id,
            blockId: block._id,
            animationKey
          },
          update: (cache, res) => {
            // if (res.data && res.data.addBlockItem) {
            //   const { addBlockItem: { resumeId, blockId, items } } = res.data;
            //   setStore({ expandedItem: `${resumeId}.${blockId}.${last(items).animationKey}` });
            //   scrollToElement(name);
            // }
            updateBlocksAfterItemAdd(cache, res);
          },
          optimisticResponse: addBlockItemOptimisticResponse(resume._id, block._id, animationKey)
        }).then(res => {
          if (res.data && res.data.addBlockItem) {
            const { addBlockItem: { resumeId, blockId, items } } = res.data;
            this.props.setExpandedItem(`${resumeId}.${blockId}.${last(items).animationKey}`);
            scrollToElement(name);
          }
        });
      } else {
        addBlock({
          variables: {
            resumeId: resume._id,
            blockType: name,
            animationKey
          }
        }).then(({ data: { addBlock } }) => {
          if (addBlock) {
            const block = last(addBlock.blocks);
            this.props.setExpandedItem(`${resume._id}.${block._id}.${last(block.items).animationKey}`);
            scrollToElement(name);
          }
        });
      }
    }
  };

  render() {
    const { suggestion, resume, ...rest } = this.props;
    return (
      <SuggestionButtonStyled {...rest} onClick={this.createElement}>
        {this.props.children}
      </SuggestionButtonStyled>
    )
  }
}


const SuggestionButtonStyled = styled(p => <Button unstyled {...p} />)`
  font-size: 16px;
  position: relative;
  flex: 1;
  text-align: right;
  overflow: hidden;
  ${p => p.hideMobile && p.theme.max('sm')`
    display: none;
  `}
  ${p => p.thin && css`
    font-weight: 400;
    color: ${p => p.theme.colors.gray.regular};
  `}
  &:hover {
    color: ${p => p.theme.colors.primary};
    span {
      color: ${p => p.theme.colors.primary} !important;
    }
  }
`;

export default SuggestionButton;
