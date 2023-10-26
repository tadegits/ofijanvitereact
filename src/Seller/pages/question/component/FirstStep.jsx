import React from "react";

const FirstStep = (props) => {
  return (
    <div className="form">
      <label>Can you please specify the relevant topic for this question?</label>
      <input
        type="text"
        name="fullname"
        placeholder="The pillarss of medemer"
        onChange={props.handleChange("fullName")}
      />

      <label>Could you kindly recommend a reference from your references gallery?</label>
      <input
        type="text"
        name="displayName"
        placeholder="A Book by Dr.Abiy Ahmed"
        onChange={props.handleChange("displayname")}
      />
    </div>
  );
};
export default FirstStep;