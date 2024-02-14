import axios from 'axios';
import API_BASE_URL2 from './api';
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
const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL2}/departments`);
    return response.data.departments;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

export { fetchDepartments };
const fetchDepartmentByCollege = async (college_id) => {
  try { 
    const response = await axios.get(`${API_BASE_URL2}/departmentswith/${college_id}`);
    return response.data.departments;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

export { fetchDepartmentByCollege };
const fetchColleges = async (college_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/colleges`);
    return response.data.colleges;
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return [];
  }
};

export { fetchColleges };