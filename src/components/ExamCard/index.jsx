import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Divider, Button, Modal, Input } from 'antd';
import Wrapper from '../wrapper/Wrapper';
import Logo from '../../assets/ofijan_logo.png';
import '../../App.css';
import API_BASE_URL from '../../Globals/apiConfig';

const { Meta } = Card;

const Index = ({ exams }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [examPassword, setExamPassword] = useState('');
    const [institutionalId, setInstitutionalId] = useState('');
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const [examId, setExamId] = useState(null);
    const navigate = useNavigate();

    const showModal = (id) => {
        setIsModalVisible(true);
        setExamId(id);
    };

    const handleOk = async () => {
        try {
            const response = await checkExamPassword(examId, examPassword, institutionalId);

            if (response && response.success) {
                // Password is correct
                navigate(`/easy_exam_plate/${exams.id}`);
                setIsModalVisible(false);
            } else {
                // Password is incorrect
                setIsPasswordIncorrect(true);
                console.log('Password is incorrect!');
                // Handle incorrect password scenario (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error checking exam password:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsPasswordIncorrect(false);
    };

    const checkExamPassword = async (id, enteredPassword, enteredId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/check-password/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exam_password: enteredPassword, institutional_id: enteredId }),
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
                <Card
                    key={exams.id}
                    className="exams_card"
                    cover={<img className="__logo" alt="logo" src={Logo} style={{ width: 50, height: 30 }} />}
                    actions={[
                        <Button type="primary" onClick={() => showModal(exams.id)}>
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
                        <b>Prepared By:</b> Million Sime
                    </p>
                    <p>
                        <b>Total no of Questions:</b> {exams.questions_count}
                    </p>
                    <p>
                        <b>Topics Covered:</b> 4 Chapters
                    </p>
                </Card>
                <Modal
                    title="Exam Registration"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                   <label for="id"> Enter Your Institutional ID<Input
                        type="text"
                        placeholder="Enter Your Institutional ID"
                        value={institutionalId}
                        onChange={(e) => setInstitutionalId(e.target.value)}
                        style={{ color: 'red' }}
                    /></label> 
                    <Divider />
                    <label for="id"> Add Exam Password
                    <Input
                        type="text"
                        placeholder="Enter Exam Password"
                        value={examPassword}
                        onChange={(e) => setExamPassword(e.target.value)}
                        style={{ color: 'green' }}
                    /></label>
                    {isPasswordIncorrect && (
                        <p style={{ color: 'red', marginTop: '10px' }}>
                            Incorrect password. Please try again.
                        </p>
                    )}
                </Modal>
            </Wrapper>
        );
    }
};

export default Index;
