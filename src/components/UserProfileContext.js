import React, { useState, createContext } from "react";

const UserProfileContext = createContext();

const UserProfileProvider = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const headerHeight = "65";
  const footerHeight = "40";
  const chatSectionHeight =
    window.innerHeight - headerHeight - footerHeight - 21;

  // const [canAccess, setCanAccess] = useState(false);

  return (
    <UserProfileContext.Provider
      value={[
        [email, setEmail],
        [username, setUsername],
        [user, setUser],
        [loading, setLoading],
        headerHeight,
        footerHeight,
        chatSectionHeight,
      ]}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
