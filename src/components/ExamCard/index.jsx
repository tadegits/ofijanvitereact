import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Modal, Input } from 'antd';
import Wrapper from '../wrapper/Wrapper';
import Logo from '../../assets/ofijan_logo.png';
import './easyexam.scss';
const { Meta } = Card;

const Index = ({ exams }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [password, setPassword] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Add logic to handle password validation
        // For simplicity, I'm just closing the modal here
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (!exams || (Array.isArray(exams) && exams.length === 0)) {
        return <>No exams available</>;
    } else {
        return (
            <Wrapper className="examsholder">
                <Card
                    key={exams.id}
                    className="exams_card"
                    cover={<img className='__logo' alt="logo" src={Logo} style={{ width: 50, height: 30 }} />}
                    actions={[
                        <Button type="primary" className='button-open' onClick={showModal}>
                            Open
                        </Button>
                    ]}
                >
                    <Meta
                        title={exams.exam_name ? exams.exam_name : 'No Name'}
                        description={exams.description ? exams.description : 'No Description!'}
                    />
                    <div className="underline"></div>
                    <p>
                        <b>Booklet Name:</b> {exams.exam_name}
                    </p>
                    <p>
                        <b>Ofijan Id:</b> OF{exams.id}{exams.id}IN
                    </p>
                    <p>
                        <b>Prepared By:</b> Gaki Serocho
                    </p>
                    <p>
                        <b>Total no of Questions:</b> {exams.questions_count}
                    </p>
                    <p>
                        <b>Topics Covered:</b> 12
                    </p>
                </Card>

                <Modal
                    title="Enter Exam Password"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Modal>
            </Wrapper>
        );
    }
};

export default Index;
