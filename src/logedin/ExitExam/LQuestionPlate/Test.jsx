import React from 'react'
const alphabet = ["A", "B", "C", "D"];
const Test = ({ questionData, selectedQuestionIndex, handleQuestionClick, handleOptionClick, handlePreviousClick, handleNextClick, selectedOptionIndex }) => {
  return (
    <div>
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
                                        {questionData[selectedQuestionIndex].options.map((option, index) => {
                                            const isSelected = selectedOptionIndex === index;
                                            const isCorrectAnswer = option.correct === '1';

                                            return (
                                                <label
                                                    className={`option_box ${isSelected ? 'selected' : ''} ${selectedOptionIndex !== null && isCorrectAnswer ? 'correct-answer' : ''}`}
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
                                                    {/* <span className={`correct_is ${isCorrectAnswer ? 'hi' : ''} ${selectedQuestionIndex === index ? 'selected' : ''} ${questionData[selectedQuestionIndex].options.some(option => option.selected) ? 'answered' : ''} `} ><CheckIcon /></span> */}
                                                </label>
                                            );
                                        })}
                                        <h5>Clear Choice</h5>
                                    </div>

                                </>
                            )}
                        </div>  <div className='navigation_buttons'>
                            <button onClick={handlePreviousClick} disabled={selectedQuestionIndex === 0}>
                                Previous
                            </button>
                            <button onClick={handleNextClick} disabled={selectedQuestionIndex === questionData.length - 1}>
                                Next
                            </button>
                        </div>
                    </div>
                    <div className='answer_plate'>
                        <h5>Exam Navigation</h5>
                        <div className='answer_plate'>
                            {questionData.map((question, index) => (
                                <>
                                    <div
                                        className={`answer_box_holder ${selectedQuestionIndex === index ? 'selected' : ''} ${question.options.some(option => option.selected) ? 'answered' : ''}`}
                                        key={index}
                                        onClick={() => handleQuestionClick(index)
                                        }
                                    >
                                        <div className='answer_box'>{index + 1}</div>
                                        <div
                                            className={`answer_box ${selectedQuestionIndex === index ? 'selected' : ''} ${question.options.some(option => option.selected) ? 'answered' : ''}`}
                                            key={index}
                                            onClick={() => handleQuestionClick(index)
                                            }
                                        >
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                </div>
            
    </div>
  )
}

export default Test
