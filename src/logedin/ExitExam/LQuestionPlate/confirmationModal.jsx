import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';

const ConfirmationModal = ({ data, onClose }) => {
    const { answeredQuestionsCount, totalQuestionsCount, answeredQuestions } = data;

    const handleSendExamData = () => {
        const examData = answeredQuestions.map(question => ({
            userId: question.userId,
            questionId: question.id,
            optionId: question.options.find(option => option.selected)?.id,
            examId: question.exam_id,
            correct: question.options.find(option => option.selected)?.correct === '1'
        })); 

        axios.post(`${API_BASE_URL}/selected_answers`, examData)
            .then(response => {
                console.log('Exam data sent successfully');
            })
            .catch(error => {
                console.error('Error sending exam data:', error);
            });
    };

    return (
        <Modal
            title="Confirmation"
            visible={true}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={handleSendExamData}>Submit</Button>,
            ]}
        >
            <p>Are you sure you want to submit?</p>
            <p>Total Questions: {totalQuestionsCount}</p>
            <p>Answered Questions: {answeredQuestionsCount}</p>
            <p>Answers:</p>
            <ul>
                {answeredQuestions.map((question, index) => (
                    <li key={index}>
                        <p>Question {index + 1}:</p>
                        <p dangerouslySetInnerHTML={{ __html: question.question_text }} />
                        <p>Selected Answer: {question.options.find(option => option.selected)?.option}</p>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default ConfirmationModal;
