
import { Editor } from '@tinymce/tinymce-react';
import "./question.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
export default function AddQuestion() {
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
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const handleStepClick = (step) => {
        setCurrentStep(step);
    };
    return (
        <div className="question">
            <div className='gon_le_gon'>
                <h4>Add Question</h4>
                <p>You have added 5 Questions so far!</p>
                <MyButton />
            </div>
            <div className='step_holder'>
                <StepLine currentStep={currentStep} onStepClick={handleStepClick} />
                {currentStep === 1 && (
                    <div className='step1_question'>

                        <label>Question:</label>
                        <Editor
                            apiKey='bri3o5uila5hipo3wlvn2g31ebamxqqhrijyijvt8wmky45t'
                            init={{
                                height: '300', plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
                            initialValue="Type the question here!"
                        />

                    </div>
                )}
                {currentStep === 2 && (
                    <div className='choice'>
                      
                                <div className="gon_le_gon">
                                    <label>Choice 1</label>
                                    <div class="textarea-wrapper">
                                        <textarea placeholder="Enter your text here"></textarea>
                                        <input type="radio" id="radio-button" name="radio-button" />

                                    </div>
                                </div>
                                <div className="gon_le_gon">
                                    <label>Choice 2</label>
                                    <div class="textarea-wrapper">
                                        <textarea placeholder="Enter your text here"></textarea>
                                        <input type="radio" id="radio-button" name="radio-button" />

                                    </div>
                                </div>

                                <div className="gon_le_gon">
                                    <label>Choice 3</label>
                                    <div class="textarea-wrapper">
                                        <textarea placeholder="Enter your text here"></textarea>
                                        <input type="radio" id="radio-button" name="radio-button" />

                                    </div>
                                </div>
                                <div className="gon_le_gon">
                                    <label>Choice 4</label>
                                    <div class="textarea-wrapper">
                                        <textarea placeholder="Enter your text here"></textarea>
                                        <input type="radio" id="radio-button" name="radio-button" />

                                    </div>
                                </div>
                            </div>
                         
                )}
                {currentStep === 3 && (
                    <div className='mulu_mulu'>
                                <div className='Explanation'>
                                    <label>Answer Expalnation and study tip:</label>
                                    <Editor
                                        apiKey='bri3o5uila5hipo3wlvn2g31ebamxqqhrijyijvt8wmky45t'
                                        init={{
                                            height: '300',
                                            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                            tinycomments_mode: 'embedded',
                                            tinycomments_author: 'Author name',
                                            mergetags_list: [
                                                { value: 'First.Name', title: 'First Name' },
                                                { value: 'Email', title: 'Email' },
                                            ],
                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                        }}
                                        initialValue="Type the description for the correct answer here!"
                                    />
                                </div>
                            </div>
                )}
                {currentStep === 4 && (
                    <div className='step1_question'>
                        <section className="login">
                            <Wrapper>
                                <div className="login__container">
                                    <div className="form2">
                                        <div className="form-contents1">
                                            <div className='names'>
                                                <div className='fnames'>
                                                    <label>Exam Name</label>
                                                    <select
                                                        name="type"
                                                        className="dept"
                                                        value={reference_id}
                                                        onChange={(e) => setReference(e.target.value)}
                                                        required>
                                                        {referenceData &&
                                                            referenceData.map((rData) => (
                                                                <option key={rData.id} value={rData.id}>
                                                                    {rData.title}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className='fnames'>
                                                    <label>Topic</label>
                                                    <select
                                                        name="type"
                                                        className="dept"
                                                        value={reference_id}
                                                        onChange={(e) => setReference(e.target.value)}
                                                        required>
                                                        {referenceData &&
                                                            referenceData.map((rData) => (
                                                                <option key={rData.id} value={rData.id}>
                                                                    {rData.title}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className='fnames'>
                                                    <label>Reference</label>
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
                                        </div>


                                    </div>

                                </div>


                            </Wrapper>
                        </section>
                    </div>
                )}
                
                <div className="button-container">
                    <button
                        className="previous-button"
                        onClick={handlePreviousStep}
                        disabled={currentStep === 1}
                    > <ArrowLeftIcon  />
                        Previous
                       
                    </button>
                    <button
                        className="next-button"
                        onClick={handleNextStep}
                        disabled={currentStep === 3}
                    >
                        Next
                        <ArrowRightIcon  />
                       
                    </button></div>
            </div>
        </div >
    );

}
function StepLine({ currentStep, onStepClick }) {

    return (
        <div className="step-line">
            <div className={currentStep === 1 ? 'step active' : 'step'} onClick={() => onStepClick(1)}>
                Question Text
            </div>
            <div className={currentStep === 2 ? 'step active' : 'step'} onClick={() => onStepClick(2)}>
                Choice/options
            </div>
            <div className={currentStep === 3 ? 'step active' : 'step'} onClick={() => onStepClick(3)}>
                correct answer with description
            </div>
            <div className={currentStep === 4 ? 'step active' : 'step'} onClick={() => onStepClick(4)}>
                Tags
            </div>
            <div className="line" style={{ width: `${(currentStep - 1) * 33.33}%` }}>
            </div>
        </div>
    );
}
function GlobalSaveButton() {
    return (
        <button className="button-outline">
            Save
        </button>
    );
}
function MyButton() {
    return (
        <button className="my-button">
            <span>Submit</span>
            <NavigateNextIcon />
        </button>
    );
}
//three steps
//1 question page
//2 answer page
//3 category