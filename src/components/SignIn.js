import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { auth } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import "../assets/css/SignIn.css";

function Copyright({ brandName }) {
  return (
    <p>
      Copyright &copy; {brandName} {new Date().getFullYear()}.
    </p>
  );
}

export default function SignIn() {
  const [[email, setEmail], , , [, setLoading, handleLoading]] = useContext(
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
      handleLoading(3);
      let email_ = window.localStorage.getItem("emailForSignIn");
      if (!email_) {
        email_ = prompt("Please provide your email for confirmation");
      }
      auth
        .signInWithEmailLink(email_, window.location.href)
        .then((authUser) => {
          window.localStorage.removeItem("emailForSignIn");
          // setLoading(false);
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
    handleLoading(2);
    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        setError({});
        setEmailSent(true);
        window.localStorage.setItem("emailForSignIn", email);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <div className="signin__container">
      <span aria-hidden={true}>
        <LockOutlinedIcon />
      </span>
      <h1>Sign in to Messenger003</h1>
      <p className="error">{error.message}</p>

      <form onSubmit={(e) => signIn(e)}>
        <input
          id="email"
          name="email"
          type="email"
          className="signin__email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="email"
          autoFocus
          required
        />
        <button className="signin__button" type="submit">
          {emailSent ? "Link Sent! Send Again?" : "Get Sign In Link"}
        </button>
      </form>
      <Copyright brandName={"Messenger003"} />
    </div>
  );
}
