import logo from "../../assets/logo.png";
import Button from "../Button/Button";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <img src={logo} alt="logo" width={104} height={26} />
        <div className="buttons-wrapper">
          <Button width={100} id="#users">
            Users
          </Button>
          <Button width={100} id="#sign-up">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
