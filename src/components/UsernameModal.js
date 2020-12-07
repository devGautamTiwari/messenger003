import React, { useContext, useState } from "react";
import { Button, FormControl, Modal, TextField } from "@material-ui/core";
import { auth } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";

const UsernameModal = () => {
  const [, [username, setUsername]] = useContext(UserProfileContext);
  const [modalOpen, setModalOpen] = useState(true);
  const [displayName, setDisplayName] = useState(username);
  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div className="chat__modal__background"></div>

      <Modal
        open={modalOpen}
        className="chat__modal"
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="Enter your display name (be creative)"
        aria-describedby="Display name is shown to others"
      >
        <form>
          <FormControl className="chat__modal__formcontrol">
            <TextField
              variant="outlined"
              placeholder="Display name"
              value={displayName}
              className="chat__modal__input"
              size="small"
              helperText="Enter your display name"
              autoFocus
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <Button
              className="chat__modal__button"
              disabled={!displayName}
              variant="outlined"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                let user = auth.currentUser;
                if (user) {
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
            >
              Done
            </Button>
          </FormControl>
        </form>
      </Modal>
    </div>
  );
};

export default UsernameModal;
