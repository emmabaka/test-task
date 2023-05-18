import PropTypes from "prop-types";
import coverPhoto from "../../assets/pexels-alexandr-podvalny-1227513.jpeg";
import styles from "./UserCard.module.scss";

const UserCard = ({ user: { photo, position, name, email, phone } }) => {
  function sliceSentence(sentence) {
    if (sentence.length <= 25) {
      return sentence;
    } else {
      return sentence.slice(0, 25) + "...";
    }
  }

  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.userImg}
        src={photo}
        alt="photo"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = { coverPhoto };
        }}
      />
      <p className={styles.userName} title={name}>
        {sliceSentence(name)}
      </p>
      <p className={styles.userPosition}>{position}</p>
      <p className={styles.userEmail} title={email}>
        {sliceSentence(email)}
      </p>
      <p className={styles.userPhone}>{phone}</p>
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
