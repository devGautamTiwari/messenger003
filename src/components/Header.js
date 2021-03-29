import React, { useContext, useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import "../assets/css/Header.css";
import { Link } from "react-router-dom";
const Header = (props) => {
  const [, , , [loading]] = useContext(UserProfileContext);
  const [welcomeText, setWelcomeText] = useState(
    `Welcome, ${props.displayName}`
  );
  setTimeout(() => setWelcomeText("Messenger003"), 60000);

  return (
    <div className="header__header">
      <header className="header__welcome">
        <h2>{welcomeText}</h2>
      </header>
      <Link
        className="header__signout__link"
        onClick={() => {
          auth.signOut();
        }}
        to="/signin"
        disabled={loading}
      >
        {/* <button className="header__signout__btn"> */}
        <span className="header__signout__icon">
          <ExitToAppIcon />
        </span>
        <span className="header__signout__text">Sign out</span>
        {/* </button> */}
      </Link>
    </div>
  );
};

export default Header;
