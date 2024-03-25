import React from 'react';
import { Typography } from 'antd';
import Wrapper from '../wrapper/Wrapper';
const { Title, Paragraph } = Typography;
import './footer.jsx';
const TermsOfService = () => {
  return (
    <Wrapper className='terms'>
      <section className='terms__container'>
        <div className='terms__content' style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title className='terms__title' level={2}>Terms of Service</Title>

          <Paragraph className='terms__paragraph'>
            These Terms of Service ("Terms") govern your use of the Ofijan Exam Selling Platform provided by Ofijan. By accessing or using the Service, you agree to be bound by these Terms.
          </Paragraph>

          <Title className='terms__title' level={3}>1. Use of Service</Title>
          <Paragraph className='terms__paragraph'>
            - You agree to provide accurate and complete information when creating an account on the Service.
            <br />
            - You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
          </Paragraph>

          <Title className='terms__title' level={3}>2. User Conduct</Title>
          <Paragraph className='terms__paragraph'>
            - You agree to use the Service in compliance with all applicable laws and regulations.
            <br />
            - You may not use the Service for any illegal or unauthorized purpose.
            <br />
            - You may not attempt to gain unauthorized access to any portion or feature of the Service.
          </Paragraph >

          <Title className='terms__title' level={3}>3. Intellectual Property</Title>
          <Paragraph className='terms__paragraph'>
            - All content and materials available on the Service, including but not limited to text, graphics, logos, images, and software, are the property of Ofijan or its licensors and are protected by copyright, trademark, and other intellectual property laws.
            <br />
            - You may not modify, reproduce, distribute, or create derivative works based on any content or materials from the Service without prior written consent from Ofijan.
          </Paragraph>

          <Title level={3}>4. Privacy</Title>
          <Paragraph>
            - Your use of the Service is subject to our Privacy Policy, which explains how we collect, use, and disclose your information. By using the Service, you consent to the collection, use, and disclosure of your information as described in the Privacy Policy.
          </Paragraph>

          <Title className='terms__title' level={3}>5. Termination</Title>
          <Paragraph>
            - We reserve the right to suspend or terminate your access to the Service at any time without prior notice or liability for any reason, including but not limited to violation of these Terms.
            <br />
            - Upon termination, all provisions of these Terms which by their nature should survive termination, including but not limited to warranty disclaimers, indemnity, and limitations of liability, will survive.
          </Paragraph>

          <Title className='terms__title' level={3}>6. Limitation of Liability</Title>
          <Paragraph>
            - In no event shall Ofijan, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Service or these Terms.
            <br />
            - We make no warranties or representations about the accuracy or completeness of the content or materials available on the Service, and disclaim all warranties and conditions with regard to such content and materials.
          </Paragraph>

          <Title className='terms__title' level={3}>7. Changes to Terms</Title>
          <Paragraph className='terms__paragraph'>
            - We reserve the right to update and modify these Terms at any time without prior notice. Any changes will be effective immediately upon posting.
            <br />
            - It is your responsibility to review these Terms periodically for changes. Your continued use of the Service following the posting of revised Terms constitutes your acceptance of such changes.
          </Paragraph>

          <Paragraph className='terms__paragraph'>
            If you have any questions or concerns about these Terms, please contact us at <a href="mailto:simemillion@gmail.com">simemillion@gmail.com</a>.
          </Paragraph>

          <Paragraph className='terms__paragraph'>
            Last updated: 03/02/2024
          </Paragraph>

          <Paragraph className='terms__paragraph'>
            Thank you for using our Service.
          </Paragraph>
        </div>
      </section>
    </Wrapper>
  );
}

export default TermsOfService;
