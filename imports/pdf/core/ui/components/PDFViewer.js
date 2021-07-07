import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { pdf } from '/imports/pdf/core/ui/atoms';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { A4_WIDTH, A4_HEIGHT } from '/imports/pdf/core/api/constants';
import { A4_RATIO } from '/imports/generator/api/constants';

import templates from '/imports/pdf/core/api/templates';
import { LoaderContainer } from '/imports/generator/ui/atoms';
import { PDF_LOADER } from '/imports/generator/api/constants';
import { setSavingStatus } from '/imports/pdf/core/api/redux/actions';

const INITIAL_RETRY_DELAY = 100;
const MAX_RETRIES = 10;
const INCREASE_STEP = 100;

const poll = func => {
  [0, 100, 200, 300, 500, 700, 1000, 2000].forEach(delay => {
    setTimeout(() => {
      func();
    }, delay);
  });
};

@connect(
  null,
  dispatch => bindActionCreators({ setSavingStatus }, dispatch)
)
class PDFViewer extends PureComponent {
  static propTypes = {
    resume: PropTypes.object,
    width: PropTypes.number
  };

  state = {
    height: null
  };

  componentDidMount() {
    poll(this.setHeight); // Hack to handle proper resize
    window.addEventListener('resize', this.setHeight);
  }

  componentDidUpdate(prevProps, prevState) {
    this.setHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight);
  }

  setHeight = () => {
    const { width } = this.props;
    const { offsetHeight } = document.getElementById('preview-template');
    setTimeout(() => {
      this.setState({ height: offsetHeight * (width / A4_WIDTH) });
    }, 0);
  };

  render() {
    const { height } = this.state;
    const { resume, width } = this.props;
    const Template = templates[resume.settings.template];
    const scale = width / A4_WIDTH;
    return (
      <DocumentWrapper scale={scale} height={height}>
        <Template
          id="preview-template"
          resume={resume}
          setHeight={this.setHeight.bind(this)}
        />
      </DocumentWrapper>
    );
  }
}

const DocumentWrapper = styled.div`
  width: ${A4_WIDTH}px;
  height: ${p => (p.height ? `${p.height}px` : 'auto')};
  min-height: ${p => A4_HEIGHT * p.scale}px;
  transform: scale(${p => p.scale});
  transform-origin: top left;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export default PDFViewer;
