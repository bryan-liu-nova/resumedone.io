import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { Random } from 'meteor/random';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Label, SwitchAutosave, EditableTitle } from '/imports/core/ui/atoms';
import { ControlsMobileButton } from '/imports/generator/ui/atoms';
import { REMOVE_BLOCK, REORDER_BLOCK, ADD_BLOCK_ITEM, UPDATE_BLOCK_FIELD } from '/imports/generator/api/apollo/client/mutations';
import { BLOCKS_MAP } from '/imports/generator/api/form';
import {
  updateBlocksAfterReorder,
  updateBlocksAfterRemove,
  blockReorderOptimistic,
  blockRemoveOptimistic,
  updateBlocksAfterItemAdd,
  addBlockItemOptimisticResponse
} from '/imports/generator/api/apollo/client/helpers';
import { AddBlockButton, BlockTitle as BlockTitleAtom } from '/imports/generator/ui/atoms';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { focusElement} from '/imports/generator/api/helpers';
import BlockControls from './BlockControls';
import last from 'lodash/last';
import { withConfirm} from '/imports/core/api/confirm';
import { BLOCK_ADD_ITEM_NAMES } from '/imports/generator/api/constants';
import { setExpandedItem } from '/imports/generator/api/redux/actions';
import { setSavingStatus } from '/imports/pdf/core/api/redux/actions';
import { Analytics } from '/imports/core/api/analytics';

const getBlockAddEvent = type => `add_${type ? type.toLowerCase() : 'block'}`;

@withRouter
@connect(
  null,
  dispatch =>
    bindActionCreators({ setExpandedItem, setSavingStatus }, dispatch)
)
@withConfirm
@compose(
  graphql(REORDER_BLOCK, { name: 'reorder' }),
  graphql(REMOVE_BLOCK, { name: 'remove' }),
  graphql(ADD_BLOCK_ITEM, { name: 'addBlockItem' }),
  graphql(UPDATE_BLOCK_FIELD, { name: 'updateBlockField' })
)
class Block extends PureComponent {
  static propTypes = {
    isFormValid: PropTypes.func,
  };

  state = {
    titleEditMode: false
  };

  toggleEditMode = () => {
    this.setState(st => ({ titleEditMode: !st.titleEditMode }));
  };

  moveUp = () => this.move('UP');

  moveDown = () => this.move('DOWN');

  move = direction => {
    const { resumeId, blockId, reorder, resume } = this.props;
    reorder({
      variables: { resumeId, blockId, direction },
      optimisticResponse: blockReorderOptimistic(resume, blockId, direction),
      update: updateBlocksAfterReorder(resumeId)
    });
  };

  remove = () => {
    const { resumeId, blockId, remove, confirm, resume } = this.props;
    confirm({
      title: 'Delete section',
      text: 'Are you sure you want to delete this section?',
      confirmText: 'Delete',
      onConfirm() {
        remove({
          variables: { resumeId, blockId },
          update: updateBlocksAfterRemove(resumeId),
          optimisticResponse: blockRemoveOptimistic(resume, blockId)
        });
      }
    });
  };

  updateTitle = value => {
    this.props.setSavingStatus('SAVING');
    const { resumeId, blockId, updateBlockField } = this.props;
    updateBlockField({
      variables: {
        docId: resumeId,
        blockId,
        field: 'title',
        value
      },
    });
  };

  addBlockItem = async () => {
    const {
      resumeId,
      blockId,
      addBlockItem,
      generator,
      block: { type },
      location: { pathname },
      isFormValid,
    } = this.props;
    if (isFormValid) {
      const valid = await isFormValid();
      if (!valid) {
        return;
      }
    }
    const animationKey = Random.id();
    Analytics.track(getBlockAddEvent(type), { context: last(pathname.split('/')) });
    addBlockItem({
      variables: { resumeId, blockId, animationKey },
      update: (cache, res) => {
        updateBlocksAfterItemAdd(cache, res);
        if (res.data && res.data.addBlockItem) {
          const { addBlockItem: { resumeId, blockId } } = res.data;
        }
      },
      optimisticResponse: addBlockItemOptimisticResponse(resumeId, blockId, animationKey)
    }).then(res => {
      if (res.data && res.data.addBlockItem) {
        const { addBlockItem: { resumeId, blockId, items } } = res.data;
        this.props.setExpandedItem(`${resumeId}.${blockId}.${last(items).animationKey}`);
        const selector = `#${type}`;
        focusElement(selector);
      }
    });
  };

  renderSwitch = (label, name) => {
    const { resumeId, blockId, block } = this.props;
    return (
      <SwitchAutosave
          key={`switch-${name}`}
          mutation={UPDATE_BLOCK_FIELD}
          variables={{
            docId: resumeId,
            blockId,
            field: name,
            needUpdate: true,
          }}
          label={label}
          value={block[name]}
      />
    );
  };

  renderBlockControls = isMobile => {
    const { block, resume } = this.props;
    const hideControls = block.required && block.fixedOrder != null;
    if (hideControls) return null;
    if (isMobile) {
      return (
        <BlockControlsCont>
          <ControlsMobileButton
              block={block}
              resume={resume}
              toggleEditMode={this.toggleEditMode}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
              remove={this.remove}
          />
        </BlockControlsCont>
      );
    }
    return (
      <BlockControlsCont>
        <BlockControls
            block={block}
            resume={resume}
            toggleEditMode={this.toggleEditMode}
            moveUp={this.moveUp}
            moveDown={this.moveDown}
            remove={this.remove}
        />
      </BlockControlsCont>
    );
  };

  render() {
    const {
      id,
      block: {
        title,
        type
      },
      noTitle
    } = this.props;
    const { titleEditMode } = this.state;
    const isHobby = type === 'HOBBIES';
    const isCustom = type === 'CUSTOM';
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <BlockCont id={id} data-add-block>
            {!noTitle && <BlockTitle>
              {!isCustom ? title : (
                <EditableTitle
                    controlled
                    onSave={this.updateTitle}
                    toggleEditable={this.toggleEditMode}
                    editable={titleEditMode}
                    defaultValue={title}
                />
              )}
              {' '}
              {this.renderBlockControls(isMobile)}
            </BlockTitle>}
            <BlockBody>{this.props.children}</BlockBody>
            {!isHobby && <AddBlockButton onClick={this.addBlockItem}><AddBlockInner><PlusIcon /> Add {BLOCK_ADD_ITEM_NAMES[type]}</AddBlockInner></AddBlockButton>}
            {BLOCKS_MAP[type].afterText && <AfterText>{BLOCKS_MAP[type].afterText}</AfterText>}
            {(BLOCKS_MAP[type].additionalFlags || []).map(f => this.renderSwitch(f.label, f.name))}
          </BlockCont>
        )}
      </ResponsiveConsumer>
    );
  }
}

const BlockCont = styled.div`
  padding: 10px 0;
  background: white;
`;

const AfterText = styled(Label)`
  margin-top: 12px;
`;

const BlockControlsCont = styled.div`
  margin-left: 4px;
  > button {
    margin-left: 4px;
    font-size: 1.15em;
    color: ${p => p.theme.colors.gray.light};
    &:hover {
      color: ${p => p.theme.colors.primary};
    }
  }
`;

const BlockTitle = styled(BlockTitleAtom)`
  display: flex;
  padding: 10px 0;
`;

const BlockBody = styled.div`
  position: relative;
`;

const PlusIcon = styled.span`
  background-image: url(/img/ui/wizard/plus-outline.svg);
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 5px;
`;

const AddBlockInner = styled.span`
  display: flex;
  align-items: center;
`;

export default Block;
