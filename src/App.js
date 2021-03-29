import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  UserProfileProvider,
  UserProfileContext,
} from "./components/UserProfileContext";

import Chat from "./components/Chat";
import Loader from "./components/Loader";
import SignIn from "./components/SignIn";

import { auth } from "./firebase";
import "./assets/css/App.css";

function APP() {
  const [
    [, setEmail],
    [username, setUsername],
    [user, setUser],
    [loading, setLoading],
  ] = useContext(UserProfileContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setLoading(true);
      if (authUser) {
        setUser(authUser);
        setEmail(authUser.email);
        setUsername(authUser.displayName);
      } else {
        setUser(null);
        setUsername("");
        setEmail("");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  return (
    <div className="App">
      {loading && <Loader />}
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Chat /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/signin">
            {!user ? <SignIn /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
const App = () => {
  return (
    <UserProfileProvider>
      <APP />
    </UserProfileProvider>
  );
};
export default App;
