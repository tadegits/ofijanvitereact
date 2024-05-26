import * as actionTypes from './actionTypes';

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        questions: action.payload.questions,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.SUBMIT_ANSWER:
      return state; 
    default:
      return state;
  }
};

export default quizReducer;
