import React from "react";

const SecondStep = (props) => {
  return (
    <div className="form">
      <label>Exam Name</label>
      <input
        type="text"
        name="workspaceName"
        placeholder="Critical Thinking Model Exit Exam"
        onChange={props.handleChange("workspaceName")}
      />

      <label>
        Add Question Here
      </label>
      <input
        type="text"
        name="workspaceUrl"
        placeholder="Which pilar of medemer qouted how to build multinational state!"
        onChange={props.handleChange("workspaceUrl")}
      />
    </div>
  );
};
export default SecondStep;