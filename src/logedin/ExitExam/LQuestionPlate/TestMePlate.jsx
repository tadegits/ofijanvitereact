import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLoggedInUser from '../../../Globals/useLoggedInUser';
import LNavigationButtons from './LNavigationButtons';
import LAnswerBox from './LAnswerBox';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'antd';
import TimePlate from './TimePlate';
import Wrapper from '../../../components/wrapper/Wrapper';
import API_BASE_URL from '../../../Globals/apiConfig';
import '../LQuestionPlate/plate.scss';
import './answerPlate.scss';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logout } from '../../../features/userSlice'
const TestMePlate = () => {
    const { ofin_id } = useParams();
    const { userId } = useLoggedInUser();
    const [answered, setAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState([]);
    const [questionData, setQuestionData] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [testStarted, setTestStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1);
    const [initialTime, setInitialTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [examType, setExamType] = useState('');
    const [attemptedMessage, setAttemptedMessage] = useState('');
    const alphabet = ["A", "B", "C", "D"];
    const [role, setRole] = useState('');
    useEffect(() => {
        // Load state from localStorage if available
        const storedState = JSON.parse(localStorage.getItem('testMePlateState'));
        // if (storedState) {
        //     setAnswered(storedState.answered);
        //     setQuestionData(storedState.questionData);
        //     setSelectedQuestionIndex(storedState.selectedQuestionIndex);
        //     setSelectedOptionIndex(storedState.selectedOptionIndex);
        //     setCorrectAnswersCounter(storedState.correctAnswersCounter);
        //     setShowConfirmationModal(storedState.showConfirmationModal);
        //     setIsLoggedin(storedState.isLoggedin);
        //     setTestStarted(storedState.testStarted);
        //     setTimeLeft(storedState.timeLeft);
        //     setInitialTime(storedState.initialTime);
        //     setShowModal(storedState.showModal);
        //     setRole(storedState.role);
        // }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        const stateToStore = {
            answered,
            questionData,
            selectedQuestionIndex,
            selectedOptionIndex,
            correctAnswersCounter,
            showConfirmationModal,
            isLoggedin,
            testStarted,
            timeLeft,
            initialTime,
            showModal,
            role
        };
        localStorage.setItem('testMePlateState', JSON.stringify(stateToStore));
    }, [answered, questionData, selectedQuestionIndex, selectedOptionIndex, correctAnswersCounter, showConfirmationModal, isLoggedin, testStarted, timeLeft, initialTime, showModal, role]);

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

    const handleStartClick = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/check-user-exam`, { userId, examId: ofin_id });
            // if (response.data.message === 'Yes') {
            //     setAttemptedMessage("You have already taken this exam!");
            //     setTestStarted(false);
            //     setShowModal(false);
            // }
            // else {
                setTestStarted(true);
                setShowModal(true);
            // }
        } catch (error) {
            console.log('Error checking exam result', error);
        }
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
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
        setAnswered(true);
        // Save selected option to local storage
        const selectedQuestion = questionData[selectedQuestionIndex];
        const selectedOption = updatedQuestionData[selectedQuestionIndex].options[index];
        if (selectedOption.correct === '1') {
            setCorrectAnswersCounter((prevCounter) => prevCounter + 1);
        } else {
            setCorrectAnswersCounter((prevCounter) => prevCounter - 1);
        }
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

    const sendExamDataToAPI = () => {
        const examData = questionData.map(question => {
            const selectedOption = question.options.find(option => option.selected);
            return {
                userId: userId,
                questionId: question.id,
                optionId: selectedOption ? selectedOption.id : null,
                examId: question.exam_id,
                correct: selectedOption ? selectedOption.correct === '1' : false
            };
        });
        axios.post(`${API_BASE_URL}/selected_answers`, examData)
            .then(response => {
                console.log('Exam data sent successfully');

            })
            .catch(error => {
                console.error('Error sending exam data:', error);
            });
    };

    const handleTimeUp = () => {
        sendExamDataToAPI();
    };

    const handleFinishAttempt = () => {
        sendExamDataToAPI();
    };

    const handleBackButtonClick = () => {
        setShowModal(false);
        setTestStarted(false);
    };



    return (
        <section className='test'>
            <Helmet>
                <meta property="og:title" content="TEST_PLATE" />
                <meta property="og:image" content="withmoto.png" />
                <meta property="og:url" content="https://ofijan.com/ofijan_exam_plate/testmode/" />
            </Helmet>

            <Wrapper className='test__section'>
                <div className='ofijan_exam_plate'>
                    <h1 className='ofijanTestPlateHeader'>OFIJAN TEST PLATE</h1>
                    {!testStarted && (
                        <div className="strt">
                            <p>{attemptedMessage ? attemptedMessage : ""}</p>
                            <button className='butnstart' onClick={handleStartClick}>START TEST</button>
                        </div>
                    )}

                    {testStarted && (
                        <div className='plate'>
                            {showModal && (
                                <div className="wmodal">
                                    <div className="wmodal-content">
                                        <div className="topbar">
                                            <Button type='default' onClick={handleBackButtonClick}>Back</Button>
                                            {/* Show the timer only when exam type is null */}
                                            {questionData.length > 0 ? (
    <>
                                            {questionData[selectedQuestionIndex].exam.exam_type === null && isLoggedin && timeLeft && 
                                            <TimePlate timeLeft={formatTime(timeLeft)} />}</>):''}
                                        </div>

                                        <div className='wplate'>
                                            {questionData.length > 0 ? (
                                                <>
                                                    {questionData[selectedQuestionIndex].exam.exam_type === null ? (
                                                        <>
                                                            <div className='flag_plate'>
                                                                <h5>Question {selectedQuestionIndex + 1}/{questionData.length}</h5>
                                                               
                                                                <p></p>
                                                                <p><a href='#' onClick={() => handleFlagClick(selectedQuestionIndex)}>Flag Question</a></p>
                                                            </div>
                                                            <div className='question_plate'>
                                                                <div className="questionplate">
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
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <LNavigationButtons
                                                                    handlePreviousClick={handlePreviousClick}
                                                                    handleNextClick={handleNextClick}
                                                                    handleFinishAttempt={sendExamDataToAPI}
                                                                    selectedQuestionIndex={selectedQuestionIndex}
                                                                    length={questionData.length - 1}
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
                                                        </>
                                                    ) : (
                                                        <div className="questionText">
                                                            <h1>This exam is not available for you!</h1>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="error_message">
                                                    <p>Error: Unable to fetch question data</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Wrapper>



        </section>
    );
};
export default TestMePlate;
