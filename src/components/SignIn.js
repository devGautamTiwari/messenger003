import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { auth } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import "../assets/css/SignIn.css";

function Copyright({ brandName }) {
  return (
    <p className="copyright">
      Copyright &copy; {brandName} {new Date().getFullYear()}.
    </p>
  );
}

export default function SignIn() {
  const [[email, setEmail], , , [, setLoading]] = useContext(
    UserProfileContext
  );
  const [error, setError] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
  const actionCodeSettings = {
    url: "https://facebook-messenger-clone003.web.app/signin",
    handleCodeInApp: true,
  };
  useEffect(() => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      setLoading(true);
      let email_ = window.localStorage.getItem("emailForSignIn");
      if (!email_) {
        email_ = prompt("Please provide your email for confirmation");
      }
      auth
        .signInWithEmailLink(email_, window.location.href)
        .then((authUser) => {
          window.localStorage.removeItem("emailForSignIn");
          setLoading(false);
          return <Redirect to="/" />;
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [email]);
  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        setError({});
        setEmailSent(true);
        setLoading(false);
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <div className="signin__wrapper">
      <header className="signin__header">
        <span aria-hidden={true} className="signin__header__lockicon">
          <LockOutlinedIcon />
        </span>
        <h1>Messenger003</h1>
      </header>

      <p className="error">{error.message}</p>

      <form className="signin__form" onSubmit={(e) => signIn(e)}>
        <h2>Sign in</h2>
        <input
          id="email"
          name="email"
          type="email"
          className="signin__email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="email"
          autoFocus
          required
        />
        <button className="signin__button" type="submit" disabled={!email}>
          {emailSent ? "Link Sent. Send Again?" : "Get Sign In Link"}
        </button>
      </form>
      <Copyright brandName={"Messenger003"} />
    </div>
  );
}
