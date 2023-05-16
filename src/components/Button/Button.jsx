import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ children, width, id }) => {
  return (
    <a className="button" style={{ width: width }} href={id}>
      {children}
    </a>
  );
};
export default Button;

Button.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  id: PropTypes.string,
};
