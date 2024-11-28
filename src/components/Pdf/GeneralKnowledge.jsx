import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GeneralKnowledge.scss';

const GeneralKnowledge = ({ title }) => {
    const [loading, setLoading] = useState(true);
    const [concepts, setConcepts] = useState([]);
    const [error, setError] = useState(null);

    // Predefined list of topics to randomize
    const topicVariants = [
        'Veterinary medicine',
        'Animal welfare science',
        'Animal breeding',
        'Animal testing',
        'Animal welfare',
        'Veterinary anatomy',
        'Animal physiology',
        'Animal ethics'
    ];

    // Randomly select a topic from the list each time
    const getRandomTopic = () => {
        const randomIndex = Math.floor(Math.random() * topicVariants.length);
        return topicVariants[randomIndex];
    };

    const fetchWikipediaData = async (query) => {
        try {
            const response = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
            );
            const data = await response.json();

            const results = data.query?.search || [];
            const detailedConcepts = await Promise.all(
                results.map(async (item) => {
                    const detailedResponse = await fetch(
                        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(
                            item.title
                        )}&format=json&origin=*`
                    );
                    const detailedData = await detailedResponse.json();
                    const page = Object.values(detailedData.query.pages)[0];
                    return {
                        title: item.title,
                        extract: page.extract || 'No description available.',
                        link: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
                    };
                })
            );
            setConcepts(detailedConcepts);
        } catch (error) {
            console.error('Error fetching Wikipedia data:', error);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (title) {
            fetchWikipediaData(title);
        } else {
            fetchWikipediaData(getRandomTopic()); // Randomize topic if no title is passed
        }
    }, [title]);

    return (
        <div className="general-knowledge-section">
            <h3>General Knowledge Related to {title || 'Animal Science'}</h3>
            
            {loading ? (
                <p>Loading concepts...</p>
            ) : error ? (
                <p>{error}</p>
            ) : concepts.length > 0 ? (
                <ul>
                    {concepts.map((concept, index) => (
                        <li key={index} className="concept-item">
                            <h4>{concept.title}</h4>
                            <p>{concept.extract}</p>
                            {/* <a
                                href={concept.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="read-more-link"
                            >
                                Read more &raquo;
                            </a> */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No general knowledge concepts found for "{title}".</p>
            )}
        </div>
    );
};

GeneralKnowledge.propTypes = {
    title: PropTypes.string,
};

export default GeneralKnowledge;
