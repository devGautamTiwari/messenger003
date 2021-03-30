import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import "../assets/css/UsernameModal.css";

const UsernameModal = () => {
  const [, [username, setUsername]] = useContext(UserProfileContext);
  const [modalOpen, setModalOpen] = useState(true);
  const [displayName, setDisplayName] = useState(username);
  return (
    <div className="username__modal">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let user = auth.currentUser;
          if (user && displayName.length > 4) {
            user
              .updateProfile({
                displayName: displayName,
              })
              .then(() => {
                setUsername(displayName);
                setModalOpen(false);
              })
              .catch((err) => alert(err.message));
          }
        }}
        className="username____modal__form"
      >
        <h1>Messenger003</h1>
        <h3 className="username__modal__heading">Create Display Name</h3>
        <input
          className="username__modal__name"
          placeholder="Enter a display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value.trim())}
          autoFocus
        />
        <button
          className="username__modal__btn"
          type="submit"
          disabled={displayName.length < 4 ? true : false}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UsernameModal;
