import React, { useState, useEffect } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import "./question.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
import axios from 'axios';
import '../../components/featuredInfo/featuredInfo.css'
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
export default function SelectExam() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtopic, setSubTopic] = useState('');
    const [reference_id, setReference] = useState(1);
    const [department_id, setDeptId] = useState('');
    const [referenceData, setReferenceData] = useState('');
    const [user_id, setUserID] = useState('');
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const userDept = JSON.parse(loggedInUser);
            setDeptId(parseInt(userDept.user.dept_id));
            const users = JSON.parse(loggedInUser);
            setUserID(users.user.id);
            const uri = `http://127.0.0.1:8000/api/all_references/${user_id}`;
            console.log(uri)
            axios.get(uri)
                .then(response => {
                    setReferenceData(response.data.references);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        }
    }, [user_id]);
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/add_topics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, subtopic, description, reference_id }),

            });
            console.log(JSON.stringify({ title, subtopic, description, reference_id, department_id, user_id }))
            if (response.ok) {
                console.log('Topic data sent successfully!');
                // Reset the form fields
                setTitle('');
                setDescription('');
                setSubTopic('');
                setReference('');
            } else {
                console.log('Failed to send topic data.');
                console.log()
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className='topic'>
            <h3>Select Exam You want add question to:</h3>
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">Exam Name: 2015 Computer Science Model Exam</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">3 Question's</span>
                        <span className="featuredMoneyRate">
                            Sales 20 <ArrowUpward className="featuredIcon" />
                        </span>
                    </div>
                    <span className="featuredSub">Visited by 0 people so far</span>
                    <button className='my-button'>Select</button>
                </div>
            </div>
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">Exam Name: 2016 Computer Scince Model Exam </span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">3 Question's</span>
                        <span className="featuredMoneyRate">
                            Sales 20 <ArrowUpward className="featuredIcon" />
                        </span>
                    </div>
                    <span className="featuredSub">Visited by 0 people so far</span>
                    <button className='my-button'>Select</button>
                </div>
            </div>
        </div>
    );
}
