import React, { useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import firebase from "firebase";

import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import "../assets/css/Footer.css";

const Footer = () => {
  const [input, setInput] = useState("");
  const [[email], [username]] = useContext(UserProfileContext);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("messages").add({
        text: input,
        username: username,
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };
  return (
    <form className="footer__form">
      <FormControl className="footer__formControl">
        <TextField
          className="footer__input"
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          multiline
          size="small"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (!isMobile) {
              if (!e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                sendMessage(e);
              }
            }
          }}
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment postion="end">
                <IconButton
                  className="footer__iconButton"
                  disabled={!input}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={sendMessage}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </form>
  );
};

export default Footer;
