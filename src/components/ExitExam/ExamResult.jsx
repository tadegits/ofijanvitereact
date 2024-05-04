import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Typography, Statistic, Divider, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './examresults.scss';

const { Title } = Typography;

const ExamResults = () => {
    const [results, setResults] = useState([]);
    const [highestScorer, setHighestScorer] = useState(null);
    const [averageScore, setAverageScore] = useState(0);
    const [passedCount, setPassedCount] = useState(0);
    const [failedCount, setFailedCount] = useState(0);
    const [instructorName, setInstructorName] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [examName, setExamName] = useState("");
    const [totalParticipants, setTotalParticipants] = useState(0);

    useEffect(() => {
        // Fetch exam results
        axios.get('https://server.ofijan.com/api/fetchinstatntresult/157/users')
            .then(response => {
                const data = response.data;
                setResults(data.users);
                setAverageScore(data.average);
                setPassedCount(data.passed_count);
                setFailedCount(data.failed_count);
                setHighestScorer(data.high_scorer);
                setInstructorName(data.instructor_name);
                setSubjectName(data.subject_name);
                setExamName(data.exam_name);
                setTotalParticipants(data.total_participants);
            })
            .catch(error => {
                console.error('Error fetching exam results:', error);
            });
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="exam-results-container">
            <div className="header-section">
                <Title className="title" level={4}>Exam Result</Title>
                <Typography.Paragraph>Instructor: Dr. Abdulhayi</Typography.Paragraph>
                <Typography.Paragraph>Department: Physics</Typography.Paragraph>
                <Typography.Paragraph>Total Participants: 33</Typography.Paragraph>
            </div>

            {highestScorer && (
                <>
                    <Divider />
                    <div className="highest-scorer-section">
                        <Title className="title" level={3}>🏆 Highest Scorer</Title>
                        <Typography.Paragraph className="paragraph">
                            <b> {highestScorer.fname.charAt(0).toUpperCase() + highestScorer.fname.slice(1)} {highestScorer.lname.charAt(0).toUpperCase() + highestScorer.lname.slice(1)}</b> scored the highest with {highestScorer.total_correct_answers} correct answers <SmileOutlined />
                        </Typography.Paragraph>
                    </div>
                </>
            )}
            <Divider />
            <div className="statistics-section">
                <Title className="title" level={3}>📊 Statistics</Title>
                <Statistic className="statistic-item" title="Average Score" value={averageScore} />
                <Statistic className="statistic-item" title="Passed" value={passedCount} />
                <Statistic className="statistic-item" title="Failed" value={failedCount} />
            </div>

            <Divider />
            <div className="exam-results-section">
                <Title className="title" level={3}>📝 Exam Results</Title>
                <List
                    dataSource={results.sort((a, b) => a.fname.localeCompare(b.fname))}
                    renderItem={(result, index) => (
                        <List.Item className="list-item">
                            <Typography.Text className="result-text">
                                <span className="sequence">{index + 1}.</span>
                                <span className="name">
                                    {result.fname.charAt(0).toUpperCase() + result.fname.slice(1)} {result.lname.charAt(0).toUpperCase() + result.lname.slice(1)}
                                </span>
                                <span className="correct-answers">
                                    <b>{result.total_correct_answers} </b><sub>/100</sub>
                                </span>
                            </Typography.Text>
                        </List.Item>
                    )}
                />
            </div>

            <Button type="primary" onClick={handlePrint} className="print-button">
                Print
            </Button>
        </div>
    );
};

export default ExamResults;
