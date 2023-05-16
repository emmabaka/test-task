import { useState } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import SuccessSection from "../SuccessSection/SuccessSection";
import "./SignUpSection.scss";

const SignUpSection = () => {
  const [status, setStatus] = useState("");

  return (
    <section className="sign-up" id="sign-up">
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
