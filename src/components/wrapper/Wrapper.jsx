import "./Wrapper.scss";

const Wrapper = ({ className, children}) => {
  return <div className={`wrapper $ {className || ""}`}></div>
};

export default Wrapper