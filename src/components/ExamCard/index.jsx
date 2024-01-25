import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Modal, Input } from 'antd';
import Wrapper from '../wrapper/Wrapper';
import Logo from '../../assets/ofijan_logo.png';
import '../ExitExam/ExitExam.scss';
import '../../App.css';
import API_BASE_URL from '../../Globals/apiConfig';

const { Meta } = Card;

const Index = ({ exams }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [exam_password, setPassword] = useState('');
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const [examId, setExamId] = useState(null);
const navigate  = useNavigate();
    const showModal = (id) => {
        setIsModalVisible(true);
        setExamId(id);
    };

    const handleOk = async () => {
        try {
            const response = await checkExamPassword(examId, exam_password);

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

    const checkExamPassword = async (id, enteredPassword) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/check-password/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exam_password: enteredPassword }),
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
                        cover={<img className='__logo' alt="logo" src={Logo} style={{ width: 50, height: 30 }} />}
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
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Input
                        type="text"
                        placeholder="Enter password"
                        value={exam_password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
