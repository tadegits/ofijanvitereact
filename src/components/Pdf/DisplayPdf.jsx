import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import PropTypes from 'prop-types';
import API_BASE_URL from '../../Globals/apiConfig';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';

const DisplayPdf = ({ onClose, formData, studentName }) => {
    const location = useLocation();
    const pdfData = location.state.pdfData;
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    const {id} = useParams();

    useEffect(() => {
      if (pdfData) {
        const url = `${API_BASE_URL}/pdfs/${id}`;
        setPdfUrl(url);
        fetch(url)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => {
            setPdfFile(new Uint8Array(arrayBuffer));
            setLoading(false); // Set loading to false after PDF is fetched
          })
          .catch(error => {
            console.error('Error fetching PDF:', error);
          });
      }
    }, [pdfData]);

    if (!pdfData) {
      return <div>No PDF data available</div>;
    }

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>View</h2>
          {loading ? ( // Show Spin if loading is true
            <Spin size="large" />
          ) : (
            <>
              {/* <Document file={pdfFile}>
                <Page pageNumber={1} />
              </Document> */}
              <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
            </>
          )}
        </div>
      </div>
    );
};

DisplayPdf.propTypes = {
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object,
    studentName: PropTypes.string
};

export default DisplayPdf;
