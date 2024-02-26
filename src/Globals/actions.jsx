import * as actionTypes from './actionTypes';
export const fetchQuizRequest = () => {
  return {
    type: actionTypes.FETCH_QUIZ_REQUEST,
  };
};

export const fetchQuizSuccess = (quizData) => {
  return {
    type: actionTypes.FETCH_QUIZ_SUCCESS,
    payload: {
      questions: quizData,
    },
  };
};

export const fetchQuizFailure = (error) => {
  return {
    type: actionTypes.FETCH_QUIZ_FAILURE,
    payload: {
      error,
    },
  };
};

// Action creator for submitting an answer
export const submitAnswer = (questionId, selectedOptionId, examId) => {
  return {
    type: actionTypes.SUBMIT_ANSWER,
    payload: {
      questionId,
      selectedOptionId,
      examId,
    },
  };
};
