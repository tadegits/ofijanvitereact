import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLoggedInUser from '../../Globals/useLoggedInUser';
import './plate.scss';
import Logo from "../../assets/logo.png"

const Plate = () => {
    const { ofin_id } = useParams();
    const { deptId, userId } = useLoggedInUser();
    const [questionData, setQuestionData] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);

    useEffect(() => {
        fetch(`https://ofijan.com/api/way_questions/${ofin_id}`)
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
        if (questionData[selectedQuestionIndex].options[index].correct === '1') {
            setCorrectAnswersCounter((prevCounter) => prevCounter + 1);
        } else {
            setCorrectAnswersCounter((prevCounter) => prevCounter - 1);

        }

        // // Send the selected answer to the backend
        // const selectedQuestion = questionData[questionIndex];
        // const selectedOption = selectedQuestion.options[optionIndex];

        // axios.post('/selected-answers', {
        //   user_id: userId,
        //   question_id: selectedQuestion.id, // Assuming you have question IDs in your data
        //   option_id: selectedOption.id, // Assuming you have option IDs in your data
        // })
        // .then(response => {
        //   // Handle the response if needed
        // })
        // .catch(error => {
        //   // Handle errors if needed
        // });


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
    return (
        <div className='ofijan_exam_plate'>
            <div  className='basicInfoPlate'>
                <table>
                    <tr>
                        <th>Picture</th>
                        <th>Basic Information</th>
                    </tr>
                    <tr>
                        <td><img src={Logo} width={10} height={10} alt='profile picture'/></td>
                        <td  className='basicInfoPlate2'>
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
               
            </div>
            <div className='plate'>

                <div className='flag_plate'>
                    <h5>Question {selectedQuestionIndex + 1}</h5>
                    <p>Answer saved</p>
                    <p>Marked out of 100</p>
                    <p></p>
                    <p><a href='#'>Flag Question</a></p>
                </div>
                <div className='question_plate'>
                    <div className="timePlate"> 
                    <div className="timebox1"></div>
                    <div className="timebox2">Time left 20 min</div>
                    </div>
                    <div className="questionplate">
                    {questionData.length > 0 && (
                        <>
                          <div className="questionText"> 
                          <p dangerouslySetInnerHTML={{ __html: questionData[selectedQuestionIndex].question_text }} />
                          </div> 
                          <div className="choicePlate">
                            {questionData[selectedQuestionIndex].options.map((option, index) => (
                                <label
                                    className={`option_box ${selectedOptionIndex === index ? 'selected' : ''}`}
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                >
                                    <input
                                        type='radio'
                                        name={`option_${selectedQuestionIndex}`}
                                        value={option.option}
                                        checked={selectedOptionIndex === index}
                                        readOnly
                                    />
                                    {option.option}
                                </label>
                                
                            ))}</div>
                            <div className='navigation_buttons'>
                                <button onClick={handlePreviousClick} disabled={selectedQuestionIndex === 0}>
                                    Previous
                                </button>
                                <button onClick={handleNextClick} disabled={selectedQuestionIndex === questionData.length - 1}>
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                    </div>
                </div>
                <div className='answer_plate'>
                    <h5>Exam Navigation</h5>
                    <div className='answer_plate'>
                    {questionData.map((question, index) => (
                        <div className={`answer_box_holder ${selectedQuestionIndex === index ? 'selected' : ''} ${question.options.some(option => option.selected) ? 'answered' : ''}`}
                            key={index}
                            onClick={() => handleQuestionClick(index)}>
                            <div className='answer_box'>{index + 1}</div>
                            <div
                                className={`answer_box ${selectedQuestionIndex === index ? 'selected' : ''} ${question.options.some(option => option.selected) ? 'answered' : ''}`}
                                key={index}
                                onClick={() => handleQuestionClick(index)}>
                            </div>

                        </div>
                    ))}
                    </div>
                </div>
                
            </div>
            <div className='correct_counter'>Correct Answers: {correctAnswersCounter}</div>
        </div>
    );
};

export default Plate;

