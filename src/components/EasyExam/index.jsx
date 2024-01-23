import Wrapper from '../wrapper/Wrapper'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './easyexam.scss';
const index= () => {
  const [examID, setExamID] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    examID: '',
  });
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/transcripts/search/${itemNumber}`); 
      setSearchResults(response.data.transcripts);
      openSearchResultsModal();
    } catch (error) {
      console.error('Error fetching search results:', error);
      setErrors({ ...errors, server: 'Error fetching search results' });
    } finally {
      setLoading(false);
    }
  };
  return <section className='easyExam' >
    <Wrapper className='easy_exam_wrapper' >
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
  </section>
}

export default index