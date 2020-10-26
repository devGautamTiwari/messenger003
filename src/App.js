import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Chat";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { auth } from "./firebase";
import { UserProfileProvider, UserProfileContext } from "./UserProfileContext";
import "./App.css";

const _App = () => {
  const [, , [username, setUsername], [user, setUser]] = useContext(
    UserProfileContext
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setUsername(authUser.displayName);
        if (!authUser.emailVerified) {
          authUser
            .sendEmailVerification()
            .then(() => alert("Email sent successfully on " + authUser.email))
            .catch((err) => alert(err.message));
        }
        // return <Chat />;
      } else {
        setUser(null);
        // return <SignIn />;
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Chat />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
const App = () => {
  return (
    <UserProfileProvider>
      <_App />
    </UserProfileProvider>
  );
};
export default App;
