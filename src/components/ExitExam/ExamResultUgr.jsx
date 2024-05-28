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
        axios.get('https://server.ofijan.com/api/fetchinstantResultByUgr/167')
            .then(response => {
                const data = response.data;
                setResults(data.correct_counts);
                setAverageScore(data.average_score);
                setPassedCount(data.passed_count);
                setFailedCount(data.failed_count);
                setHighestScorer(data.top_scorer);
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
                <Typography.Paragraph>Department: Amharic Language and Literature</Typography.Paragraph>
                <Typography.Paragraph>Total Participants: 26</Typography.Paragraph>
            </div>

            {highestScorer && (
                <>
                    <Divider />
                    <div className="highest-scorer-section">
                        <Title className="title" level={3}>🏆 Highest Scorer</Title>
                        <Typography.Paragraph className="paragraph">
                            <b>{highestScorer.name.charAt(0).toUpperCase() + highestScorer.name.slice(1)}</b> scored the highest with <b>{highestScorer.total_correct}</b> correct answers <SmileOutlined />
                        </Typography.Paragraph>
                    </div>
                </>
            )}

            <Divider />
            <div className="statistics-section">
                <Title className="title" level={3}>📊 Statistics</Title>
                <Statistic className="statistic-item" title="Average Score" value={parseFloat(averageScore).toFixed(2)} />
                <Statistic className="statistic-item" title="Passed" value={passedCount} />
                <Statistic className="statistic-item" title="Failed" value={failedCount} />
            </div>

            <Divider />
            <div className="exam-results-section">
    <Title className="title" level={3}>📝 Exam Results</Title>
    <div className="two-column-container">
        <div className="column">
            {results
                .filter((result, index) => index < Math.ceil(results.length / 2))
                .map((result, index) => (
                    <ResultItem key={index} result={result} index={index} />
                ))}
        </div>
        <div className="column">
            {results
                .filter((result, index) => index >= Math.ceil(results.length / 2))
                .map((result, index) => (
                    <ResultItem key={index} result={result} index={index + Math.ceil(results.length / 2)} />
                ))}
        </div>
    </div>
</div>


            <Button type="primary" onClick={handlePrint} className="print-button">
                Print
            </Button>
        </div>
    );
};

export default ExamResults;
const ResultItem = ({ result, index }) => {
    // Check if the name is null
    if (!result.name) {
        return null; // Return null if the name is null
    }

    return (
        <div className="result-item">
            <span className="sequence">{index + 1}.</span>
            <span className="name">{result.name.charAt(0).toUpperCase() + result.name.slice(1)}</span>
            <span className="result-space">
            <span className="correct-answers">
                <b>{result.correct_count}</b>
                <sub>/100</sub>
            </span>
            </span>
        </div>
    );
};




