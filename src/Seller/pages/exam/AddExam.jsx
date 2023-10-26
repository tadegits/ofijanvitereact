import React, { useState, useEffect } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import "./exam.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
export default function AddExam() {
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
                body: JSON.stringify({ title, description, subtopic, reference }),
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
            <h3>Add Exam</h3>
            <span><i><PriorityHighIcon />"Grouping questions within exams enables organized packaging and presentation. 
            By bundling questions under exam names, you can showcase your work in a more appealing and controlled 
            manner, streamlining clicks and driving sales."</i></span>
            <br></br>
            <section className="login">
                <Wrapper>
                    <div className="login__container">
                        <div className="form2">
                            <div className="form-contents1">
                                <div className="department">
                                    <div className="fnames">
                                        <label>Exam Name</label>
                                        <input
                                            type="text"
                                            placeholder="2016 Model Exam for Accounting Department (Avoid using vague titles)"
                                            className="dept"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)} />
                                        <div className="errormessage"></div>
                                    </div>
                                    <div className="fnames">
                                        <label>Duration(<small> in minutes </small>)</label>
                                        <input
                                            type="number"
                                            placeholder=' 10 min'
                                            className="dept"
                                            required
                                            value={subtopic}
                                            onChange={(e) => setSubTopic(e.target.value)} />
                                        <div className="errormessage"></div>
                                    </div>
                                    <div className="fnames">
                                        <label>Description</label>
                                        <input type="text"
                                            placeholder='Those Questions will definetly appear on your exit exam'
                                            className="dept"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required />
                                        <div className="errormessage"></div>
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
