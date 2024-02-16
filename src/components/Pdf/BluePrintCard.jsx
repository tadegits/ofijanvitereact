import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import './pdf.scss';
import API_BASE_URL from '../../Globals/apiConfig';

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
    <div>
      <Card title={<h2>Blue Print</h2>}>
        {loading ? (
          <p>Loading...</p>
        ) : bluePrintData.length ? (
          bluePrintData.map((bp, index) => (
            <Link to={`/display-pdf/${bp}`} state={{ pdfs: bp }}>
              <p key={index}>{bp}</p>
            </Link> 
          ))
        ) : (
          <p>No blueprint data available</p>
        )}
      </Card>
    </div>
  );
};
export default BluePrintCard;