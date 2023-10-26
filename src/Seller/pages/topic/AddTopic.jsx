import React, { useState, useEffect } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import "./topic.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
export default function AddTopic() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtopic, setSubTopic] = useState('');
    const [reference, setReference] = useState('');
    const [dept_id, setDeptId] = useState('');
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const userDept = JSON.parse(loggedInUser);
            setDeptId(parseInt(userDept.user.dept_id));

        }
    }, []);
    const handleSubmit = async () => {
        try {
            const response = await fetch('https://api.example.com/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, subtopic, reference}),
            });

            if (response.ok) {
                console.log('Topic data sent successfully!');
                // Reset the form fields
                setTitle('');
                setDescription('');
                setSubTopic('');
                setReference('');
            } else {
                console.log('Failed to send topic data.');
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
                                        <select name='type'
                                            className='dept'
                                            value={reference}
                                            onChange={(e) => setReference(e.target.value)}
                                            required>
                                            <option value="Book">a Book by walter white</option>
                                            <option value="Journal">Journal</option>
                                            <option value="Website">Web-link</option>
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
