import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import fetchPositions from "../../api/fetchPositions";
import fetchToken from "../../api/fetchToken";
import axios from "axios";
import "./SignUpForm.scss";

const SignUpForm = ({ setStatus }) => {
  const [errorText, setErrorText] = useState("");
  const [positionId, setPositionId] = useState("");
  const [token, setToken] = useState("");
  const [positions, setPosition] = useState([]);

  const formElement = useRef();

  useEffect(() => {
    fetchPositions().then((res) => setPosition(res.data.positions));
    fetchToken().then((res) => setToken(res.data.token));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      photo: "",
    },
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

    const formData = new FormData(formElement.current);

    axios
      .post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        formData,
        {
          headers: {
            Token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setStatus(res.status);
      })
      .catch((err) => {
        console.log(err);
        setStatus("");
      });
  };

  const validatePhoto = (e) => {
    const file = e.target.files[0];

    if (file.width < 70 || file.height < 70) {
      setErrorText("Розмір фотографії повинен бути не менше 70x70 пікселів.");
      e.target.value = "";
      return;
    }
    if (!file.type.match("image/jpeg")) {
      setErrorText("Фотографія повинна бути у форматі JPEG/JPG.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorText("Розмір фотографії не повинен перевищувати 5 МБ.");
      e.target.value = "";
      return;
    } else {
      formik.handleChange(e);
      setErrorText("");
    }
  };

  const isFormValid =
    formik.values.name.trim() !== "" &&
    formik.values.email.trim() !== "" &&
    formik.values.phone.trim() !== "" &&
    formik.values.photo.trim() !== "" &&
    positionId !== "";

  return (
    <form ref={formElement} className="sign-up-form" onSubmit={onSubmit}>
      <div className="input-container">
        <input
          className={formik.errors.name ? " input error-input" : "input"}
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder=" "
        />
        <label className="label" htmlFor="name">
          Your name
        </label>
        {formik.errors.name && <p className="error">{formik.errors.name}</p>}
      </div>

      <div className="input-container">
        <input
          className={formik.errors.phone ? " input error-input" : "input"}
          type="text"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          placeholder=" "
        />
        <label className="label" htmlFor="phone">
          Phone
        </label>
        {formik.errors.phone ? (
          <p className="error">{formik.errors.phone}</p>
        ) : (
          <p className="helper">+38 (XXX) XXX - XX - XX</p>
        )}
      </div>

      <div className="input-container">
        <input
          className={formik.errors.email ? " input error-input" : "input"}
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder=" "
        />
        <label className="label" htmlFor="email">
          Email
        </label>
        {formik.errors.email && <p className="error">{formik.errors.email}</p>}
      </div>
      <div className="radio-container">
        <p className="radio-title">Select your position</p>
        {positions.map((item, i) => {
          return (
            <div key={i} className="radio-wrapper">
              <input
                type="radio"
                id={item.id}
                name="position_id"
                value={item.id}
                onChange={(e) => setPositionId(e.target.value)}
              />
              <label htmlFor={item.id}> {item.name}</label>
            </div>
          );
        })}
      </div>
     <div className="upload"> <div className="upload-container">
        <label
          className={errorText ? "upload-label error-input" : "upload-label"}
          htmlFor="photo"
        >
          Upload
        </label>
        <div
          className={
            errorText
              ? "input-upload-container error-input"
              : "input-upload-container"
          }
        >
          <input
            className="upload-input "
            type="file"
            name="photo"
            id="photo"
            onChange={(e) => validatePhoto(e)}
            value={formik.values.photo}
          />
        </div>
      </div>
      <p className="error">{errorText}</p></div>

      <button
        className={isFormValid ? "submit-button" : "disabled"}
        type="submit"
        disabled={!isFormValid}
      >
        Submit
      </button>
    </form>
  );
};
export default SignUpForm;

SignUpForm.propTypes = {
  setStatus: PropTypes.func.isRequired,
};
