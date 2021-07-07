import React, { PureComponent } from 'react';
import MarkDown from 'react-markdown';
import styled from 'styled-components';
import { Analytics } from '/imports/core/api/analytics';

const tc = `
# TERMS AND CONDITIONS OF USE (the “T&C”)

This website is owned and operated by Great Ponton Limited , registered with the Irish Trade and Companies Registry under company number no 644795, having its registered office at 32 Merrion Street Upper, Dublin 2, Ireland (**“Resumedone“** **“we”** or **“us”**). You can also contact us by email at [contact@resumedone.io](mailto:contact@resumedone.io). 

## 1. Object
Resumedone offers you, as a Member, access to a database of Materials (including, among other things, resumes, cover letters and guidance notes) accessible at www.resumedone.io (**“Website”**), which as a Member, you can populate with your personal information using the Document Builder to create personalised documents which you can download at your convenience, according to your particular needs or Store in your Customer Area (subject to payment of applicable Subscription fees).

These T&Cs govern your access to and use of the Website and its Services. By using the Website, you unreservedly accept all of these terms and conditions.

By opening an account on the Website, you must tick a box, and confirm that you have read and accepted these T&Cs, which form a legally binding contract between you and Resumedone.

Please read the following carefully. If you do not accept these T&Cs, do not use the Website. We may amend these T&Cs at any time by posting an updated version to this web page and notifying you before the amended T&Cs take effect.

To improve customer experience, we may also modify, without prior notice, the structure and design of our Website, as well as some Services or content.

## 2. Definitions

In this document,

**“Account”** means the account that you have to create to become a Member and access the Services offered by the Website.

**“Applicable Laws”** as the meaning ascribed to it in Section 14.

**“Customer Area“** is your personal and dedicated space, where you can access the Services and Store your Materials.

**“Document Builder”** means the function enabling Members to input personal information (including resume, career history and educational history details) and create personalised versions of certain of the Materials (in particular resumes and cover letters) (**“Personalised Documents”**) which can then be Stored in a Member’s Customer Area. 

**“Member”** means any natural or legal person having an Account on the Website.

**”Materials”** means all the resume templates, cover letters templates, guidance notes and other documents made available to Members on the Website (whether or not personalised with the Document Builder.

**“Services”** means all products, services, content, features, technologies or functions delivered by us via the Website including, but not limited to, the Materials, the Document Builder, and the Storage of Materials. 

**“Subscription”** has the meaning given to it in Section 6. 

**“Storage”** and “Store” means the service of storage of Materials on the Website.

## 3. Opening an Account

### A. Conditions

**You must be 18 years or older.**  You must be 18 years or older to use our Services, which you must certify, if applicable, when opening an Account.

**If applicable, you must have authority to bind the company you represent.**  You confirm that you have authority to bind any business or entity on whose behalf you use the Services, and that business or entity accepts these T&Cs.

### B. Creating an Account

The Website allows Members to register and then have access to the Services. You cannot view the Materials if you are not registered, nor access the Document Builder or the Storage service without first opening an Account and becoming a Member.

To create your Account, you have to complete the mandatory fields in the registration form (by giving your surname, first name, and email) and we will send you a password via email. You must also have read and accepted these T&Cs and our [Privacy Policy](/privacy-policy) which explains our online information practices and the choices you can make about the way your information is collected and used on this Website

### C. Accurancy of Account Information

You warrant that your Account contains accurate and true information, and that you will update it, as needed. If we believe the details are not correct, current, or complete, we have the right to refuse you access to the website, or any of the Services and to terminate or suspend your Account.

### D. Password

You are responsible for keeping your Account password confidential. You agree to inform us if you become aware of any unauthorised use of your Account or a security breach, such as loss or theft of your login information. 

## 4. Services

The Website is an online platform on which we provide the  Services. As a Member:

you may create a Customer Area on the Website, from which you may access Materials, create Personalised Documents using the Document Builder and Store them;  

you will also be able to communicate and exchange with Resumedone, by email and chat.

## 5. Member Rules of Conduct on the Website

There are certain rules that apply to Members. When using our Website, you agree:

* not to infringe the rights and image of Resumedone and its affiliated entities, including their intellectual property rights;

* not to infringe the rights and images of any party holding rights in the Materials, such as their intellectual property rights;

* not to open an Account in the name of a person other than yourself;

* not to use any device, software or other element  likely to interfere with the proper operation of the Website or whose object is intended to damage, interfere with, intercept or expropriate any system, data or personal information; and

* more generally, not to act in a way that violates the Applicable Law(s) or breaches these T&Cs.

## 6. Payment of Fees

To access the Services, you must pay the amount of the monthly subscription for Services (the “Subscription”), or only the amount of the trial offer, as described on the Website. The prices of Subscriptions are indicated on the Website (VAT and all other taxes included) and they take into account the amount of VAT applicable on the day of  payment of the Subscription.

Any Subscription to the Services will continue for an indefinite period from the date of Subscription. A Subscription is cancellable at any time.

Resumedone reserves the right to change the amount of the Subscription and of any trial offer. You will be informed of such change at least 10 days before the end of your Subscription period, and you will then have the freedom to not renew your Subscription.

The Subscription and the trial offer fees are payable in advance, and automatically charged to the payment method indicated on the Website. In the event of non-payment, Resumedone will present the payment again and, in the event of further non-payment, will be able to terminate the Services immediately without compensation, but without prejudice to the right to claim payment from you for any amounts due, and any indemnification for damages suffered by Resumedone as a result of such non-payment.

## 7. Intellectual Property Rights

### A. Intellectual Property Rights of Website content

The proprietary software (including the Document Builder and the Customer Area), the Materials and the other materials on the Website, including copyright, logos, trademarks, trade names, images, text, illustrations, audio, video files, data files, program files, and codes as well as the selection, coordination and arrangement of such materials, (whether registered or unregistered) are protected by copyright, patent and, trademark law (“IP Rights”). These IP Rights are either owned by us or owned by third parties who have licensed their IP Rights to us.It is strictly prohibited to reproduce, copy, modify or otherwise manipulate any content on the Website, in whole or in part.

The use or misuse of the IP Rights, except as permitted in these T&C’s, is prohibited. .By becoming a Member, subject to these T&Cs relating to the owners of the IP Rights (see below), and only to the extent it is able to do so, Resumedone grants you a non-exclusive, revocable, personal and non-transferable license, to use the Website and the IP Rights, worldwide, for your personal and private use only, on a non-commercial basis and in compliance with these T&C’s.

The license granted to you will terminate when you cease to be a Member and/or in case of improper use of the Website and/or the Services.

All new versions, updates or changes to our Website, Services or related content shall be subject to these T&Cs. Resumedone reserves all rights not expressly covered by these T&Cs.

In no event may use of the Website and access to the Materials permit you to reproduce or publicly disseminate or to transfer, sell, rent or lend, partially or wholly, or to make available, other than in accordance with these T&Cs, the contents of the Website including the Materials.

Resumedone and its affiliates do not claim, either for you, any third party, or themselves, ownership of any IP Rights in the Materials owned by third parties.

### B. Use of Your Content

You retain your rights to any information or content you submit, post or display on or through the Website including account information, resume, career history, educational history, reviews, responses, profile entries, posts, questions, career materials or any other information you provide (“Your Content”). By submitting, uploading, posting or displaying such content, you grant us a worldwide, non-exclusive, royalty-free licence (with the right to sublicense) to use, process, copy, reproduce, adapt, modify, publish, transmit, display and distribute Your Content in any and all media or through any distribution channels (now known or later developed), subject to the applicable provisions in our Privacy Policy.

You warrant that Your Content is not and will not infringe rights of any third parties and that you have all the necessary rights, power and authority to satisfy your obligations with regard to Your Content under these T&Cs.

If you believe your intellectual property rights have been infringed, please contact us.

You are responsible for the use of Your Content and any consequences thereof, including any consequences of the use of Your Content by other users or third parties. We are not responsible or liable for any use of Your Content, nor the use of any content or information submitted or posted by other Members or visitors.

Resumedone’s resume posting services facilitate the posting of Your Content and your Personalised Documents on various third-party career sites with your prior request and consent. You agree that Resumedone may use proprietary web-based information gathering tools to create a personalised profile for you if you sign up for this service. You further agree that the wording and interpretation of your information for purposes of resume posting services will be in Resumedone’s sole discretion and Resumedone will not be liable for any decisions to include, not include or phrase information about you. You further acknowledge and agree that you will take full responsibility and are personally liable for any consequences arising from your use of the resume posting services.

## 8. Role of Resumedone/ Limitation of liability

Resumedone does not warrant or make any representations regarding the use of the Services and the Materials in terms of their correctness, accuracy, reliability, or otherwise or that the Website will not infringe the rights of third parties and Resumedone assumes no liability or responsibility for errors or omissions in such Materials. If Applicable Laws do not allow the exclusion of some or all of the above implied warranties and conditions, the above exclusions will apply to you only to the extent permitted by applicable law.

Your use of this Website is at your own risk. The Website, the Services, the Materials and other information, software, facilities, services and other content in the site are provided “as is” and “as available” without warranties or conditions of any kind, either express or implied. To the fullest extent possible pursuant to applicable law, Resumedone disclaims all warranties and conditions, express or implied including, but not limited to, conditions of in respect of satisfactory quality, fitness for a particular purpose and non-infringement. 

Resumedone disclaims all liability whether based in contract, tort or otherwise, and does not accept any liability for any loss or damage (direct, indirect, punitive, consequential or otherwise) resulting from the use or misuse of, the Website, the Services or the Materials regardless of the basis upon which liability is claimed. If Applicable Laws do not allow all or any part of the above limitation of liability to apply to you, the limitations will apply to you only to the extent permitted by applicable law. 

Nothing in this agreement shall exclude or limit liability for death, personal injury or fraud.

## 9. Account suspension, restrictions of access and termination

You can at any time terminate your contractual relationship with Resumedone and terminate your Subscription by closing your Account in your Customer Area or by notifying our customer services team [here](maito: customer@resumedone.io). The termination takes effect immediately and your Subscription will automatically terminate. You will not be entitled to any refund for any amounts paid for a Subscription relating to the period after termination of your Account. 

If you breach your undertakings as set out in these T&Cs or if we have genuine reason to believe that the security and integrity of Resumedone, its Members, or third parties are at risk, we reserve the right to immediately terminate these T&Cs binding you and Resumedone and close your Account.

When this is necessary, you will be notified of such measure to enable you to respond. Resumedone will decide, at its sole discretion, whether to lift the measures put in place.

## 10. Personal Data 

We collect and process some of your personal data. In using the Website and registering as a Member, you acknowledge and accept the processing of your personal data in accordance with our [Privacy Policy](/privacy-policy).

## 11. Operation, availability and functionalities of the platform

We shall try as far as possible to maintain continued access to the Website. However, access to the Website or the use of certain features may be suspended or disrupted without notice, due to technical maintenance, migration, or updates, or owing to outages or constraints linked to the network or for other technical reasons.

We reserve the right to modify or suspend all or part of your access to the Website or its features, at our sole discretion, temporarily or permanently.

## 12. Hyperlinks

Our Website contains links to other websites. We do not control those websites and are not responsible for their content. By including these links, we are not endorsing the material on those websites or implying any association with their operators.

## 13. Modification of the T&Cs

These T&Cs and the documents integrated by reference express the entire agreement between you and Resumedone relating to your use of the Website and the Services.

Resumedone may modify these T&Cs to adapt to the technological and commercial environment, and to comply with Applicable Laws and the regulatory environment. Any modification to these T&Cs will be published on the Website with mention of the effective date, and you will be notified by Resumedone before the changes take effect.

## 14. Applicable Laws and dispute resolution

These T&Cs are governed and construed in accordance with  the laws of England & Wales, without prejudice to the application of specific rules related to (i) the general principles of conflict of laws, and (ii) rules of public policy protecting the consumer of the country from which you have access to the Services (the **“Applicable Laws”**).

If the dispute cannot be settled by mediation, you agree to submit all disputes to the jurisdiction of courts of England & Wales.

Resumedone shall also retain the right to bring proceedings depending on the nature of the dispute, in the courts of the country of your residence or, where these T&Cs are entered into in the course of your trade or profession, in the country of your principal place of business.

## 15. Effective Date

10/07/19
`;

const StyledMarkDown = styled(MarkDown)`
  padding: 50px;

  p {
    font-size: 20px;
  }

  h1, h3 {
    text-align: center;
  }

  h2 {
    margin-top: 25px;
  }
`

export default class TCPageComponent extends PureComponent {
  componentDidMount() {
    Analytics.track('terms_view');
  }

  render() {
    return (
      <StyledMarkDown source={tc} />
    )
  }
}
