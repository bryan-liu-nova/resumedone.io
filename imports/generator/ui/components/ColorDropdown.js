import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { TEMPLATES } from '/imports/generator/api/constants';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';
import { graphql } from 'react-apollo/index';
import { updateAfterDetailSave, updateDetailsOptimisticResponse } from '/imports/generator/api/apollo/client/helpers';
import { Radio } from '/imports/core/ui/atoms';

@graphql(UPDATE_RESUME_DETAIL)
class ColorDropdown extends PureComponent {
  state = {
    expanded: false
  };

  accentsHidden = () => {
    const { template } = this.props;
    const templateData = TEMPLATES.find(t => t.id === template);
    return templateData.accentsHidden;
  };

  toggleExpanded = () => {
    if (!this.accentsHidden()) {
      this.setState(st => ({ expanded: !st.expanded }));
    }
  };

  onChange = e => {
    const { resumeId, mutate } = this.props;
    mutate({
      variables: {
        docId: resumeId,
        path: 'settings.color',
        value: e.target.value
      },
      update: updateAfterDetailSave(resumeId),
      optimisticResponse: updateDetailsOptimisticResponse(resumeId, 'settings.color', e.target.value)
    }).then(() => {
      this.toggleExpanded();
    });
  };

  render() {
    const { expanded } = this.state;
    const { selected, template } = this.props;
    const { colors } = TEMPLATES.find(t => t.id === template);
    return (
      <ColorDropdownCont>
        <Selected onClick={this.toggleExpanded}>
          Color <Circle color={selected} hidden={this.accentsHidden()} />
        </Selected>
        <DropdownMenu expanded={expanded}>
          {colors.map(c => (
            <ColorRadio
                key={c}
                name="color"
                color={c}
                value={c}
                onChange={this.onChange}
                checked={selected === c}
            />
          ))}
        </DropdownMenu>
      </ColorDropdownCont>
    );
  }
}

const Circle = styled.div`
  display: inline-block;
  width: 26px;
  height: 26px;
  margin-left: 7px;
  border: 2px solid white;
  border-radius: 50%;
  background-color: ${p => !p.hidden ? p.theme.colors[p.color] : p.theme.colors.gray.light};
  cursor: pointer;
`;

const Selected = styled.p`
  margin: 0;
  font-size: 19px;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ColorDropdownCont = styled.div`
  position: relative;
  display: inline-block;
  width: 75px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 40px;
  background: ${p => p.theme.colors.black};
  width: 165px;
  border-radius: ${p => p.theme.general.borderRadius};
  padding: 10px;
  padding-right: 0;
  // transition: ${p => p.theme.transitions.fast};
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  z-index: ${p => p.theme.zIndex.popover};
  box-shadow: rgba(207, 214, 230, 0.7) 0px 14px 16px -10px, rgba(207, 214, 230, 0.12) 0px 20px 40px -8px;
  ${p => p.expanded && css`
    transform: scaleY(1);
    opacity: 1;
  `}
`;

const ColorRadio = styled(Radio)`
  width: 42px;
  height: 42px;
  background: ${p => p.theme.colors[p.color]};
  border: 0;
  margin-bottom: 4px;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
  ${p => p.color === 'black' && css`
    border: 1px solid ${p => p.theme.colors.gray.regular};
  `}
`;

export default ColorDropdown;
