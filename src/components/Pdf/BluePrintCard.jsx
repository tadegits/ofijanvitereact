import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
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
            <a 
              href={`${API_BASE_URL}/blueprints/${bp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p key={index}>{bp}</p>
            </a> 
          ))
        ) : (
          <p>No blueprint data available</p>
        )}
      </Card>
    </div>
  );
};

export default BluePrintCard;
