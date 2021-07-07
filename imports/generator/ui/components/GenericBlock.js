import React, { PureComponent } from 'react';
import sortBy from 'lodash/sortBy';
import FlipMove from 'react-flip-move';

import Block from '/imports/generator/ui/components/Block';
import BlockItem from '/imports/generator/ui/components/BlockItem';

class GenericBlock extends PureComponent {
  render() {
    const {
      block,
      resume,
      resumeId,
      noTitle,
      getForm,
      isFormValid,
      isOnboarding,
      startExpanded
    } = this.props;
    return (
      <Block
          block={block}
          blockId={block._id}
          id={block.type}
          resumeId={resumeId}
          resume={resume}
          noTitle={noTitle}
          isFormValid={isFormValid}
          isOnboarding={isOnboarding}
      >
        {block.items && (
          <>
            {sortBy(block.items, 'order').map(item => (
              <BlockItem
                  key={item.animationKey}
                  type={block.type}
                  block={block}
                  items={block.items}
                  docType={block.type}
                  resume={resume}
                  item={item}
                  getForm={getForm}
                  isFormValid={isFormValid}
                  startExpanded={startExpanded}
              />
            ))}
          </>
        )}
      </Block>
    );
  }
}

export default GenericBlock;
