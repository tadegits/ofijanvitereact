import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
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
     
      <Card title={<h2>Blue Print</h2>} >
        {loading ? (
          <p>Loading...</p>
        ) : bluePrintData.length ? (
          bluePrintData.map((bp, index) => (
            <Link key={index} to={`/display-pdf/${bp}`}state={{ bluedata: bp }}>
             <ul>
              <li className='blueprint__list'>
              <h1 key={index}>{bp}</h1>
              </li>
              </ul>
            </Link> 
          ))
        ) : (
          <p>No blueprint data available</p>
        )}
      </Card>

  );
};

export default BluePrintCard;
