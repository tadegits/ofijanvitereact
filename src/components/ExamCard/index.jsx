import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Modal, Input } from 'antd';
import Wrapper from '../wrapper/Wrapper';
import Logo from '../../assets/ofijan_logo.png';
import '../ExitExam/ExitExam.scss';
import '../../App.css';

const { Meta } = Card;

const Index = ({ exams }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [examId, setExamId] = useState(null);

    const showModal = (id) => {
        setIsModalVisible(true);
        setExamId(id);
    };

    const handleOk = async () => {
        try {
            const response = await checkExamPassword(examId, password);

            if (response && response.success) {
                // Password is correct
                console.log('Password is correct! Exam ID:', examId);
                setIsModalVisible(false);
            } else {
                // Password is incorrect
                console.log('Password is incorrect!');
                // Handle incorrect password scenario (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error checking exam password:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const checkExamPassword = async (id, enteredPassword) => {
        try {
            const response = await fetch(`your_api_endpoint/check-password/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: enteredPassword }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        } catch (error) {
            console.error('Error checking exam password:', error);
            // You can handle errors, e.g., show an error message
            return { success: false };
        }
    };

    if (!exams || (Array.isArray(exams) && exams.length === 0)) {
        return <>No exams available</>;
    } else {
        return (
            <Wrapper className="examsholder">
                {exams.map((exam) => (
                    <Card
                        key={exam.id}
                        className="exams_card"
                        cover={<img className='__logo' alt="logo" src={Logo} style={{ width: 50, height: 30 }} />}
                        actions={[
                            <Button type="primary" onClick={() => showModal(exam.id)}>
                                Open
                            </Button>
                        ]}
                    >
                        <Meta
                            title={exam.exam_name ? exam.exam_name : 'No Name'}
                            description={exam.description ? exam.description : 'No Description!'}
                        />
                        <div className="underline"></div>
                        <p>
                            <b>Booklet Name:</b> {exam.exam_name}
                        </p>
                        <p>
                            <b>Ofijan Id:</b> OF{exam.id}{exam.id}IN
                        </p>
                        <p>
                            <b>Prepared By:</b> Gaki Serocho
                        </p>
                        <p>
                            <b>Total no of Questions:</b> {exam.questions_count}
                        </p>
                        <p>
                            <b>Topics Covered:</b> 12
                        </p>
                    </Card>
                ))}

                <Modal
                    title="Enter Exam Password"
                    open={isModalVisible}
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
