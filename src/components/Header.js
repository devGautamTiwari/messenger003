import React, { useContext, useState } from "react";
import { IconButton, Link } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import "../assets/css/Header.css";
const Header = () => {
  const [, , [user], [loading]] = useContext(UserProfileContext);
  const displayName = user ? " " + user.displayName : "";
  const [welcomeText, setWelcomeText] = useState(`Welcome${displayName}!`);
  setTimeout(() => setWelcomeText("Messenger003"), 60000);

  return (
    <div className="header__header">
      <div className="header__welcome">
        <h2
          style={{
            marginLeft: "18px",
          }}
        >
          {welcomeText}
        </h2>
      </div>
      <Link
        className="header__signout"
        onClick={() => {
          auth.signOut();
        }}
        disabled={loading}
        variant="subtitle1"
        color="primary"
      >
        <IconButton className="header__signout__icon" variant="contained">
          <ExitToAppIcon />
        </IconButton>
        <div className="header__signout__text">Log out</div>
      </Link>
    </div>
  );
};

export default Header;
