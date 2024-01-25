import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLoggedInUser from '../../../Globals/useLoggedInUser';
import './plate.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../../../Globals/apiConfig';
import ExamDetails from './ExamDetails';
import Study from './Study';
import Test from './Test';
import CheckIcon from '@mui/icons-material/Check';
const Plate = () => {
    const { ofin_id } = useParams();
    const { deptId, userId } = useLoggedInUser();
    const [answered, setAnswered] = useState(false);
    const [questionData, setQuestionData] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('')
    const alphabet = ["A", "B", "C", "D"];
    useEffect(() => {
        fetch(`https://server.ofijan.com/api/way_questions/${ofin_id}`)
            .then((res) => res.json())
            .then((data) => {
                setQuestionData(data);
            })
            .catch((err) => console.log(err));
    }, [ofin_id, userId]);

    useEffect(() => {
        if (questionData.length > 0) {
            const selectedOption = questionData[selectedQuestionIndex].options.find((option) => option.selected);
            setSelectedOptionIndex(selectedOption ? questionData[selectedQuestionIndex].options.indexOf(selectedOption) : null);
        }
    }, [selectedQuestionIndex, questionData]);
    const handleQuestionClick = (index) => {
        setSelectedQuestionIndex(index);

        setSelectedOptionIndex(questionData[index].options.findIndex((option) => option.selected));
    };
    const handleOptionClick = (index) => {
        const updatedQuestionData = [...questionData];
        updatedQuestionData[selectedQuestionIndex].options = updatedQuestionData[selectedQuestionIndex].options.map((option, i) => ({
            ...option,
            selected: i === index
        }));
        setQuestionData(updatedQuestionData);
        setSelectedOptionIndex(index);
        //set the correct answer
        setAnswered(true)

        if (questionData[selectedQuestionIndex].options[index].correct === '1') {
            setCorrectAnswersCounter((prevCounter) => prevCounter + 1);
        } else {
            setCorrectAnswersCounter((prevCounter) => prevCounter - 1);
        }
        const selectedQuestion = questionData[selectedQuestionIndex];
        const selectedOptionID = selectedQuestion.options[selectedOptionIndex];
        axios.post(`${API_BASE_URL}/selected-answers`, {
            user_id: 1,
            question_id: selectedQuestion,
            option_id: selectedOptionID,
        })
            .then(response => {
            })
            .catch(error => {
            });
    };
    const handleNextClick = () => {
        if (selectedQuestionIndex < questionData.length - 1) {
            setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOptionIndex(null);
        }
    };
    const handlePreviousClick = () => {
        if (selectedQuestionIndex > 0) {
            setSelectedQuestionIndex((prevIndex) => prevIndex - 1);
            setSelectedOptionIndex(null);
        }
    };
    const handleSweetAlert = (id) => {
        Swal.fire({
            text: 'Login to get the rest of the questions!',
            icon: 'alert',
            showCancelButton: true,
            confirmButtonText: 'Login Now',
            //cancelButtonText: 'Later',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `/login`;
            }
        });
    };

    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const handleStepClick = (step) => {
        setCurrentStep(step);
    };
    return (
        <div className='ofijan_exam_plate'>
        <StepLine currentStep={currentStep} onStepClick={handleStepClick} />

        {currentStep === 1 && <ExamDetails />}

        {currentStep === 2 && (
            <Test
                questionData={questionData}
                selectedQuestionIndex={selectedQuestionIndex}
                handleOptionClick={handleOptionClick}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}
                handleQuestionClick={handleQuestionClick}
                selectedOptionIndex = {selectedOptionIndex}
            />
        )}

        {currentStep === 3 && (
            <Study
                questionData={questionData}
                selectedQuestionIndex={selectedQuestionIndex}
                handleOptionClick={handleOptionClick}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}
            />
        )}

        {/* Additional content */}
    </div>
);
};

export default Plate;

function StepLine({ currentStep, onStepClick }) {

    return (
        <div className="step-line">
            <div className={currentStep === 1 ? 'step active' : 'step'} onClick={() => onStepClick(1)}>
                Exam Details
            </div>
            <div className={currentStep === 2 ? 'step active' : 'step'} onClick={() => onStepClick(2)}>
                Take test
            </div>
            <div className={currentStep === 3 ? 'step active' : 'step'} onClick={() => onStepClick(3)}>
                Study
            </div>

        </div>
    );
}