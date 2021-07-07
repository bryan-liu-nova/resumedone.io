import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

class Collapse extends PureComponent {
  state = {
    hidden: true
  };

  // componentDidUpdate(prevProps) {
  //   if (!this.props.collapsed && prevProps.collapsed) {
  //     this.setState({ hidden: false });
  //   } else if (this.props.collapsed && !prevProps.collapsed) {
  //     this.setState({ hidden: true });
  //   }
  // }

  render() {
    const { hidden } = this.state;
    const { collapsed } = this.props;
    return (
      <Collapsible {...this.props} hide={hidden}>
        {!collapsed && (
          <CollapsibleContent>
            {this.props.children}
          </CollapsibleContent>)
        }
      </Collapsible>
    )
  }
}

const Collapsible = styled.div`
  position: relative;
  z-index: 100;
  ${p => p.theme.max('md')`
    display: none;
  `}
`;

const CollapsibleContent = styled.div``;

export default Collapse;
