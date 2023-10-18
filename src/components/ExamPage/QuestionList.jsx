import React from 'react'
import './StyleBox.css'
import  Instructions from './Instructions'

const handleClick = (event) => {
alert(event.target.id)
}
const questions = [
  {
  qId: 1,
  name: "What type of data structure used in order to implement printer program ?"
  },
  {
  qId: 2,
  name: "Data representation inside the computer memory is known as__________?"
  },
  {
  qId: 3,
  name: "____________ is program translator that convert the whole source code to executable code at one time."
  }
 ];
 

function QuestionList() {
  return (
    <>
      <div className="features__feature dark-feature">
        <div> <Instructions /> </div>
        
        {
          questions.map(question => (
          <button key={question.name} id = "1" className="square" onClick={handleClick} >
            <span role="img" aria-label={question.name}
                  id={question.name}>{question.qId}</span>
                  </button> ))
           }

        
      </div>
    </>
  )
}

export default QuestionList