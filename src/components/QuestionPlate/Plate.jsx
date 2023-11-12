import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLoggedInUser from '../../Globals/useLoggedInUser';
import './plate.scss';
const Plate = () => {
    const { ofin_id } = useParams();
    const [questionData, setQuestionData] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // State to store the index of the selected question
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // State to store the index of the selected option
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0); // Counter for correct answers
    const { deptId, userId } = useLoggedInUser();
  
    useEffect(() => {
      fetch(`https://ofijan.com/api/way_questions/48`)
        .then((res) => res.json())
        .then((data) => {
          setQuestionData(data);
        })
        .catch((err) => console.log(err));
    }, [ofin_id, userId]);
  
    const handleQuestionClick = (index) => {
      setSelectedQuestionIndex(index);
      setSelectedOptionIndex(null); // Reset the selected option when a new question is selected
    };
  
    const handleOptionClick = (index) => {
      setSelectedOptionIndex(index);
      if (questionData[selectedQuestionIndex].options[index].correct === '1') {
        // Increment the correct answers counter if the selected option is correct
        setCorrectAnswersCounter((prevCounter) => prevCounter + 1);
      } else {
        // Decrement the correct answers counter if the selected option is incorrect
        setCorrectAnswersCounter((prevCounter) => prevCounter - 1);
      }
    };
  
    const handleNextClick = () => {
      if (selectedQuestionIndex < questionData.length - 1) {
        setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOptionIndex(null); // Reset the selected option when moving to the next question
      }
    };
  
    const handlePreviousClick = () => {
      if (selectedQuestionIndex > 0) {
        setSelectedQuestionIndex((prevIndex) => prevIndex - 1);
        setSelectedOptionIndex(null); // Reset the selected option when moving to the previous question
      }
    };
  
    return (
      <div className='ofijan_exam_plate'>
        <div className='plate'>
          <div className='flag_plate'>{ofin_id}</div>
  
          <div className='question_plate'>
            {questionData.length > 0 && (
              <>
                <p dangerouslySetInnerHTML={{ __html:  questionData[selectedQuestionIndex].question_text }}/>
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
                ))}
              </>
            )} <div className='navigation_buttons'>
            <button onClick={handlePreviousClick} disabled={selectedQuestionIndex === 0}>Previous</button>
            <button onClick={handleNextClick} disabled={selectedQuestionIndex === questionData.length - 1}>Next</button>
          </div>
          </div>
  
          <div className='answer_plate'>
            {questionData.map((question, index) => (
              <div
                className={`answer_box ${selectedQuestionIndex === index ? 'selected' : ''} ${question.options[selectedOptionIndex]?.correct === '1' ? 'answered_correct' : question.options[selectedOptionIndex] ? 'answered_incorrect' : ''}`}
                key={index}
                onClick={() => handleQuestionClick(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
  
          <div className='correct_counter'>Correct Answers: {correctAnswersCounter}</div>
  
         
        </div>
      </div>
    );
  };
  
  export default Plate;