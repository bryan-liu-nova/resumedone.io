import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Box, Flex } from '/imports/core/ui/atoms';
import {
  CheckoutOneContainer as Container,
  CheckoutTextOne,
  CheckoutIcon
} from '/imports/checkout/ui/atoms';

class Testimonial extends PureComponent {
  render() {
    return (
      <Section>
        <Container>
          <TestimonialHeader>
            Trusted by thousands of job seekers
          </TestimonialHeader>
          <Flex>
            <LeftTestimonial>
              <Quote>
                <CheckoutIcon.Quotes />
              </Quote>
              <TestimonialText left>
                Thank you so much for making my CV so easy. I loved all the
                options for job descriptions. By far the easiest CV ever. Thank
                you.
              </TestimonialText>
              <TestimonialAuthor>- Alicia</TestimonialAuthor>
            </LeftTestimonial>
            <RightTestimonial>
              <Quote>
                <CheckoutIcon.Quotes />
              </Quote>
              <TestimonialText right>
                Thank you so much for making my CV so easy. I loved all the
                options for job descriptions. By far the easiest CV ever. Thank
                you.
              </TestimonialText>
              <TestimonialAuthor>- Alicia</TestimonialAuthor>
            </RightTestimonial>
          </Flex>
        </Container>
      </Section>
    );
  }
}

const Section = styled.section`
  border: solid 1px #dde4e8;
  background-color: #ffffff;
  padding: 60px;
  ${({ theme }) => theme.max('md')`
     display: none;
  `}
`;

const TestimonialHeader = styled(p => (
  <CheckoutTextOne align="center" {...p} />
))`
  font-size: 36px;
  color: #3d4047;
  margin: 0 0 55px;
`;

const LeftTestimonial = styled(Box)`
  padding-left: 60px;
`;

const RightTestimonial = styled(Box)`
  padding-right: 60px;
`;

const Quote = styled(p => (
  <Flex alignItems="center" justifyContent="center" {...p} />
))`
  width: 33px;
  height: 33px;
  background-color: #345c6f;
  border-radius: 50%;
  color: white;
  margin: auto;
`;

const TestimonialText = styled(p => <CheckoutTextOne align="center" {...p} />)`
  line-height: 1.38;
  color: #5e6168;
  margin: 0;
  padding: 25px ${p => (p.left ? '25px' : 0)} 15px
    ${p => (p.right ? '25px' : 0)};
`;
const TestimonialAuthor = styled(p => (
  <CheckoutTextOne align="center" {...p} />
))`
  font-size: 17px;
  font-weight: 500;
  color: #3d4047;
`;

export default Testimonial;
