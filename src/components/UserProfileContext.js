import React, { useState, createContext } from "react";

const UserProfileContext = createContext();

const UserProfileProvider = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLoading = (seconds = 120) => {
    setLoading(true);
    setTimeout(() => setLoading(false), seconds * 1000);
  };
  // const [canAccess, setCanAccess] = useState(false);

  return (
    <UserProfileContext.Provider
      value={[
        [email, setEmail],
        [username, setUsername],
        [user, setUser],
        [loading, setLoading, handleLoading],
      ]}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
