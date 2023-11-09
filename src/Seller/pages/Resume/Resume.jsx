import React, { useState, useEffect } from 'react'
import Wrapper from '../../../components/wrapper/Wrapper'
import axios from 'axios';

const Resume = () => {

    const [resume, setResume] = useState(null);
    const [resumeMess, setResumeMess] = useState('');
    const [user_id, setUser_id] = useState('');
    const [valueRusume, setValueResume] = useState('');
    const [resumeType, setTypeResume] = useState(null);

    useEffect(() => {
        const users = localStorage.getItem('user');
        const userinfo = JSON.parse(users);
        setUser_id(userinfo.user.id);
    }
    );

    // function getResume(e){
    //     const resumes = e.target.files[0];
    //     setResume(resumes)
    // }

    const getResume = (event) => {
        const resumes = event.target.files[0];
        const resumesval = event.target.value;
        const resumetype = event.target.files[0];
        // const filePath = URL.createObjectURL(resumetype);
        // console.log("path",filePath);
        setResume(resumes);
        setValueResume(resumesval);
        console.log(resumetype);
        if (resumetype.type === 'application/pdf') {
            setTypeResume(resumetype.type);
            setResumeMess("");
        }

        else {
            setResumeMess("Upload only pdf format");
        }
    };

    async function uploadResume() {
        // const names = resume.name;
        let files = { resume, user_id }
        if (valueRusume === "") {
            setResumeMess("Please select file to upload");
        }
        else if (resume.size > 2 * 1024 * 1024) {
            setResumeMess("file size must be less or equal to 2MB");
            // console.log("file size must be less or equal to 2MB");
        }
        else if(resumeType !== "application/pdf"){
            setResumeMess("Upload only pdf format");
        }
        else {
            // console.log(resume)
            const formData = new FormData();
            formData.append('file', resume);
            formData.append('user',  user_id);
            // console.log(formData);

            axios.post('http://127.0.0.1:8000/api/add_resume', formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                // console.log(response.data.message);
                setResumeMess(response.data.message);
                // console.log('R uploaded successfully');
              })
              .catch(error => {
                // console.error('Error uploading file', error);
                setResumeMess("Error uploading your resume");
              });
            // result = await result.json();
            // console.log("Returned result is ", result);
            // console.log(resume.size / (1024 * 1024));
            // console.log(files);
        }

    }
    return (
        <div className="topic">
            <section className="login">
                <Wrapper>
                    <h3 className='exp'>Upload your resume here</h3>
                    <div className="login__container">
                        <div className="form2">
                            <div className="form-contents1">
                                <div className="fnames">
                                    <label>Upload your resume</label>
                                    <input type="file" placeholder='select your resume' className="fname" onChange={getResume} required />
                                    <div className="errormessage">{resumeMess}</div>
                                </div>

                                {/* <div className="errormessage">{registered}</div> */}
                                <div className="summit-signup">
                                    <button className='sigbtn' onClick={uploadResume} >Save</button>
                                    {/* <input type="submit" value="Log In" className="sigbtn"/> */}
                                </div>

                            </div>
                        </div>
                    </div>

                </Wrapper>
            </section>
        </div>
    )
}

export default Resume