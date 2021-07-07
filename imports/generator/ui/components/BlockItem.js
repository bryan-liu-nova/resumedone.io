import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { graphql } from 'react-apollo';
import { ValidatorForm } from 'react-form-validator-core';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Flex, Box, Label } from '/imports/core/ui/atoms';
import { REORDER_BLOCK_ITEM, UPDATE_BLOCK_ITEM_FIELD, REMOVE_BLOCK_ITEM } from '/imports/generator/api/apollo/client/mutations';
import { BLOCKS_MAP } from '/imports/generator/api/form';
import { Collapse, ItemControlsMobileButton } from '/imports/generator/ui/atoms';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import BlockItemControls from './BlockItemControls';
import { withConfirm } from '/imports/core/api/confirm';
import {
  blockItemRemoveOptimistic,
  updateBlockItemsAfterRemove,
  updateBlockItemsAfterReorder,
  blockItemReorderOptimistic,
  updateBlockItemOptimisticResponse,
  updateAfterBlockItemFieldSave,
} from '/imports/generator/api/apollo/client/helpers';
import { focusElement} from '/imports/generator/api/helpers';
import { setExpandedItem } from '/imports/generator/api/redux/actions';
import { GET_RESUME } from '/imports/generator/api/apollo/client/queries';

@withConfirm
@connect(
  state => state.generator,
  dispatch =>
    bindActionCreators({ setExpandedItem }, dispatch)
)
@graphql(REORDER_BLOCK_ITEM, { name: 'reorder' })
@graphql(REMOVE_BLOCK_ITEM, { name: 'remove' })
class BlockItem extends PureComponent {
  _form = null;

  static propTypes = {
    getForm: PropTypes.func,
    isFormValid: PropTypes.func,
  };

  static defaultProps = {
    getForm: () => {},
  };

  moveUp = () => this.move('UP');

  moveDown = () => this.move('DOWN');

  move = direction => {
    const { resume, block: { _id: blockId }, item: { _id: itemId }, reorder } = this.props;
    const { _id: resumeId } = resume;
    reorder({
      variables: { resumeId, blockId, itemId, direction },
      update: updateBlockItemsAfterReorder(resumeId),
      optimisticResponse: blockItemReorderOptimistic(resume, blockId),
    });
  };

  remove = () => {
    const {
      resume,
      block: { _id: blockId },
      item: { _id: itemId },
      remove,
      confirm,
      getForm,
    } = this.props;
    const { _id: resumeId } = resume;
    confirm({
      title: 'Delete entry',
      text: 'Are you sure you want to delete this entry?',
      confirmText: 'Delete',
      onConfirm() {
        getForm();
        remove({
          variables: { resumeId, blockId, itemId },
          update: updateBlockItemsAfterRemove(resumeId),
          optimisticResponse: blockItemRemoveOptimistic(resume, blockId),
        });
      }
    });
  };

  componentDidUpdate(prevProps) {
    const {
      resume: { _id: resumeId },
      block: { type, _id: blockId },
      item: { _id, animationKey },
      expandedItem
    } = this.props;
    const {
      resume: { _id: prevResumeId },
      block: { _id: prevBlockId },
      item: { animationKey: prevAnimationKey },
    } = prevProps;
    const currentExpanded = `${resumeId}.${blockId}.${animationKey}`;
    const prevExpanded = `${prevResumeId}.${prevBlockId}.${prevAnimationKey}`;
    if (expandedItem === currentExpanded && currentExpanded !== prevExpanded) {
      const selector = `#${type}`;
      const content = `#${_id}`;
      focusElement(selector, content);
    }
  };

  isCollapsed = () => {
    const {
      resume: { _id: resumeId },
      block: { _id: blockId },
      item: { animationKey },
      expandedItem
    } = this.props;
    return expandedItem !== `${resumeId}.${blockId}.${animationKey}`;
  };

  toggleCollapsed = async () => {
    const {
      resume: { _id: resumeId },
      block: { _id: blockId },
      item: { animationKey },
      getForm,
      isFormValid,
    } = this.props;
    if (isFormValid) {
      const valid = await isFormValid();
      if (!valid) {
        return;
      }
    }
    if (this.isCollapsed()) {
      this.props.setExpandedItem(`${resumeId}.${blockId}.${animationKey}`);
      getForm(this._form);
    } else {
      this.props.setExpandedItem('');
    }
  };

  renderControls = isMobile => {
    const {
      item,
      items,
    } = this.props;
    if (isMobile) {
      return (
        <BlockControls>
          <ItemControlsMobileButton
              items={items}
              item={item}
              expand={this.toggleCollapsed}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
              remove={this.remove}
              isCollapsed={this.isCollapsed()}
              isMobile={isMobile}
          />
        </BlockControls>
      );
    }
    return (
      <BlockControls>
        <BlockItemControls
            items={items}
            item={item}
            expand={this.toggleCollapsed}
            moveUp={this.moveUp}
            moveDown={this.moveDown}
            remove={this.remove}
            isCollapsed={this.isCollapsed()}
        />
      </BlockControls>
    )
  };

  renderHobby = () => {
    const { resume, item, type, block } = this.props;
    const field = BLOCKS_MAP[type].fields[0];
    const FormComponent = field.component;
    const props = field.props || {};
    return (
      <Flex grid>
        <FormBox md={12} sm={12} xs={12} padded>
          <Label>{field.label}</Label>
          <FormComponent
              mutation={UPDATE_BLOCK_ITEM_FIELD}
              variables={{
                docId: resume._id,
                blockId: block._id,
                itemId: item._id,
                field: field.name
              }}
              optimisticResponse={updateBlockItemOptimisticResponse(resume._id, block._id, item._id, field.name)}
              update={updateAfterBlockItemFieldSave(resume._id)}
              value={(item.fields || {})[field.name]}
              {...props}
          />
        </FormBox>
      </Flex>
    );
  };

  getLastJob = () => {
    const {
      resume: {
        blocks,
        details: {
          title
        }
      }
    } = this.props;
    if(title) return title;
    const employment = blocks.find(block => block.type === 'EMPLOYMENT');
    if(!employment) return null;
    return employment.items && employment.items.length > 0 && employment.items[0].fields && employment.items[0].fields.title || null;
  };

  renderItems = () => {
    const {
      resume,
      block,
      type,
      docType,
      item,
      startExpanded,
    } = this.props;
    return BLOCKS_MAP[type].items.map(d => {
      const FormComponent = d.component;
      const props = d.props || {};
      const gridWidth = d.fullWidth ? 12 : 6;

      // We need that to check for dateRange component, that has multiple fields
      const value = (() => {
        if (Array.isArray(d.name)) {
          return d.name.map(n => (item.fields || {})[n]);
        }
        return (item.fields || {})[d.name];
      })();
      const skillsProps = type === 'SKILLS' ? {
        selectedOptions: block.items.map(item => item.fields != null && item.fields.skill || ''),
        lastJob: this.getLastJob(),
        startExpanded,
      } : {};
      if(type === 'EMPLOYMENT' && d.name === 'description') {
        props.lastJob = (item.fields || {}).title || null;
      }
      let refProps = {};
      if(d.childRef) refProps.ref = this.getRef;
      if(d.parentRef) refProps.getChild = this.getChildRef;
      return (
        <FormBox key={`${item._id}-form-${d.name}`} md={gridWidth} sm={gridWidth} xs={12} padded>
          {d.label && <Label form>{d.label}</Label>}
          <FormComponent
              type="text"
              mutation={UPDATE_BLOCK_ITEM_FIELD}
              name={d.name}
              docType={docType}
              variables={{
                docId: resume._id,
                blockId: block._id,
                itemId: item._id,
                field: d.name,
                needUpdate: d.needUpdate
              }}
              optimisticResponse={updateBlockItemOptimisticResponse(resume._id, block._id, item._id, d.name)}
              update={updateAfterBlockItemFieldSave(resume._id)}
              value={value}
              {...skillsProps}
              {...refProps}
              {...props}
          />
        </FormBox>
      );
    });
  };

  getForm = (node) => {
    this._form = node;
    this.props.getForm(node);
  };

  getRef = (node) => {
    this._ref = node;
  };

  getChildRef = () => {
    return this._ref;
  };

  render() {
    const { block, type, item, noTitle } = this.props;
    const isHobby = block.type === 'HOBBIES';
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <ItemCont noBorder={isHobby} data-item-cont>
            {isHobby && this.renderHobby() || (
              <ItemTitle>
                <p onClick={this.toggleCollapsed}>
                  {BLOCKS_MAP[type].getItemTitle(this.props.item)}
                </p>
                {this.renderControls(isMobile)}
              </ItemTitle>
            )}
            {(!isMobile && !isHobby) ? (
              <Collapse id={item._id} collapsed={this.isCollapsed()}>
                <ValidatorForm ref={this.getForm} onSubmit={() => {}}>
                  <FormFlex grid>
                    {this.renderItems()}
                  </FormFlex>
                </ValidatorForm>
              </Collapse>
              ) : null
            }
          </ItemCont>
        )}
      </ResponsiveConsumer>
    );
  }
}

const BlockControls = styled.div`
  position: relative;
`;

const FormFlex = styled(Flex)`
  padding-bottom: 14px;
`;

const FormBox = styled(Box)`
  margin-bottom: 10px;
`;

const ItemCont = styled.div`
  ${p => !p.noBorder && css`
    border-top: 1px solid ${p => p.theme.colors.blockItemBorder};
  `}
`;

const ItemTitle = styled(Flex)`
  align-items: center;
  background: white;
  &:hover {
    button {
      color: ${p => p.theme.colors.primary};
      display: inline-block;
    }
  }
  > div, p {
    flex-shrink: 0;
  }
  button {
    font-size: 1.15em;
  }
  p {
    margin: 0;
    padding: 14px 0;
    flex-grow: 1;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: ${p => p.theme.colors.primary};
    }
  }
`;

export default BlockItem;
