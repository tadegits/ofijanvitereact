// import './SingUp.scss';
import Wrapper from '../../../components/wrapper/Wrapper';
import Img2 from '../../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import validator from 'validator';
import Swal from 'sweetalert2';

const Experience = () => {

    const navigate = useNavigate();
    const [jop_title, setJopTitle] = useState("");
    const [jop_titleMess, setJopMessage] = useState("");
    const [company_name, setCompanyName] = useState("");
    const [companyMess, setCompanyMessage] = useState("");
    const [employement_type, setEmploye_type] = useState("");
    const [employMess, setEmployMessage] = useState("");
    const [achievement, setAchievement] = useState("");
    const [achieveMess, setAchieveMessage] = useState("");
    const [location, setLocation] = useState("");
    const [locationMess, setlocationMessage] = useState("");
    const [start_date, setStartDate] = useState("");
    const [startMess, setStartMessage] = useState("");
    const [end_date, setEndDate] = useState("");
    const [endMess, setEndMessage] = useState("");

    let newEmail, newFname, newLname, newPhname, newDept, newPname, newCPname;

    function checkName(event) {
        // console.log(event.target.value);
        newFname = event.target.value;
        setJopTitle(newFname);

        if (newFname === "") {
            setJopMessage("Jop title is required")
        }
        else {
            setJopMessage("")
        }
    }

    function checkLname(event) {
        // console.log(event.target.value);
        newLname = event.target.value;
        setCompanyName(newLname);

        if (newLname === "") {
            setCompanyMessage("Company name is required")
        }
        else {
            setCompanyMessage("")
        }
    }

    function checkEmail(event) {
        newEmail = event.target.value;
        setEmploye_type(newEmail);

        if (newEmail === "") {
            setEmployMessage("Employement type is required")
        }
        else {
            setEmployMessage("")
        }
    }

    function checkStart(event) {
        // console.log(event.target.value);
        newPhname = event.target.value;
        setStartDate(newPhname);

        if (newPhname === "") {
            setStartMessage("Please select your employement date")
        }
        else {
            setStartMessage("")
        }
    }

    function checkEnd(event) {
        // console.log(event.target.value);
        newPhname = event.target.value;
        setEndDate(newPhname);

        if (newPhname === "") {
            setEndMessage("Please select end date of your employement")
        }
        else {
            setEndMessage("")
        }
    }

    function checkLocation(event) {
        // console.log(event.target.value);
        newPhname = event.target.value;
        setLocation(newPhname);

        if (newPhname === "") {
            setlocationMessage("Location is required")
        }
        else {
            setlocationMessage("")
        }
    }

    async function signUp() {
        // let info = { fname, lname, email, phone, dept, password, confpassword };
        let crinfo = { jop_title, company_name, employement_type, achievement, start_date, end_date, location };
        // console.warn(info);
        // console.warn(crinfo);
        if (jop_title === "") {
            setJopMessage("Jop title required");
        }
        else if (company_name === "") {
            setCompanyMessage("Company name required");
        }
        else if (employement_type === "") {
            setEmployMessage("Employement type required");
        }
        else if (start_date === "") {
            setStartMessage("Please select your employement date");
        }
        else if (end_date === "") {
            setEndMessage("Please select your end date of employement");
        }
        else if (location === "") {
            setlocationMessage("Location is required");
        }
        else {
            console.log(crinfo);
            // let result = await fetch("http://127.0.0.1:8000/api/registeruser", {
            //     method: "POST",
            //     body: JSON.stringify(crinfo),
            //     headers: {
            //         "Content-Type": 'application/json',
            //         "Accept": 'application/json'
            //     }
            // })

            // result = await result.json()
            // // console.log(result);
            // if (result) {
            //     let respresult = result.message;
            //     let status = result.status;

            //     // console.log(respresult);
            //     // Swal.fire({
            //     //     text:respresult,
            //     //     icon:status
            //     // })
            //     if (status === "success") {
            //         navigate("/Login", { state: { registered: { respresult } } })
            //     }
            //     else {
            //         setMessage(respresult)
            //         setRegistered("User not registered");
            //         // navigate("/signup");
            //     }
            //     // console.warn(registered);
            //     // console.log(result.message)
            //     // console.warn("result:", result.message)

            // }
            // else {
            //     setRegistered[checkuser];
            // }
        }
    }

    return (
        <div className="topic">
            <h3>Add Your Work Experience</h3>
            <section className="login">
                <Wrapper>
                    <div className="login__container">
                        <div className="form2">
                            <div className="form-contents1">
                                <div className="names">
                                    <div className="fnames">
                                        <label>Jop Title</label>
                                        <input type="text" placeholder='jop title' className="fname" onBlur={checkName} required />
                                        <div className="errormessage">{jop_titleMess}</div>
                                    </div>
                                    <div className="lnames">
                                        <label>Company Name</label>
                                        <input type="text" placeholder='company name' className="lname" onBlur={checkLname} required />
                                        <div className="errormessage">{companyMess}</div>
                                    </div>

                                </div>
                                <div className="dept_pho">
                                    <div className="emails">
                                        <label>Employement Type</label>
                                        <input type="text" placeholder='employement type' className="email" onBlur={checkEmail} required />
                                        <div className="errormessage">{employMess}</div>
                                    </div>
                                    <div className="phones">
                                        <label>Achievement <small>(Optional)</small></label>
                                        <input type="tel" placeholder='achievement' className="phone" />
                                        <div className="errormessage">{achieveMess}</div>
                                    </div>
                                </div>

                                <div className="dept_pho">
                                    <div className="emails">
                                        <label>Start Date</label>
                                        <input type="date" placeholder='start date' className="email" onBlur={checkStart} required />
                                        <div className="errormessage">{startMess}</div>
                                    </div>
                                    <div className="phones">
                                        <label>End Date</label>
                                        <input type="date" placeholder='end date' className="phone" onBlur={checkEnd} required />
                                        <div className="errormessage">{endMess}</div>
                                    </div>
                                </div>

                                <div className="dept_pho">
                                    <div className="emails">
                                        <label>Location</label>
                                        <input type="text" placeholder='location' className="email" onBlur={checkLocation} required />
                                        <div className="errormessage">{locationMess}</div>
                                    </div>
                                </div>

                                {/* <div className="errormessage">{registered}</div> */}
                                <div className="summit-signup">
                                    <button className='sigbtn' onClick={signUp} >Sing Up</button>
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

export default Experience