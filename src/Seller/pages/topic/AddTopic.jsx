import React, { useState, useEffect } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import "./topic.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
import axios from 'axios';
import Topic from './Topic';
export default function AddTopic() {
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
                body: JSON.stringify({ title, subtopic, description, reference_id, user_id, department_id }),

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
        <div className="topic">
            <h3>Add Topic </h3>
            <span><i><PriorityHighIcon />Adding topics to your exams enhances the quality of
                the questions and significantly benefits students preparing for their exit exams.
                By categorizing questions under relevant topics, students can easily navigate and
                focus on specific subjects they need to study, identify their strengths and weaknesses,
                and ensure a comprehensive evaluation of their knowledge</i></span>
            <br></br>
            <section className="login">
                <Wrapper>
                    <div className="login__container">
                        <div className="form2">
                            <div className="form-contents1">
                                <div className="department">
                                    <div className="fnames">
                                        <label>Title / Tag / Book Chapter</label>
                                        <input
                                            type="text"
                                            placeholder='Chapter 7: Falacy'
                                            className="dept"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)} />
                                        <div className="errormessage"></div>
                                    </div>
                                    <div className="fnames">
                                        <label>SubTopic</label>
                                        <input
                                            type="text"
                                            placeholder='(Optional) False Cause falacy'
                                            className="dept"
                                            required
                                            value={subtopic}
                                            onChange={(e) => setSubTopic(e.target.value)} />
                                        <div className="errormessage"></div>
                                    </div>
                                    <div className="fnames">
                                        <label>Description</label>
                                        <input type="text"
                                            placeholder='Additional description if any(optional)'
                                            className="dept"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)} />
                                        <div className="errormessage"></div>
                                    </div>
                                    <div className="department">
                                        <label>Mention Reference</label>
                                        <select
                                            name="type"
                                            className="dept"
                                            value={reference_id}
                                            onChange={(e) => setReference(e.target.value)}
                                            required
                                        >
                                            {referenceData &&
                                                referenceData.map((rData) => (
                                                    <option key={rData.id} value={rData.id}>
                                                        {rData.title}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="summit-signup">
                                    <button className='sigbtn' onClick={handleSubmit}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </section>
        </div>
    );
}
