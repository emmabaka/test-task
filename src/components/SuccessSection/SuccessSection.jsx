import success from "../../assets/success-image.png";
import "./SuccessSection.scss";

const SuccessSection = () => {
  return (
    <div>
      <h2 className="title">User successfully registered</h2>
      <img className="success-img" src={success} alt="success" />
    </div>
  );
};
export default SuccessSection;
