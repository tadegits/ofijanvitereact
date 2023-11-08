import React, { useState, useEffect } from 'react'
import Wrapper from '../../../components/wrapper/Wrapper'

const Resume = () => {

    const [resume, setResume] = useState('');
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
        const filePath = URL.createObjectURL(resumetype);
        console.log("path",filePath);
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
            result = await fetch('http://127.0.0.1:8000/api/add_resume', {
                method: "POST",
                body: JSON.stringify(files),
                headers:{
                    "Content type":"application/json",
                    "Accept":"application/json"
                }
            });
            
            console.log(resume.size / (1024 * 1024));
            console.log(files);
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