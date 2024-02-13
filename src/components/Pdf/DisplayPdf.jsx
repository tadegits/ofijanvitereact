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
const DisplayPdf = ({ onClose, formData, studentName }) => {
    const location = useLocation();
    const pdfData = location.state.pdfData;
    const [pdfUrl, setPdfUrl] = useState([]);

    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {
        if (pdfData) {
           // setPdfUrl = `${API_BASE_URL}/pdfs/${pdfData.filename}`;
            fetch(`${API_BASE_URL}/pdfs/${pdfData.filename}`)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    setPdfFile(new Uint8Array(arrayBuffer));
                })
                .catch(error => {
                    console.error('Error fetching PDF:', error);
                });
        }
    }, [pdfFile]);
    
console.log('hy', pdfFile);
    if (!pdfData) {
        return null;
    }
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>view</h2>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <Document file={pdfFile}>
        <Page pageNumber={1} />
      </Document>
                 <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} /> 

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
