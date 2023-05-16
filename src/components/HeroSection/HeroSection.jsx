import Button from "../Button/Button";
import "./HeroSection.scss";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-wrapper">
          <h1 className="hero-title">
            Test assignment for front-end developer
          </h1>
          <p className="hero-text">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they`ll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button width={120} id="#sign-up">
            Sign up
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
