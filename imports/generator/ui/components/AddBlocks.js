import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Random } from 'meteor/random';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import last from 'lodash/last';
import { graphql } from 'react-apollo';
import animateScrollTo from 'animated-scroll-to';

import { Analytics } from '/imports/core/api/analytics';
import { BLOCKS_MAP } from '/imports/generator/api/form';
import { ADD_BLOCK } from '/imports/generator/api/apollo/client/mutations';
import { Flex, Box, Button as ButtonAtom } from '/imports/core/ui/atoms';
import { BLOCK_NAMES, REQUIRED_BLOCKS } from '/imports/generator/api/constants';
import { setExpandedItem } from '/imports/generator/api/redux/actions';
import { addBlockOptimistic, updateResume } from '/imports/generator/api/apollo/client/helpers';

@connect(
  null,
  dispatch =>
    bindActionCreators({ setExpandedItem }, dispatch)
)
@graphql(ADD_BLOCK)
class AddBlockButton extends PureComponent {
  addBlock = () => {
    const { mutate, type, resume, setExpandedItem } = this.props;
    const animationKey = Random.id();
    mutate({
      variables: {
        resumeId: resume._id,
        blockType: type,
        animationKey
      },
      // optimisticResponse: addBlockOptimistic(resume._id, type),
      // update: updateResume(resume._id, 'addBlock')
    }).then(({ data: { addBlock: { _id, blocks } } }) => {
      const block = last(blocks);
      if (block.type !== 'HOBBY') {
        setExpandedItem(`${_id}.${block._id}.${last(block.items).animationKey}`);
      }
      Analytics.track(`add_${block.items && block.items.length > 1 ? 'extra_' : ''}${type.toLowerCase()}`);
      const el = last(document.querySelectorAll('[data-add-block]'));
      if (el) {
        animateScrollTo(el, { offset: -50 });
        const lastCont = last(el.querySelectorAll('[data-item-cont]'));
        if (lastCont) {
          const input = lastCont.querySelector('input') || lastCont.querySelector('textarea');
          input.focus();
        }
      }
    });
  };

  render() {
    const { type, resume: { blocks }, icon: Icon } = this.props;
    const isAdded = type !== 'CUSTOM' ? !!blocks.find(b => b.type === type) : false;
    return (
      <AddButton
          onClick={this.addBlock}
          disabled={isAdded}
      >
        <AddButtonInner>
          <Icon /> {BLOCK_NAMES[type]}
        </AddButtonInner>
      </AddButton>
    )
  }
}

class AddBlocks extends PureComponent {
  render() {
    const { resume } = this.props;
    return (
      <Flex grid>
        {Object.entries(BLOCKS_MAP).filter(e => !REQUIRED_BLOCKS.includes(e[0])).map(([type, data]) => {
          return (
            <Box md={6} sm={6} xs={12} padded key={`add-${type}`}>
              <AddBlockButton
                  type={type}
                  icon={data.icon}
                  resume={resume}
              />
            </Box>
          )
        })}
      </Flex>
    );
  }
}

const AddButton = styled(p => <ButtonAtom unstyled {...p} />)`
  display: flex;
  align-items: center;
  text-align: left;
  margin-top: 8px;
  ${p => p.theme.max('sm')`
    
  `}
  &:hover {
    color: ${p => p.theme.colors.primary};
  }
  svg {
    position: relative;
    top: 5px;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    margin-right: 10px;
    path {
      stroke: ${p => p.theme.colors.primary};
      fill: ${p => p.theme.colors.primary};
    }
    ${p => p.theme.max('sm')`
      width: 36px;
    `}
  }
  &:disabled {
    background: transparent;
    color: ${p => p.theme.colors.gray.light};
    svg {
      path {
        stroke: ${p => p.theme.colors.gray.light};
        fill: ${p => p.theme.colors.gray.light};
      }
    }
  }
`;

const AddButtonInner = styled.span`
  display: flex;
  align-items: center;
  text-align: left;
  svg {
    position: relative;
    top: 5px;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    margin-right: 10px;
    path {
      stroke: ${p => p.theme.colors.primary};
      fill: ${p => p.theme.colors.primary};
    }
    ${p => p.theme.max('sm')`
      width: 36px;
    `}
  }
  &:disabled {
    background: transparent;
    color: ${p => p.theme.colors.gray.light};
    svg {
      path {
        stroke: ${p => p.theme.colors.gray.light};
        fill: ${p => p.theme.colors.gray.light};
      }
    }
  }
`;

export default AddBlocks;
