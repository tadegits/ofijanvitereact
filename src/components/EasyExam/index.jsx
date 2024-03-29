import Wrapper from '../wrapper/Wrapper'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import API_BASE_URL from '../../Globals/apiConfig';
import axios from 'axios';
import ExamCard from '../ExamCard';
import { Helmet } from 'react-helmet';
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
    <Helmet>
                <meta property="og:title" content="EASY_EXAM" />
                <meta property="og:image" content="withmoto.png" />
                <meta property="og:url" content="https://ofijan.com/ofijan_exam_plate/testmode/" />
            </Helmet>
      <Wrapper className='easy_exam_wrapper ofijan__info'>
        <p>Search Exam By The Id You get from your teacher. and Add the password</p>
        <p>E.x exam Id 116  password: 123456</p>
        <div className='easy_exam_input_holder'>
       
          <input
            type="text"
            className='searchExam'
            placeholder="Type exam id here"
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