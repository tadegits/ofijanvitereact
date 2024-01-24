import Wrapper from '../wrapper/Wrapper'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import API_BASE_URL from '../../Globals/apiConfig';
import axios from 'axios';
import ExamCard from '../ExamCard';
import './easyexam.scss';
const index = () => {
  const [examID, setExamID] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    examID: '',
    server: '',
  });

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/exams/search/${examID}`);
      setSearchResults(response.data.exams);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setErrors((prevErrors) => ({ ...prevErrors, server: 'Error fetching search results' }));
    } finally {
      setLoading(false);
    }
  };

  console.log('sent exams', searchResults);

  return (
    <section className='easyExam'>
      <Wrapper className='easy_exam_wrapper'>
        <div className='easy_exam_input_holder'>
          <input
            type="text"
            className='searchExam'
            placeholder="Type item number here"
            value={examID}
            onChange={(e) => setExamID(e.target.value)}
          />
          <button
            className='searchExamBtn'
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </Wrapper>
      <ExamCard exams={searchResults} />
    </section>
  );
};

export default index;