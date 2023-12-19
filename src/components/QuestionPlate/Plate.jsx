import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLoggedInUser from '../../Globals/useLoggedInUser';
import  NavigationButtons from './NavigationButtons';
import QuestionComponent from './QuestionComponent';
import AnswerBox from './AnswerBox'
import axios from 'axios';
import Swal from 'sweetalert2';
import TimerIcon from '@mui/icons-material/Timer';
import API_BASE_URL from '../../Globals/apiConfig';
const Plate = () => {
    const { ofin_id } = useParams();
    const { deptId, userId } = useLoggedInUser();
    const [answered, setAnswered] = useState(false);
    const [questionData, setQuestionData] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            // Handle when time is up   
        }
    }, [timeLeft]);
    useEffect(() => {
        fetch(`${API_BASE_URL}/way_questions/${ofin_id}`)
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
        if (selectedQuestionIndex < 4) {
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
            {/* <div className='basicInfoPlate'>
                <table>
                    <tr>
                        <th>Picture</th>
                        <th>Basic Information</th>
                    </tr>
                    <tr>
                        <td><img src={Logo} width={10} height={10} alt='profile picture' /></td>
                        <td className='basicInfoPlate2'>
                            <tr>
                                <td>Full Name Million Sime</td>
                                <td>Institution:  Ofin University</td>
                            </tr>
                            <tr><td>Enrolment Type: Regular</td>
                                <td>University ID O/UR28147/11</td>
                            </tr>
                            <tr><td>Exam Center: Ofin University</td>
                                <td>Department: Computer Science</td>
                            </tr>
                        </td>
                    </tr>
                </table>
            </div> */}
            <div className='plate'>
                <div className='flag_plate'>
                    <h5>Question {selectedQuestionIndex + 1}</h5>
                    <p>Answer saved</p>
                    <p>Marked out of 100</p>
                    <p></p>
                    <p><a href='#' onClick={() => handleFlagClick(selectedQuestionIndex)}>Flag Question</a></p>
                </div>
                <div className='question_plate'>
                    <div className="timePlate">
                        <div className="timebox1"></div>
                        <div className='timebox2'>
                            <TimerIcon /> Time left {timeLeft} sec
                        </div>
                    </div>
                    <QuestionComponent
          question={questionData[selectedQuestionIndex]}
          selectedOptionIndex={selectedOptionIndex}
          handleOptionClick={handleOptionClick}
          handleClearChoiceClick={handleClearChoiceClick}
        />
                    <NavigationButtons
          handlePreviousClick={handlePreviousClick}
          handleNextClick={handleNextClick}
          selectedQuestionIndex={selectedQuestionIndex}
        />
                </div>
                <div className="answer_plate">
          <h5>Exam Navigation</h5>
          <div className="answer_plate">
            {questionData.map((question, index) => (
              <AnswerBox
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

            </div>
            {/* <div className='correct_counter'>Correct Answers: {correctAnswersCounter}</div> */}
        </div>
    );
};

export default Plate;




