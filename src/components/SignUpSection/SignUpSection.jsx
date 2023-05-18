import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SignUpForm from "../SignUpForm/SignUpForm";
import SuccessSection from "../SuccessSection/SuccessSection";
import fetchUsers from "../../api/fetchUsers";
import { normalizeData } from "../../helpers/normalizeData";
import styles from "./SignUpSection.module.scss";

const SignUpSection = ({ setUsers }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status === 201) {
      getUpdatedUsers();
    }
    setTimeout(() => setStatus(""), 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const getUpdatedUsers = () => {
    const data = fetchUsers();
    return data
      .then((res) => {
        const data = normalizeData(res);
        setUsers([...data.normalized]);
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className={styles.signUp} id="sign-up">
      <div className="container">
        <h2 className="title">Working with POST request</h2>

        {status === 201 ? (
          <SuccessSection />
        ) : (
          <SignUpForm setStatus={setStatus} />
        )}
      </div>
    </section>
  );
};

export default SignUpSection;

SignUpSection.propTypes = {
  setUsers: PropTypes.func.isRequired,
};
