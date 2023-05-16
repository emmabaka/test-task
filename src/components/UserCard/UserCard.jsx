import PropTypes from "prop-types";
import "./UserCard.scss";

const UserCard = ({ user: { photo, position, name, email, phone } }) => {
  return (
    <div className="card-container">
      <img className="user-img" src={photo} alt="photo" />
      <p className="user-name">{name}</p>
      <p className="user-position">{position}</p>
      <p className="user-email">{email}</p>
      <p className="user-phone">{phone}</p>
    </div>
  );
};
export default UserCard;

UserCard.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};
