import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Flex, Icon } from '/imports/core/ui/atoms';

class PageNavigator extends PureComponent {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number,
    onPreviousPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  render() {
    const {
      currentPage,
      numPages,
      onPreviousPage,
      onNextPage,
      className,
      preview
    } = this.props;
    return (
      <Flex alignItems="center" justifyContent="center" className={className}>
        <PaginationLeftButton
            visible={currentPage !== 1}
            onClick={onPreviousPage}
            preview={preview}
        >
          <Icon icon="chevron-left" />
        </PaginationLeftButton>
        <PaginationPageNumber preview={preview}>{`${currentPage} of ${numPages || 1}`}</PaginationPageNumber>
        <PaginationRightButton
            visible={currentPage !== numPages && numPages > 1}
            onClick={onNextPage}
            preview={preview}
        >
          <Icon icon="chevron-right" />
        </PaginationRightButton>
      </Flex>
    );
  }
}

const PaginationButton = styled(p => <Flex alignItems="center" justifyContent="center" {...p}/>)`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: white;
  border-radius: 14px;
  background-color: ${p => p.theme.colors.gray.regular};
  // transition: background-color 0.1s ease;
  font-family: ${p => p.theme.font.family.correctText};
  font-size: ${p => p.theme.font.size.h4};

  &:hover {
    background-color: ${p => p.theme.colors.gray.dark};
  }
`;

const PaginationLeftButton = styled(PaginationButton)`
  font-size: 14px;
  margin-right: 8px;
  ${p => p.preview && css`
    font-size: 19px;
  `}
`;

const PaginationRightButton = styled(PaginationButton)`
  font-size: 14px;
  ${p => p.preview && css`
    font-size: 19px;
  `}
`;

const PaginationPageNumber = styled.div`
  font-family: ${p => p.theme.font.family.correctText};
  font-size: 14px;
  text-align: center;
  color: white;
  line-height: 16px;
  letter-spacing: 0.3px;
  margin-right: 8px;
  ${p => p.preview && css`
    font-size: 19px;
  `}
`;

export default PageNavigator;
