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
    <Card title={<h2>Blueprint for Ethiopian National Exit Examination </h2>}>
    {loading ? (
      <p>Fetching blueprint data...</p>
    ) : bluePrintData.length ? (
      <ul>
        {bluePrintData.map((bp, index) => (
          <li key={index} className="blueprint__list">
            <Link to={`/display-pdf/${bp}`} state={{ bluedata: bp }}>
              <h1>{bp}</h1>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>No blueprint data available</p>
    )}
  </Card>
  );
};

export default BluePrintCard;
