import React, { Component } from 'react';
import styled from 'styled-components';

class Page extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return <PageCont {...this.props}>{this.props.children}</PageCont>;
  }
}

const PageCont = styled.section`
  display: block;
`;

export default Page;
