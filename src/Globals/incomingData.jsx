import axios from 'axios';
import API_BASE_URL from './apiConfig';
import { useState, useEffect } from 'react';
const fetchPdfs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/load_pdf`);
    return response.data;
    console.log("do", response);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
export { fetchPdfs };