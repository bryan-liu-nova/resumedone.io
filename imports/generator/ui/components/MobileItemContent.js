import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Modal, Button, Heading as HeadingAtom, Icon, Text, Label, Box, Flex } from '/imports/core/ui/atoms';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import { BLOCKS_MAP } from '/imports/generator/api/form';
import { UPDATE_BLOCK_ITEM_FIELD } from '/imports/generator/api/apollo/client/mutations';
import { ValidatorForm } from 'react-form-validator-core';
import { setExpandedItem } from '/imports/generator/api/redux/actions';
import { setSavingStatus } from '/imports/pdf/core/api/redux/actions';

@connect(
  state => state.generator,
  dispatch =>
    bindActionCreators({ setExpandedItem, setSavingStatus }, dispatch)
)
class MobileItemContent extends PureComponent {
  isFormValid = () => this._form && this._form.isFormValid(false) || Promise.resolve(true);
  close = async () => {
    if (await this.isFormValid()) {
      this.props.setExpandedItem('');
    }
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

  renderItems = ({ resume, block, item, type }) => {
    return BLOCKS_MAP[block.type].items.map(d => {
      const FormComponent = d.component;
      const props = d.props || {};

      // We need that to check for dateRange component, that has multiple fields
      const value = (() => {
        if (Array.isArray(d.name)) {
          return d.name.map(n => (item.fields || {})[n]);
        }
        return (item.fields || {})[d.name];
      })();
      const skillsProps = type === 'SKILLS' ? {
        selectedOptions: block.items.map(item => item.fields && item.fields.skill || ''),
        lastJob: this.getLastJob(),
      } : {};
      if(type === 'EMPLOYMENT' && d.name === 'description') {
        props.lastJob = (item.fields || {}).title || null;
      }
      let refProps = {};
      if(d.childRef) refProps.ref = this.getRef;
      if(d.parentRef) refProps.getChild = this.getChildRef;
      return (
        <FormBox key={`${item._id}-form-${d.name}`} md={12} sm={12} xs={12}>
          {d.label && <Label>{d.label}</Label>}
          <FormComponent
              type="text"
              mutation={UPDATE_BLOCK_ITEM_FIELD}
              variables={{
                docId: resume._id,
                blockId: block._id,
                itemId: item._id,
                field: d.name
              }}
              value={value}
              {...props}
              {...refProps}
              {...skillsProps}
          />
        </FormBox>
      );
    });
  };

  getForm = (node) => {
    this._form = node;
  };

  getRef = (node) => {
    this._ref = node;
  };

  getChildRef = () => {
    return this._ref;
  };

  render() {
    const { expandedItem, resume } = this.props;
    if (!expandedItem) return null;
    const [_, blockId, itemAnimationKey] = expandedItem.split('.');
    const block = resume.blocks.find(b => b._id === blockId);
    const item = block.items.find(i => i.animationKey === itemAnimationKey);
    return (
      <ModalCont {...this.props} animation="empty" fullScreen>
        <Close onClick={this.close}>
          <Icon icon="chevron-left" />
        </Close>
        <Heading level={3}>{BLOCK_NAMES[block.type]}</Heading>
        <Title>{BLOCKS_MAP[block.type].getItemTitle(item)}</Title>
        <ValidatorForm id={item._id}  ref={this.getForm} onSubmit={() => {}}>
          {this.renderItems({ resume, block, item, type: block.type })}
        </ValidatorForm>
      </ModalCont>
    );
  }
}

const ModalCont = styled(Modal)`
  button {
    color: white;
    margin: 0 0 18px 10px;
    &:first-of-type {
      margin-top: 15px;
    }
    i {
      margin-right: 10px;
      margin-left: -2px;
    }
  }
`;

const Close = styled(p => <Button unstyled {...p} />)`
  position: absolute;
  top: ${p => p.theme.general.mobilePadding};
  left: ${p => p.theme.general.mobilePadding};
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 33px;
  border-radius: 50%;
  padding: 0;
  font-size: 22px;
  margin: 0 !important;
  z-index: 300;
  background: ${p => lighten(0.52, p.theme.colors.primary)};
  i {
    position: relative;
    left: 1px;
    margin-right: 0 !important;
  }
  && {
    color: ${p => p.theme.colors.primary};
  }
`;

const Heading = styled(HeadingAtom)`
  margin-top: ${p => p.theme.general.mobilePadding};
  text-align: center;
  margin-bottom: 0;
`;

const Title = styled(Text)`
  margin-top: 0;
  text-align: center;
  color: ${p => p.theme.colors.gray.regular};
  font-size: 14px;
  margin-bottom: 5vw;
`;

const FormBox = styled(Box)`
  margin-bottom: 10px;
  padding: 0 ${p => p.theme.general.mobilePadding};
`;

export default MobileItemContent;
