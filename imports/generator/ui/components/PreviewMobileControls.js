import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Heading as HeadingAtom } from '/imports/core/ui/atoms';
import { TemplatePicker } from '/imports/generator/ui/atoms';
import ColorSelect from '../components/ColorSelect';

class PreviewMobileControls extends PureComponent {
  render() {
    const {
      resume: {
        _id,
        settings: {
          color,
          template
        }
      }
    } = this.props;
    return (
      <PreviewCont>
        <Heading>Template</Heading>
        <TemplatePicker resume={this.props.resume} />
        <Heading>Color</Heading>
        <ColorsCont>
          <ColorSelect
              resumeId={_id}
              selected={color}
              template={template}
              withBorder
          />
        </ColorsCont>
      </PreviewCont>
    );
  }
}

const PreviewCont = styled.div`
  padding: ${p => p.theme.general.mobilePadding} 0;
`;

const Heading = styled(HeadingAtom)`
  && {
    color: white;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .2em;
    margin-bottom: 0;
    font-size: 12px;
  }
`;

const ColorsCont = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${p => p.theme.general.mobilePadding};
`;

export default PreviewMobileControls;
