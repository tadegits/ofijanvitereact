import React, {useEffect, useState} from 'react'
import Wrapper from '../../../components/wrapper/Wrapper';

const Document = () => {
    const [document, setDocument] = useState('');
    const [documentMess, setDocumentMess] = useState('');
    const [user_id, setUser_id] = useState('');
    const [valueDocs, setValueDocs] = useState('');
    const [documentType, setTypeDocument] = useState(null);

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

    const getDocs = (event) => {
        const documents = event.target.files[0];
        const documentsval = event.target.value;
        const documentstype = event.target.files[0];
        setDocument(documents);
        setValueDocs(documentsval);
        // console.log(resumetype);
        if (documentstype.type === 'application/pdf') {
            setTypeDocument(documentstype.type);
            setDocumentMess("");
        }

        else {
            setDocumentMess("Upload only pdf format");
        }
    };

    async function uploadResume() {
        // let files = { resume, user_id }
        const formData = new FormData();
        formData.append("file", document);
        formData.append("user", user_id);
        if (valueDocs === "") {
            setResumeMess("Please select file to upload");
        }
        else if (document.size > 2 * 1024 * 1024) {
            setResumeMess("file size must be less or equal to 2MB");
            // console.log("file size must be less or equal to 2MB");
        }
        else if(resumeType !== "application/pdf"){
            setResumeMess("Upload only pdf format");
        }
        else {
            console.log(resume.size / (1024 * 1024));
            console.log(files);
        }

    }
    return (
        <div className="topic">
            <section className="login">
                <Wrapper>
                    <h3 className='exp'>Upload your documents here</h3>
                    <div className="login__container">
                        <div className="form2">
                            <div className="form-contents1">
                                <div className="fnames">
                                    <label>Upload your document</label>
                                    <input type="file" placeholder='select your resume' className="fname" onChange={getDocs} required />
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

export default Document