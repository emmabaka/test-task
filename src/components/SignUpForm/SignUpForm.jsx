import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { ThreeDots } from "react-loader-spinner";
import fetchData from "../../api/fetchData";
import postUser from "../../api/postUser";
import styles from "./SignUpForm.module.scss";

const SignUpForm = ({ setStatus }) => {
  const [errorText, setErrorText] = useState("");
  const [token, setToken] = useState("");
  const [positions, setPosition] = useState([]);
  const [load, setLoad] = useState(false);

  const formElement = useRef();

  useEffect(() => {
    fetchData("positions").then((res) => setPosition(res.data.positions));
    fetchData("token").then((res) => setToken(res.data.token));
  }, []);

  const { values, errors, touched, handleChange, setFieldValue, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        photo: "",
        positionId: "",
      },
      validateOnBlur: true,
      validationSchema: Yup.object({
        name: Yup.string()
          .min(2, "Must be more than 2 characters")
          .max(60, "Must be 60 characters or less")
          .required("Required"),
        phone: Yup.string()
          .matches(/^\+380\d{9}$/, "Invalid phone number")
          .required("Required"),
        email: Yup.string()
          .min(2, "Must be more than 2 characters")
          .email("Invalid email address")
          .max(100, "Must be 100 characters or less")
          .required("Required"),
      }),
    });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    const formData = new FormData(formElement.current);

    postUser(formData, token)
      .then((res) => {
        setStatus(res.status);
      })
      .catch((err) => {
        console.log(err);
        setStatus("");
      })
      .finally(() => setLoad(false));
  };

  const validatePhoto = (e) => {
    const file = e.target.files[0];

    if (file.width < 70 || file.height < 70) {
      setErrorText("The photo must be at least 70x70 pixels in size.");
      e.target.value = "";
      return;
    }
    if (!file.type.match("image/jpeg")) {
      setErrorText("The photo must be in JPEG/JPG format.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorText("Photos should be less than 5 MB in size.");
      e.target.value = "";
      return;
    } else {
      handleChange(e);
      setErrorText("");
    }
  };

  const isFormValid =
    values.name.trim() !== "" &&
    values.email.trim() !== "" &&
    values.phone.trim() !== "" &&
    values.photo.trim() !== "" &&
    values.positionId !== "";

  return (
    <form ref={formElement} className={styles.signUpForm} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <input
          className={
            errors.name && touched.name
              ? `${styles.input} ${styles.errorInput}`
              : styles.input
          }
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          maxLength={60}
          placeholder=" "
        />
        <label className={styles.label} htmlFor="name">
          Your name
        </label>
        {errors.name && touched.name && (
          <p className={styles.error}>{errors.name}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={
            errors.phone && touched.phone
              ? `${styles.input} ${styles.errorInput}`
              : styles.input
          }
          type="text"
          id="phone"
          name="phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phone}
          maxLength={13}
          placeholder=" "
        />
        <label className={styles.label} htmlFor="phone">
          Phone
        </label>
        {errors.phone && touched.phone ? (
          <p className={styles.error}>{errors.phone}</p>
        ) : (
          <p className={styles.helper}>+38 (XXX) XXX - XX - XX</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={
            errors.email && touched.email
              ? `${styles.input} ${styles.errorInput}`
              : styles.input
          }
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder=" "
        />
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        {errors.email && touched.email && (
          <p className={styles.error}>{errors.email}</p>
        )}
      </div>
      <div className={styles.radioContainer}>
        <p className={styles.radioTitle}>Select your position</p>
        {positions.map((item, i) => {
          return (
            <div key={i} className={styles.radioWrapper}>
              <input
                type="radio"
                id={item.id}
                name="position_id"
                value={item.id}
                onChange={(e) => setFieldValue("positionId", e.target.value)}
              />
              <label htmlFor={item.id}> {item.name}</label>
            </div>
          );
        })}
      </div>
      <div className={styles.upload}>
        <div className={styles.uploadContainer}>
          <label
            className={
              errorText
                ? `${styles.uploadLabel} ${styles.errorInput}`
                : styles.uploadLabel
            }
            htmlFor="photo"
          >
            Upload
          </label>
          <div
            className={
              errorText
                ? `${styles.inputUploadContainer} ${styles.errorInput}`
                : styles.inputUploadContainer
            }
          >
            <input
              className={
                values.photo === ""
                  ? styles.uploadInputEmpty
                  : styles.uploadInput
              }
              type="file"
              name="photo"
              id="photo"
              onChange={validatePhoto}
              value={values.photo}
            />
          </div>
        </div>
        <p className={styles.error}>{errorText}</p>
      </div>
      <div className={styles.spinnerWrapper}>
        {load ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#f4e041"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <button
            className={isFormValid ? styles.submitButton : styles.disabled}
            type="submit"
            disabled={!isFormValid}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};
export default SignUpForm;

SignUpForm.propTypes = {
  setStatus: PropTypes.func.isRequired,
};
