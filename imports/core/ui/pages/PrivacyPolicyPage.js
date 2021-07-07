import React, { PureComponent } from 'react';
import MarkDown from 'react-markdown';
import styled from 'styled-components';
import { Analytics } from '/imports/core/api/analytics';

const policy = `
# PRIVACY POLICY

Great Ponton Limited is a limited company incorporated under Irish law and registered with the
Trade and Companies Registry of Ireland under number 644795, with registered office at 32 Merrion
Street Upper, Dublin 2, Ireland (**“Resumedone“**, or **“we“**).

In this Privacy Policy, the term &quot;personal data&quot; refers to any information that identifies or could
reasonably be used to identify a natural person. In addition to this Cookie Policy, please also refer to
[our Terms and Conditions](/terms-and-conditions) and our Cookie Policy. Together, these documents
show how we use your personal data.

Please read this Privacy Policy carefully to understand our practices regarding your personal data.
Defined terms used in this Privacy Policy have the same meaning given to them in our Terms and
Conditions

## 1. HOW WE COLLECT YOUR PERSONAL DATA.

As a platform for accessing a database, we receive personal data in the performance of our Services. 
Some of the personal data we collect and process includes:

#### Personal data that you communicate to us, including:
* Registration. We collect your first and last name and e-mail address to create your user Account
and to sign up for the Services we provide on our Website.

* Your Customer Area. There are a number of options available to you regarding the information
in your profile and space and the information you provide in the Document Builder. You can
provide us with additional personal data when you view and interact with our features, and
functionality, including posting your resume, career profile, educational history, cover letters or
other information.

* Technical information. We keep a record of all correspondence between you and us, including
the information you send when you report a technical problem concerning our Website or our
service.

* Any other information that you can send us. 

* Information we automatically collect from a third-party source, including technical
information. When you visit our Website, we collect information about the devices you use and
the networks you are connected to. This technical information includes your IP address, your
login information, the bandwidth you use, the time of your visit, the type and version of your
browser, the types and versions of your browser add-ons, plug-ins, your operating system,
information about your visit, including upload / download errors, and the pages you visited. We
collect this information by means of various technologies, such as cookies (see our Cookie Policy).

## 2. DURATION DURING WHICH WE RETAIN YOUR PERSONAL DATA.

We keep your personal data as long as you have an Account with us. If you close your Account, your
personal data will be immediately deleted.

If your Account is suspended or blocked, we will retain your personal data for a period of two years
to prevent you from violating the terms and conditions of our Website.

In addition, we may retain your personal data for an additional period of time to the extent
necessary for us to assert legal rights or to defend against them.

## 3. HOW WE USE YOUR PERSONAL DATA.

#### We use your personal data to provide, support and expand our Services, including to:

* provide services by us or between you or us and our third party service providers (for example,
payment processing) to provide you with the Services requested;

* allow you to customise your Account, Personalised Documents, profile and your Customer Area;

* send you information related to our Services (for example, a confirmation of your registration) by email and / or by any other means of communication;

* give you access to our support Services so that you can communicate with us;

* preserve the security of our Website;

* inform you of the changes made to our Services;

* manage our Website, including for problem solving, access, data analysis, testing, research,
investigation and analytics purposes;

* improve our Website to ensure that content is presented in the most efficient way possible; and

* comply with our legal obligations, including orders and other legal or regulatory requirements.

## 4. HOW WE SHARE YOUR PERSONAL DATA.

We work with third parties who are the recipients of your personal data, such as our subcontractors,
who are technical service providers (for example in the field of payment processing, management
and data transmission systems and content, search engine providers, etc.) or for our data analytics.

We will only share your personal data with third parties in the following situations:

* where necessary for the provision of our Services (for example, providing your personal data to
our payment processors or technical service providers);

* to enable us to improve and optimise our Website using analytics and search engines; 

* to enable us to provide you with the job posting service on third party websites;

* where required by law or where we believe in good faith that disclosure is reasonably necessary
to respond to a claim against us, to comply with legal proceedings, as part of an investigation, or
to protect the property or the personal safety of Resumedone or its affiliates or users.

## 5. THE LEGAL BASIS OF OUR DATA PROCESSING.

We collect, use and disclose the data we have in the ways described below:

* when necessary for the provision of Services on our Website and the execution of our T&amp;Cs;

* in the light of your consent, which you may revoke at any time by closing your Account;

* when it is necessary for us to comply with our legal obligations;

* when necessary to serve our legitimate interests, including our interests in providing
personalized and effective service to our users, unless your interests or your fundamental rights
and freedoms prevail over those interests.
## 6. HOW WE TRANSFER YOUR PERSONAL DATA.

When we transfer your personal data, we will do so in accordance with applicable data protection
laws, and will take appropriate security measures to ensure its integrity and protection. In particular,
we transfer your personal data to our third party service providers established outside the European
Economic Area, and to countries for which the European Commission has not made a &quot;proper
protection&quot; decision, such as the United States. In such a case, we ensure this transfer is carried out
in accordance with applicable regulations and ensures a sufficient level of protection of privacy and
fundamental rights of individuals (including by the standard contractual clauses of the European
Commission).

## 7. HOW WE SECURE YOUR PERSONAL DATA

We take appropriate technical and organizational measures to prevent unauthorized or unlawful
processing of your personal data, or any accidental loss, destruction or damage to it by using our
internal security procedures, which cover the preservation and destruction of your personal data, as
well as access to them.

## 8. YOUR RIGHTS TO YOUR PERSONAL DATA.

In addition to the rights conferred on you by applicable data protection legislation, and where
applicable law or regulation authorises or requires us to do so, we will, upon request, give you a copy
of your personal data and correct any error that you have identified. You also have the right to
receive and / or have us transfer to another controller a subset of your personal data. You have the
right to object to us processing your personal data and to limit such processing, as well as the right to
file a complaint with the supervisory authorities concerning the processing of your personal data.

We invite you to submit all your requests, or any questions or comments about this Privacy Policy or
our processing of your personal data to the email address [contact@Resumedone.io](mailto:contact@Resumedone.io).

## 9. UPDATES. 

This Privacy Policy was updated in June 2019. We reserve the right to change this Privacy Policy at
any time to reflect changing legal requirements or our processing practices. Each of these changes
will be published on our Website.

`;

const StyledMarkDown = styled(MarkDown)`
  padding: 50px;

  h1 {
    text-align: center;
  }

  p {
    font-size: 20px;
  }
`

export default class PrivacyPolicyPageComponent extends PureComponent {
  componentDidMount() {
    Analytics.track('privacy_view');
  }

  render() {
    return (
      <StyledMarkDown source={policy} />
    )
  }
}
