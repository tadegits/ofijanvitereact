import API_BASE_URL from './apiConfig';
import { fetchQuizRequest, fetchQuizSuccess, fetchQuizFailure } from './actions';
export const fetchQuizData = ({ofin_id}) => {
  return async (dispatch) => {
    dispatch(fetchQuizRequest());
    try {
      const response = await fetch(`${API_BASE_URL}/way_questions/${ofin_id}`); 
      const data = await response.json();
      dispatch(fetchQuizSuccess(data));
    } catch (error) {
      dispatch(fetchQuizFailure(error.message));
    }
  };
};
