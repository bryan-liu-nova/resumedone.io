import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Radio } from '/imports/core/ui/atoms';
import { TEMPLATES } from '/imports/generator/api/constants';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';
import { updateAfterDetailSave, updateDetailsOptimisticResponse } from '/imports/generator/api/apollo/client/helpers';
import { setSavingStatus } from '/imports/pdf/core/api/redux/actions';

@connect(
  null,
  dispatch =>
    bindActionCreators({ setSavingStatus }, dispatch)
)
@graphql(UPDATE_RESUME_DETAIL)
class ColorSelect extends PureComponent {
  accentsHidden = () => {
    const { template } = this.props;
    const templateData = TEMPLATES.find(t => t.id === template);
    return templateData.accentsHidden;
  };

  onChange = e => {
    if (this.accentsHidden()) return;
    const { resumeId, mutate, pdf } = this.props;
    this.props.setSavingStatus('SAVING');
    mutate({
      variables: {
        docId: resumeId,
        path: 'settings.color',
        value: e.target.value
      },
      update: updateAfterDetailSave(resumeId),
      optimisticResponse: updateDetailsOptimisticResponse(resumeId, 'settings.color', e.target.value)
    });
  };

  render() {
    const { selected, withBorder, template } = this.props;
    const { colors } = TEMPLATES.find(t => t.id === template);
    return (
      <RadioCont>
        {colors.map(c => (
          <ColorRadio
              key={c}
              name="color"
              color={c}
              value={c}
              onChange={this.onChange}
              checked={this.accentsHidden() ? (c === 'black') : (c === selected)}
              lockedText={this.accentsHidden() && c !== 'black' && 'This template doesn\'t support accent colors'}
              withBorder={withBorder}
          />
        ))}
      </RadioCont>
    );
  }
}

const RadioCont = styled.div`
  padding: 0 2px;
  margin-top: 10px;
`;

const ColorRadio = styled(Radio)`
  width: 42px;
  height: 42px;
  background: ${p => p.theme.colors[p.color]};
  border: 0;
  ${p => p.withBorder && p.color === 'black' && css`
    border: 1px solid ${p => p.theme.colors.gray.regular};
  `}
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

export default ColorSelect;
