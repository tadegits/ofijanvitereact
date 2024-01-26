
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLoggedInUser from '../../../Globals/useLoggedInUser';
import LNavigationButtons from './LNavigationButtons';
import LAnswerBox from './LAnswerBox';
import axios from 'axios';
import Swal from 'sweetalert2';
import TimePlate from './TimePlate';
import API_BASE_URL from '../../../Globals/apiConfig';
import '../LQuestionPlate/plate.scss';

const TestMePlate = () => {
    const { ofin_id } = useParams();
    const { userId } = useLoggedInUser();
    const [answered, setAnswered] = useState(false);
    const [questionData, setQuestionData] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [testStarted, setTestStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1);
    const [initialTime, setInitialTime] = useState(null);
    
    const alphabet = ["A", "B", "C", "D"];
    const [role, setRole] = useState('');

    useEffect(() => {
        let timerInterval;

        if (testStarted && timeLeft > 0) {
            timerInterval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [testStarted, timeLeft]);

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/way_questions/${ofin_id}`);
                setQuestionData(response.data);
                console.log(response.data)
                const examDurationInMinutes = response.data[1].exam.exam_duration;
                const examDurationInSeconds = examDurationInMinutes * 60;
    
                setInitialTime(examDurationInSeconds);
                setTimeLeft(examDurationInSeconds);
            } catch (error) {
                console.error('Error fetching question data:', error);
            }
        };
 
        if (testStarted && timeLeft > 0 && !initialTime) {
          fetchQuestionData(); 
        }
    }, [ofin_id, userId, testStarted, timeLeft, initialTime]);

    const handleStartClick = () => {
        setTestStarted(true);
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
    if (loggedUser !== null) {
      setIsLoggedin(true);
      const userLogged = JSON.parse(loggedUser);
      setRole(userLogged.user.role_id);
    }
        if (questionData.length > 0) {
            const selectedOption = questionData[selectedQuestionIndex].options.find((option) => option.selected);
            setSelectedOptionIndex(selectedOption ? questionData[selectedQuestionIndex].options.indexOf(selectedOption) : null);
        }
    }, [selectedQuestionIndex, questionData]);
    const handleQuestionClick = (index) => {
        setSelectedQuestionIndex(index);   //hi
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
        setAnswered(true)
        if (questionData[selectedQuestionIndex].options[index].correct === '1') {
            setCorrectAnswersCounter((prevCounter) => prevCounter + 1);
        } else {
            setCorrectAnswersCounter((prevCounter) => prevCounter - 1);
        }
        const selectedQuestion = questionData[selectedQuestionIndex];
        const selectedOptionID = selectedQuestion.options[selectedOptionIndex];
        axios.post(`${API_BASE_URL}/selected-answers`, {
            user_id: userId,
            question_id: selectedQuestion,
            option_id: selectedOptionID,
        })
            .then(response => {
            })
            .catch(error => {
            });
    };
    const handleNextClick = () => {
        if (selectedQuestionIndex < questionData.length) {
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
    const handleClearChoiceClick = () => {
        const updatedQuestionData = [...questionData];
        updatedQuestionData[selectedQuestionIndex].options = updatedQuestionData[selectedQuestionIndex].options.map(option => ({
            ...option,
            selected: false,
        }));
        setQuestionData(updatedQuestionData);
        setSelectedOptionIndex(null);
        setAnswered(false);
    };
    const handleFlagClick = (index) => {
        const updatedQuestionData = [...questionData];
        updatedQuestionData[index].flagged = !updatedQuestionData[index].flagged;
        setQuestionData(updatedQuestionData);
    };
    return (
        <div className='ofijan_exam_plate'>
            <h1 className='ofijanTestPlateHeader'>OFIJAN TEST PLATE</h1>
            {!testStarted && (
                <div>
                    <button onClick={handleStartClick}>Start Test</button>
                </div>
            )}
            {testStarted && 
            <div className='plate'>
                <div className='flag_plate'>
                    <h5>Question {selectedQuestionIndex + 1}/{questionData.length}</h5>
                    <p>Answer saved</p>
                    <p>Marked out of 100</p>
                    <p></p>
                    <p><a href='#' onClick={() => handleFlagClick(selectedQuestionIndex)}>Flag Question</a></p>
                </div>
                <div className='question_plate'>
                    <TimePlate
                     isLoggedin={isLoggedin}
                     timeLeft={formatTime(timeLeft)}
                    />
                    <div className="questionplate">
                        {questionData.length > 0 && (
                            <>
                                <div className="questionText">
                                    <p dangerouslySetInnerHTML={{ __html: questionData[selectedQuestionIndex].question_text }} />
                                </div>
                                <div className="choicePlate">
                                    {questionData[selectedQuestionIndex].options.map((option, index) => {
                                        const isSelected = selectedOptionIndex === index;
                                        const isCorrectAnswer = option.correct === '1';
                                        return (
                                            <label
                                                className={`option_box ${isSelected ? 'selected' : ''} `}
                                                key={index}
                                                onClick={() => handleOptionClick(index)}
                                            >
                                                <input
                                                    type='radio'
                                                    name={`option_${selectedQuestionIndex}`}
                                                    value={option.option}
                                                    checked={isSelected}
                                                    readOnly
                                                />
                                                <span className="alphabet">{alphabet[index]}. </span>
                                                {option.option}
                                                <span className={`correct_is ${isCorrectAnswer ? 'hi' : ''} ${selectedQuestionIndex === index ? 'selected' : ''} ${questionData[selectedQuestionIndex].options.some(option => option.selected) ? 'answered' : ''} `} ></span>
                                            </label>
                                        );
                                    })}
                                    <div className='choice_and_answer'>
                                        <h5 className='clear_choice' onClick={handleClearChoiceClick}>Clear Choice</h5>
                                        {/* <h5 className='show_answer' onClick={()=> {!isLoggedin ? (handleSweetAlert(5)) : (<></>)}}>Show me answer</h5> */}
                                    </div>
                                   
                                </div>
                            </>
                        )}
                    </div>
                    <LNavigationButtons
                        handlePreviousClick={handlePreviousClick}
                        handleNextClick={handleNextClick}
                        selectedQuestionIndex={selectedQuestionIndex}
                       length = {questionData.length-1}
                    />
                </div>
                <div className="answer_plate">
          <h5>Exam Navigation</h5>
          <div className="answer_plate">
            {questionData.map((question, index) => (
              <LAnswerBox
                key={index}
                index={index}
                isSelected={selectedQuestionIndex === index}
                isFlagged={question.flagged}
                isAnswered={question.options.some(option => option.selected)}
                handleClick={handleQuestionClick}
                handleSweetAlert={handleSweetAlert}
              />
            ))}
          </div>
        </div>

            </div>}
            {/* <div className='correct_counter'>Correct Answers: {correctAnswersCounter}</div> */}
        </div>
    );
};
export default TestMePlate;