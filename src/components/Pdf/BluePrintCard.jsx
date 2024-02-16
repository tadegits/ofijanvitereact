import React, { useState, useEffect } from 'react'
import { Card, Avatar, Descriptions,  Collapse} from 'antd';
import './pdf.scss';
import API_BASE_URL from '../../Globals/apiConfig';
const { Panel } = Collapse;
const BluePrintCard = () => {
  const [bluePrintData, setBluePrintData] = useState([]);
  useEffect(() => {
        const url = `${API_BASE_URL}/fetch_blue_print_path`;
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                setBluePrintData(new Uint8Array(arrayBuffer));
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching PDF:', error);
            });
}, []);

  return (
    <div>
    <Card title={<h2>Blue Print</h2>}>
{bluePrintData.length? 

(bluePrintData.map((bp, index)=>{
  <>
  {bp}
  </>}
  ))
  :
  (<></>)
}
     
    </Card>

    </div>
  )
}

export default BluePrintCard
