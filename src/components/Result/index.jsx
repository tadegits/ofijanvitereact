import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import API_BASE_URL from '../../Globals/apiConfig';
import axios from 'axios';

const index = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch exams and results for the logged-in user
        fetchResultsForLoggedInUser();
    }, []); // Run this effect only once on component mount

    const fetchResultsForLoggedInUser = () => {
        setLoading(true);
        axios.get(`${API_BASE_URL}/fetch-user-exams`)
            .then(response => {
                setResults(response.data.exams);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
                message.error('An error occurred while fetching results');
            });
    };

    const columns = [
        {
            title: 'Exam Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Correct Answers',
            dataIndex: 'correct_count',
            key: 'correct_count',
        }
    ];

    return (
        <div>
            <h1>Exam Results</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table dataSource={results} columns={columns} pagination={false} />
            )}
        </div>
    );
};

export default index;
