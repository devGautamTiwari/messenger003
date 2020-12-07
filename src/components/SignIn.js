import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { auth } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";

import "../assets/css/SignIn.css";
import { Redirect } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Messenger003 {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    paddingTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#f5f5f5",
    color: "#373737",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
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
    <div className="signin__signin">
      <Container component="main" className="signin__container" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to Messenger003
          </Typography>
          <Typography color="error">{error.message}</Typography>

          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className="signin__email"
                  variant="outlined"
                  placeholder="Email Address"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Button
                className="signin__button"
                type="submit"
                fullWidth
                variant="contained"
                onClick={(e) => {
                  signIn(e);
                }}
              >
                {emailSent ? "Link Sent! Send Again?" : "Get Sign In Link"}
              </Button>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
