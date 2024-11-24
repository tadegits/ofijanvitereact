import React, { useState, useEffect } from 'react';
import { Card, List, Typography } from 'antd';
// import './pdf.scss';
import './BluePrintCard.scss';
import API_BASE_URL from '../../Globals/apiConfig';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
const BluePrintCard = () => {
  const [bluePrintData, setBluePrintData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const response1 = await fetch(`${API_BASE_URL}/fetch_blue_print_path`);
        const data1 = await response1.json();
        setBluePrintData(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBluePrint();
  }, []);

  console.log('blueprint', bluePrintData);
  return (
    <Card>
      <h2>Blueprint for Ethiopian National Exit Examination </h2>
    {loading ? (
      <div className='loading_container'>
      <div className="loading">

      </div>
    </div>
    ) : bluePrintData.length ? (
      <ul>
        {bluePrintData.map((bp, index) => (
          <li key={index} className="blueprint__list">
            <Link to={`/display-pdf/${bp}`} state={{ bluedata: bp }}>
              <h2>{bp}</h2>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>Error fetching refresh the page</p>
    )}
  </Card>
  );
};

export default BluePrintCard;
