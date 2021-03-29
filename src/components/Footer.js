import React, { useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import "../assets/css/Footer.css";

const Footer = () => {
  const [input, setInput] = useState("");
  const [[email], [username], , , , footerHeight] = useContext(
    UserProfileContext
  );

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
      e.target.innerText = "";
    }
  };
  return (
    <div className="footer">
      <form className="footer__form">
        <div
          className="footer__input"
          placeholder="Type a message..."
          onInput={(e) => setInput(e.target.innerText.trim())}
          onKeyPress={
            !isMobile &&
            ((e) => {
              if (!e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                sendMessage(e);
              }
            })
          }
          autoFocus
          contentEditable={true}
        />
        <button
          className="footer__sendBtn"
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        >
          <span className="footer__sendBtn__text">Send</span>
          <span className="footer__sendBtn__icon">
            <SendIcon />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Footer;
