import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { Button } from '/imports/core/ui/atoms';

class HiddenDetails extends PureComponent {
  state = {
    collapsed: true,
    hidden: true
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.collapsed && prevState.collapsed) {
      this.setState({ hidden: false });
    } else if (this.state.collapsed && !prevState.collapsed) {
      this.setState({ hidden: true });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hiddenTimeout);
  }

  toggle = () => this.setState(st => ({ collapsed: !st.collapsed }));

  render() {
    const { collapsed, hidden } = this.state;
    return (
      <>
        <Collapsible collapsed={collapsed} hide={hidden}>
          {!collapsed && (
            <CollapsibleContent>
              {this.props.children}
            </CollapsibleContent>
          )}
        </Collapsible>
        <CollapseButton onClick={this.toggle}>
          {collapsed ? 'Show' : 'Hide'} additional details
        </CollapseButton>
      </>
    );
  }
}

const Collapsible = styled.div`
  position: relative;
  overflow: ${p => p.hide ? 'hidden' : 'visible'};
  ${p => p.collapsed && css`
    height: 0;
  `}
`;

const CollapsibleContent = styled.div``;

const CollapseButton = styled(p => <Button link {...p} />)`
  padding: 15px 0;
  margin-top: -10px;
  margin-bottom: 35px;
  font-weight: 400;
  font-size: 16px;
  display: block;
`;

export default HiddenDetails;
