import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo.png";
import Button from "../Button/Button";
import styles from "./Header.module.scss";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 360 });

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <img src={logo} alt="logo" width={104} height={26} />
        {isMobile ? (
          <div className={styles.buttonsWrapper}>
            <Button id="#users" width={75}>
              Users
            </Button>
            <Button width={75}>Sign up</Button>
          </div>
        ) : (
          <div className={styles.buttonsWrapper}>
            <Button id="#users">Users</Button>
            <Button>Sign up</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
