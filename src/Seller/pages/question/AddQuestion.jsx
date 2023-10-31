
import { Editor } from '@tinymce/tinymce-react';
import useLoggedInUser from '../../../Globals/useLoggedInUser'
import "./question.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
export default function AddQuestion() {
    const { deptId, userId } = useLoggedInUser();
    const [reference_id, setReference] = useState(1);
    const [referenceData, setReferenceData] = useState('');
    const [topicData, setTopicData] = useState('');
    const [rcUri, setReferenceUri] = useState();
    const [topicUri, setTopicUri] = useState();
    const [question_text, setQuestionText] = useState();
    const [option1, setOption1] = useState();
    const [option2, setOption2] = useState();
    const [option3, setOption3] = useState();
    const [option4, setOption4] = useState();
    const [correctOption, setCorrectOption] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            question_text: question_text,
            // option: options.map((option) => option.text),
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            correct: correctOption,
        };
        console.log(data);
        axios.post('http://127.0.0.1:8000/api/questions', data)
            .then(response => {
                console.log(response.data);
                // handle success
            })
            .catch(error => {
                console.log(error);
                // handle error
            });
    };
    const handleCorrectOptionChange = (event) => {
        setCorrectOption(event.target.value);
    };
    const state = useLocation();
    if (state.state !== null) {
        console.log(state.state);
    }
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {
    //         const userDept = JSON.parse(loggedInUser);
    //         setDeptId(parseInt(userDept.user.dept_id));
    //         const users = JSON.parse(loggedInUser);
    //         setUserID(users.user.id);
    //     }
    // }, [user_id]);
    useEffect(() => {
        setReferenceUri(`http://127.0.0.1:8000/api/all_references/${userId}`);
        console.log('rcuri', rcUri);
        axios.get(rcUri)
            .then(response => {
                setReferenceData(response.data.references);
                // console.log('reference', referenceData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [rcUri]);

    useEffect(() => {
        setTopicUri(`http://127.0.0.1:8000/api/all_topics/${userId}`);
        console.log("topicUri", topicUri);
        axios.get(topicUri)
            .then(response => {
                setTopicData(response.data.topics);
                // console.log('reference', referenceData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [topicUri]);
    
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
    const handleEditorChange = (content, editor) => {
        setQuestionText(content);
    };

    // selectedExam
    return (
        <div className="question">
            <div className='gon_le_gon'>
                <h4>Add Question </h4>
                <p>You have added 5 Questions so far!</p>
                <button className="my-button" onClick={handleSubmit}>
                    <span>Submit</span>
                    <NavigateNextIcon />
                </button>

            </div>
            <div className='step_holder'>
                <StepLine currentStep={currentStep} onStepClick={handleStepClick} />
                {currentStep === 1 && (
                    <div className='step1_question'>

                        <label>Question:</label>
                        <Editor
                            value={question_text}
                            onEditorChange={handleEditorChange}
                            onChange={(e) => setQuestionText(e.target.value)}
                            apiKey='no1p57zpyjhhqjd9l5i03o52suh9n0vbklw8njdgdoramilj'
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
                        <div className="errormessage" onClick={handleSubmit}><p>Editor Value: {question_text}</p>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className='choice'>


                        {/* {options.map((option) => (
                            <div key={option.id}>
                                <label htmlFor={`option${option.id}`}>Option {option.id}</label>
                                <div class="textarea-wrapper">
                                    <textarea
                                        id={`option_${option.id}`}
                                        name={`option_${option.id}`}
                                        value={option.text}
                                        placeholder="Enter your text here"
                                        onChange={(event) => handleOptionChange(option.id, event.target.value)}
                                        required

                                    ></textarea>
                                    <input type="radio" id="radio-button" name="radio-button" />

                                </div>
                            </div>
                        ))} */}
                        <div className='gon-le-gon'>
                            <label>Choice 4</label>
                            <div class="textarea-wrapper">
                                <textarea
                                    id={`option1`}
                                    name={`option1`}
                                    value={option1}
                                    placeholder="Enter your text here"
                                    onChange={(e) => setOption1(e.target.value)}
                                    required>
                                </textarea>
                                <input type="radio" id="radio-button" name="radio-button" />
                            </div>
                        </div>
                        <div className='gon-le-gon'>
                            <label>Choice 4</label>
                            <div class="textarea-wrapper">
                                <textarea
                                    id={`option2`}
                                    name={`option2`}
                                    value={option2}
                                    placeholder="Enter your text here"
                                    onChange={(e) => setOption2(e.target.value)}
                                    required>
                                </textarea>
                                <input type="radio" id="radio-button" name="radio-button" />
                            </div>
                        </div>
                        <div className='gon-le-gon'>
                            <label>Choice 4</label>
                            <div class="textarea-wrapper">
                                <textarea
                                    id={`option3`}
                                    name={`option3`}
                                    value={option3}
                                    placeholder="Enter your text here"
                                    onChange={(e) => setOption3(e.target.value)}
                                    required>
                                </textarea>
                                <input type="radio" id="radio-button" name="radio-button" />
                            </div>
                        </div>
                        <div className='gon-le-gon'>
                            <label>Choice 4</label>
                            <div class="textarea-wrapper">
                                <textarea
                                    id={`option4`}
                                    name={`option4`}
                                    value={option4}
                                    placeholder="Enter your text here"
                                    onChange={(e) => setOption4(e.target.value)}
                                    required>
                                </textarea>
                                <input type="radio" id="radio-button" name="radio-button" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="correct">Correct Option</label>
                            <select
                                id="correct"
                                name="correct"
                                value={correctOption}
                                onChange={handleCorrectOptionChange}
                                required
                            >
                                <option value="">-- Select Correct Option --</option>
                                {options.map((option) => (
                                    <option key={option.id} value={`option${option.id}`}>
                                        Option {option.id}
                                    </option>
                                ))}
                            </select>
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
                                                    <label>Topic</label>
                                                    <select
                                                        name="type"
                                                        className="dept"
                                                        value={reference_id}
                                                        onChange={(e) => setReference(e.target.value)}
                                                        required>
                                                        {topicData &&
                                                            topicData.map((tData) => (
                                                                <option key={tData.id} value={tData.id}>
                                                                    {tData.title}
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
                    > <ArrowLeftIcon />
                        Previous

                    </button>
                    <button
                        className="next-button"
                        onClick={handleNextStep}
                        disabled={currentStep === 4}
                    >
                        Next
                        <ArrowRightIcon />

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
        <button className="my-button" onClick={handleSubmit}>
            <span>Submit</span>
            <NavigateNextIcon />
        </button>
    );
}
//three steps
//1 question page
//2 answer page
//3 category