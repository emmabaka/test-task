import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ children, width = 100, id = "#sign-up" }) => {
  return (
    <a className={styles.button} style={{ width: width }} href={id}>
      {children}
    </a>
  );
};
export default Button;

Button.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  id: PropTypes.string,
};
