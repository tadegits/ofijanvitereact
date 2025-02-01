import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
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
        axios.post(`${API_BASE_URL}/fetch-exams-taken-by-students`, { user_id: id })
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
            });
    };

    const columns = [
        {
            title: 'Exam Name',
            dataIndex: 'exam_name',
            key: 'name',
        },
        {
            title: 'Result (Correct / Attempted)',
            key: 'result',
            render: (record) => `${record.correct_count} / ${record.attempted_count}`,
        }
    ];

    return (
        <section className='result'>
            <Wrapper className='result__section'>
                <div>
                    <h1>Exam Results</h1>
                    {errorMessage && <p>{errorMessage}</p>}
                    {!errorMessage && (
                        loading ? (
                            <div className="loading_container">
                                <div className="loading">

                                </div>
                                <p>Loading...</p>
                            </div>
                            
                        ) : (
                            <Table dataSource={results} columns={columns} pagination={false} rowKey="id" />
                        )
                    )}
                </div>
            </Wrapper>
        </section>
    );
};

export default Index;
