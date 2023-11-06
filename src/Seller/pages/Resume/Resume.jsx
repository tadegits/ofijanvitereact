import React, {useState} from 'react'
import Wrapper from '../../../components/wrapper/Wrapper'

const Resume = () => {

    const [resume, setResume] = useState('');

    async function uploadResume() {

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