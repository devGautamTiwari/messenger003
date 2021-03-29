import React, { useContext, useState } from "react";
import { Button, FormControl, Modal, TextField } from "@material-ui/core";
import { auth } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";

const UsernameModal = () => {
  const [, [username, setUsername]] = useContext(UserProfileContext);
  const [modalOpen, setModalOpen] = useState(true);
  const [displayName, setDisplayName] = useState(username);
  return (
    <div>
      <Modal
        open={modalOpen}
        className="chat__modal"
        onClose={() => {
          setModalOpen(false);
        }}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="Enter your display name (be creative)"
        aria-describedby="Display name is shown to others"
      >
        <form>
          <FormControl className="chat__modal__formcontrol">
            <TextField
              variant="outlined"
              placeholder="Enter a display name"
              value={displayName}
              className="chat__modal__input"
              size="small"
              helperText="At least 4 characters"
              autoFocus
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <Button
              className="chat__modal__button"
              disabled={displayName.length < 4 ? true : false}
              variant="outlined"
              type="submit"
              onClick={(e) => {
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
