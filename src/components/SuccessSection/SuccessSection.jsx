import success from "../../assets/success-image.png";
import styles from "./SuccessSection.module.scss";

const SuccessSection = () => {
  return (
    <div>
      <h2 className="title">User successfully registered</h2>
      <img className={styles.successImg} src={success} alt="success" />
    </div>
  );
};
export default SuccessSection;
