import "../list.scss";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useLoggedInUser from '../../../Globals/useLoggedInUser';
import API_BASE_URL from '../../../Globals/apiConfig';
import { Link } from "react-router-dom";

export default function Question() {
  const { deptId, userId } = useLoggedInUser();
  const [questionUri, setQuestionUri] = useState('');
  const [userID, setUserID] = useState();
  const [questionData, setQuestionData] = useState('');
  const [questionOption, setQuestionOption] = useState('');
  const alphabet = ["A", "B", "C", "D"];
  useEffect(() => {
    setUserID(userId);
    setQuestionUri(`${API_BASE_URL}/all_questions/${userId}`);
    axios.get(questionUri)
      .then(response => {
        setQuestionData(response.data.questions);
        setQuestionOption(response.data.questions.options)
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [questionUri]);

  return (
      <div className="userList">
        {questionData && questionData.map((question) => (
          <div key={question.id}>
            <b><p dangerouslySetInnerHTML={{ __html: question.question_text }}/></b>
            <ul>
              {question.options.map((option, index) => (
                <li key={option.id}>
                  <span>{alphabet[index]}. </span>
                  {option.option} - {option.correct === 1 ? "Correct" : "Incorrect"}
                </li>
              ))}
            </ul>
            <Link to="/">
              <p>Edit</p>
            </Link>
          </div>
        ))}
      </div>
  );
}
