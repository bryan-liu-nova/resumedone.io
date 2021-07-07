import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Box, Flex } from '/imports/core/ui/atoms';
import {
  CheckoutOneContainer as Container,
  CheckoutTextOne
} from '/imports/checkout/ui/atoms';

class Testimonial extends PureComponent {
  testimonials = [
    {
      src: '/img/checkout/avatar-1.png',
      text:
        '"Your site/program made it very easy to upgrade my resume to the standards that employers are looking for these days... My thanks to you all for giving 50+ adults a better chance at rebuilding our lives again."',
      author: 'Eddie Lobanovskiy'
    },
    {
      src: '/img/checkout/avatar-2.png',
      text:
        '"I love the templates! …Having coordinating letterhead for cover letters was great, too. Lots of compliments from the career advisors at my law school!"',
      author: 'Sansheng'
    }
  ];

  render() {
    return (
      <Section>
        <ContainerTestimonial>
          <TestimonialHeader>What people are saying</TestimonialHeader>
          <Flex wrap="wrap">
            {this.testimonials.map(({ src, text, author }) => (
              <Box md={12} key={author}>
                <Avatar src={src} />
                <TestimonialText>{text}</TestimonialText>
                <TestimonialAuthor>{author}</TestimonialAuthor>
              </Box>
            ))}
          </Flex>
        </ContainerTestimonial>
      </Section>
    );
  }
}

const Section = styled.section`
  border: solid 1px #dde4e8;
  background-color: #ffffff;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

const ContainerTestimonial = styled(Container)`
  padding: 90px 200px 160px;
`;

const TestimonialHeader = styled(p => (
  <CheckoutTextOne align="center" {...p} />
))`
  font-size: 36px;
  color: #3d4047;
  margin: 0 0 36px;
`;

const Avatar = styled.img`
  float: left;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 25px;
`;

const TestimonialText = styled(p => <CheckoutTextOne align="left" {...p} />)`
  font-size: 18px;
  line-height: 1.44;
  color: #3d4047;
  margin: 0 0 0 105px;
`;
const TestimonialAuthor = styled(p => <CheckoutTextOne align="left" {...p} />)`
  font-weight: 500;
  letter-spacing: 1px;
  color: #429ff0;
  margin: 15px 0 40px 105px;
  text-transform: uppercase;
`;

export default Testimonial;
