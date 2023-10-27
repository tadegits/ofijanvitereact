import React, { useState, useEffect } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import "./exam.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
export default function AddExam() {
    const [exam_name, setExamName] = useState('');
    const [description, setDescription] = useState('');
    const [exam_duration, setDuration] = useState('');
    const [teacher_id , setUserId] = useState('');
    const [department_id, setDepartmentId] = useState('');
    const [exam_grade, setGrade] = useState(100);
    const [exam_date, setExamDate] = useState("2023-10-27")
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const userDept = JSON.parse(loggedInUser);
            setDepartmentId(parseInt(userDept.user.dept_id));
            setUserId(parseInt(userDept.user.id));

        }
    }, []);
    const handleSubmit = async () => {
        try {
            const response = await fetch(`${import.meta.env.API_ROOT}/add_exams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exam_name, exam_duration, description, department_id, exam_grade, exam_date,  teacher_id }),
            });

            if (response.ok) {
                console.log(response)
                console.log('Exam data sent successfully!');
                // Reset the form fields
                setExamName('');
                setDescription('');
                setDuration('');
            } else {
                console.log(response)
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
                                            value={exam_name}
                                            onChange={(e) => setExamName(e.target.value)} />
                                        <div className="errormessage"></div>
                                    </div>
                                    <div className="fnames">
                                        <label>Duration(<small> in minutes </small>)</label>
                                        <input
                                            type="number"
                                            placeholder=' 10 min'
                                            className="dept"
                                            required
                                            value={exam_duration}
                                            onChange={(e) => setDuration(e.target.value)} />
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
