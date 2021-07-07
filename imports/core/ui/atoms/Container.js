import styled, { css } from 'styled-components';
import { hiddenMixin } from '/imports/core/ui/helpers';

const Container = styled.section`
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: ${p => p.theme.general.containerWidth.md};
  ${p => p.relative && css`position: relative;`}
  ${p => p.theme.max('md')`
    width: 100%;
  `}
  ${p => p.theme.min('lg')`
    width: ${p => p.theme.general.containerWidth.lg};
  `}
  ${hiddenMixin}
`;

export default Container;
