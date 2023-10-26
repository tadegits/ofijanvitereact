import React from 'react';
import './question.scss';
import "./styles.css";
import AddQuestionForm from './component/AddQuestionForm';
export default function index() {
  return (
    <div className="question">
      <AddQuestionForm/>
    </div>
  )
}
