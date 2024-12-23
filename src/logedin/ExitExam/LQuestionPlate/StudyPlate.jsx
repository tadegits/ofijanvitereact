
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useLoggedInUser from '../../../Globals/useLoggedInUser';
import StudyNavButtons from './StudyNavButtons';
import LAnswerBox from './LAnswerBox';
import axios from 'axios';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
import TimePlate from './TimePlate';
import API_BASE_URL from '../../../Globals/apiConfig';
// import '../LQuestionPlate/plate.scss';
import './studyplate.scss';
import { Helmet } from 'react-helmet';
import TypingEffect from '../../../components/TypingEffect/TypingEffect';
import Wrapper from '../../../components/wrapper/Wrapper';
import AdvertisementCard from '../../../components/Add/AdvertisementCard';
const StudyPlate = () => {
    const { ofin_id } = useParams();
    const { deptId, userId } = useLoggedInUser();
    const [answered, setAnswered] = useState(false);
    const [questionData, setQuestionData] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [timeLeft, setTimeLeft] = useState('');
    const alphabet = ["A", "B", "C", "D"];
    const [examType, setExamType] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 2000);

        return () => clearInterval(timerInterval);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            // setTimeLeft(0); 
        }
    }, [timeLeft]);
    useEffect(() => {
        fetch(`${API_BASE_URL}/way_questions/${ofin_id}`)
            .then((res) => res.json())
            .then((data) => {
                setQuestionData(data);
                setExamType(data[10].exam.exam_type);
                setTimeLeft(data[10].exam.exam_duration);
            })
            .catch((err) => console.log(err));

    }, [ofin_id, userId]);

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
        setSelectedQuestionIndex(index);
        setSelectedOptionIndex(questionData[index].options.findIndex((option) => option.selected));
    };
    const handleOptionClick = (index) => {
        const updatedQuestionData = [...questionData];
        updatedQuestionData[selectedQuestionIndex].options = updatedQuestionData[selectedQuestionIndex].options.map((option, i) => ({
            ...option,
            selected: i === index,
        }));
        setQuestionData(updatedQuestionData);
        setSelectedOptionIndex(index);
        setAnswered(true);

        // Adjust correct answers count logic here
        if (updatedQuestionData[selectedQuestionIndex].options[index].correct === '1') {
            setCorrectAnswersCounter(prevCounter => prevCounter + 1);
        } else {
            setCorrectAnswersCounter(prevCounter => prevCounter - 1);
        }

        // Handle API call logic
        const selectedQuestion = questionData[selectedQuestionIndex];
        const selectedOptionID = selectedQuestion.options[selectedOptionIndex];
        axios.post(`${API_BASE_URL}/selected-answers`, {
            user_id: 1,
            question_id: selectedQuestion,
            option_id: selectedOptionID,
        });
    };
console.log(selectedOptionIndex);
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

    return (
        <section className='exam'>
            <Helmet>
                <meta property="og:title" content="STUDY_PLATE" />
                <meta property="og:image" content="withmoto.png" />
                <meta property="og:url" content="https://ofijan.com/ofijan_exam_plate/testmode/" />
            </Helmet>
            <Wrapper className='exam__section'>


                <div className='studyplate'>
                    <div className='sflag_plate'>
                        <AdvertisementCard /><AdvertisementCard />

                    </div>
                    {examType == null ?
                        <><div className='sofijan_exam_plate_study'>



                            <div className="squestion_plate_study">
                                {/* <Link to={`/ofijan_exam_plate/testmode/${ofin_id}`} className="switch">
                         Switch To Test Mode
                    </Link> */}

                                {questionData.length > 0 && (
                                    <>
                                        <div className="squestionText">
                                            <p dangerouslySetInnerHTML={{ __html: questionData[selectedQuestionIndex].question_text }} />
                                        </div>
                                        <div className="choice_plate_study">

                                            {questionData[selectedQuestionIndex].options.map((option, index) => {
                                                const isSelected = selectedOptionIndex === index;
                                                const isCorrectAnswer = option.correct === 1;
                                                return (
                                                    <label
                                                        className={`option_box ${isSelected ? 'selected' : ''} ${isCorrectAnswer && selectedOptionIndex !== null?  'correct-answer' : ''}`}
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
                                                        {isCorrectAnswer && selectedOptionIndex !== null &&   <CheckIcon className="animated-check-icon" />}
                                                    </label>

                                                );
                                            })}
                                            <>

                                                {questionData[selectedQuestionIndex].options.some(option => option.selected) &&
                                                    <div className='s2description'>
                                                     <TypingEffect htmlText={questionData[selectedQuestionIndex].answer_description} speed={10} />
                                                     </div>} </>


                                        </div>
                                    </>
                                )}
                            </div>
<div>
<ins class="adsbygoogle"
     style={{display: 'block'  }}
     data-ad-format="autorelaxed"
     data-ad-client="ca-pub-8449765590756444"
     data-ad-slot="8333904759"></ins>
</div>
                            <StudyNavButtons
                                handlePreviousClick={handlePreviousClick}
                                handleNextClick={handleNextClick}
                                selectedQuestionIndex={selectedQuestionIndex}
                                length={questionData.length - 1}
                            />
                        </div>
                        <div><ins class="adsbygoogle"
     style={{display: 'block'  }}
     data-ad-format="autorelaxed"
     data-ad-client="ca-pub-8449765590756444"
     data-ad-slot="8333904759"></ins>
</div>
                            <div className="sanswer_plate">
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
                            </div></> : "Sorry this exam is not available for you!"}
                </div>
            </Wrapper>
        </section>

    );
};
export default StudyPlate;




