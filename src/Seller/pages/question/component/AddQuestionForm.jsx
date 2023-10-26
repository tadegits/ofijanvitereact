import React, { useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import LastStep from "./LastStep";
import '../question.scss'
import MultiStepProgressBar from "./MultiStepProgressBar";
import { Row, Col } from "react-bootstrap";
const UserForm = () => {
  //For manageing state of multi steps Form
  const [page, setPage] = useState(0);

  const [userInput, setUserInput] = useState({
    fullName: "",
    displayname: "",
    workspaceName: "",
    workspaceUrl: "",
    checkboxValue: ""
  });

  //proceed to next step
  const nextStep = () => {
    setPage((currPage) => currPage + 1);
  };

  const pageTitles = [
    "Welcome! Let us new question.",
    "This will raise the quality of the question you add",
    "Keep progressing on ofijan!"
  ];
  const pageSubTitiles = [
    "You can always change them later.",
    "You can always change the topic and reference later",
    "We'll streamline your setup expereince accordingly.",
    "You can save the question know"
  ];

  const PageDisplay = () => {
    if (page === 0)
      return <FirstStep nextStep={nextStep} handleChange={handleChange} />;
    else if (page === 1)
      return <SecondStep nextStep={nextStep} handleChange={handleChange} />;
    else if (page === 2)
      return <ThirdStep nextStep={nextStep} handleChange={handleChange} />;
    else return <LastStep nextStep={nextStep} handleChange={handleChange} />;
  };

  //handle field changes
  const handleChange = (input) => (e) => {
    setUserInput({ ...userInput, [input]: e.target.value });
  };

  return (
    <div className="question">
      <div style={{ margin: "auto", width: "50%" }}>
        <MultiStepProgressBar step={page} />
      </div>

      <div className="question">
        <div className="userForm-container-header">
          <h4>
            {page === pageTitles.length
              ? `Congratulations, ` + userInput.displayname
              : pageTitles[page]}
          </h4>
          <p><b>{pageSubTitiles[page]}</b></p>
        </div>
        <div className="userForm-container-body">{PageDisplay()}</div>
        <div className="userForm-container-footer">
          <button
            onClick={() => {
              if (page === pageSubTitiles.length - 1) {
                console.log(userInput);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === pageSubTitiles.length - 1
              ? "Start Adding Question"
              : "Continue.."}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
