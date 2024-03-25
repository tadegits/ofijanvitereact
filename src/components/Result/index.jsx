import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import API_BASE_URL from '../../Globals/apiConfig';
import axios from 'axios';
import Wrapper from '../wrapper/Wrapper';
import './result.scss';

const Index = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser !== null) {
            const userLogged = JSON.parse(loggedUser);
            fetchResultsForUser(userLogged.user.id);
        }

    }, []);

    const fetchResultsForUser = (id) => {
        setLoading(true);
        const userId = id;
        axios.post(`${API_BASE_URL}/fetch-correct-answers`, { user_id: userId })
            .then(response => {
                if (response.data.message) {
                    setErrorMessage(response.data.message);
                    setResults([]); // Clear previous results
                } else {
                    setResults(response.data.exams);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
                // message.error('An error occurred while fetching results');
            });
    };

    const columns = [
        {
            title: 'Exam Name',
            dataIndex: 'exam_name',
            key: 'name',
        },
        {
            title: 'Correct Answers',
            dataIndex: 'correct_count',
            key: 'correct_count',
        }
    ];

    return (
        <section classname='result'>
            <Wrapper className='result__section'>
                <div>
                    <h1>Exam Results</h1>
                    {errorMessage && <p>{errorMessage}</p>}
                    {!errorMessage && (
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            <Table dataSource={results} columns={columns} pagination={false} />
                        )
                    )}
                </div>
            </Wrapper>
        </section>
    );
};

export default Index;
