import Button from "../Button/Button";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContainer} container`}>
        <div className={styles.heroWrapper}>
          <h1 className={styles.heroTitle}>
            Test assignment for front-end developer
          </h1>
          <p className={styles.heroText}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they`ll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button width={120}>Sign up</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
