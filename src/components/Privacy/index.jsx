import React from 'react';
import { Typography } from 'antd';
import './privacy.scss';
const { Title, Paragraph } = Typography;

const Index = () => {
    return (
        <div className='privacy-policy'>
            <Title level={2}>Privacy Policy for Ofijan Exam Provider Platform</Title>
    
            <p className='privacy-policy__text'>
                At Ofijan, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and disclose your information when you use our exam selling platform.
            </p>
    
            <Title level={3}>1. Information We Collect:</Title>
            <p className='privacy-policy__text'>
                - When you create an account on Ofijan, we collect personal information such as your name, email address, and payment details.
                <br />
                - We may also collect information about your exam preferences and browsing behavior on our platform.
                <br />
                - We use cookies and similar tracking technologies to enhance your user experience and collect data about your interactions with our platform.
            </p>
    
            <Title level={3}>2. How We Use Your Information:</Title>
            <p className='privacy-policy__text'>
                - We use your personal information to create and manage your account, process payments, and provide customer support.
                <br />
                - Your exam preferences and browsing behavior may be used to personalize your experience on our platform and recommend relevant exams to you.
                <br />
                - We may use your information to send you promotional offers, updates, and important notifications related to your account.
            </p>
    
            <Title level={3}>3. Information Sharing:</Title>
            <p className='privacy-policy__text'>
                - We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                <br />
                - We may share your information with trusted service providers who assist us in operating our platform, processing payments, and delivering services to you.
                <br />
                - We may disclose your information if required by law or to protect our rights, property, or safety.
            </p>
    
            <Title level={3}>4. Data Security</Title>
            <p className='privacy-policy__text'>
                - We implement security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
                <br />
                - Your payment details are encrypted and securely processed through our payment gateway to ensure the security of your financial information.
            </p>
    
            <Title level={3}>5. Data Retention:</Title>
            <p className='privacy-policy__text'>
                - We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy.
                <br />
                - You can request to delete your account and personal information from our platform at any time by contacting us.
            </p>
    
            <Title level={3}>6. Changes to Privacy Policy:</Title>
            <p className='privacy-policy__text'>
                - We reserve the right to update and modify this Privacy Policy from time to time. Any changes will be notified to you through our platform or via email.
            </p>
    
            <p className='privacy-policy__text'>
                By using Ofijan exam selling platform, you agree to the terms outlined in this Privacy Policy. If you have any questions or concerns about our privacy practices, please contact us at <a href="mailto:simemillion@gmail.com">simemillion@gmail.com</a>.
            </p>
    
            <p className='privacy-policy__text'>
                Last updated: 3/02/2024
            </p>
    
            <p className='privacy-policy__text'>
                Thank you for trusting Ofijan with your exam needs.
            </p>
        </div>
    );
    
}

export default Index;
