import React, {useState, useEffect} from 'react'
import Wrapper from '../../../components/wrapper/Wrapper'

const Resume = () => {

    const [resume, setResume] = useState('');
    const [user_id, setUser_id] = useState('');

    useEffect(() =>{
        const users = localStorage.getItem('user');
        const userinfo = JSON.parse(users);
        setUser_id(userinfo.user.id);
    }
    );

    async function uploadResume() {
        let files = {resume, user_id}
        console.log(files);
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
                                    <input type="file" placeholder='select your resume' className="fname" required />
                                    {/* <div className="errormessage">{jop_titleMess}</div> */}
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