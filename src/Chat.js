import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Message from "./Message";
import { FormControl, Input, IconButton, Button } from "@material-ui/core";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import firebase from "firebase";
import db, { auth } from "./firebase";
import { UserProfileContext } from "./UserProfileContext";
import "./Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const [, , [username, setUsername], [user, setUser]] = useContext(
    UserProfileContext
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .limit(50)
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        )
      );
    // setUsername(user.displayName);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  const deleteMessages = (e, n) => {
    messages
      .slice(0, n)
      .map((msg) => db.collection("messages").doc(msg.id).delete());
  };
  return (
    <div>
      <h2 style={{ color: "#ffffffdd" }}>
        Welcome {username !== "unknown user" && username}!
      </h2>
      <Link to="/signin" style={{ textDecorationLine: "none" }}>
        <Button
          className="chat__signout"
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign out
        </Button>
      </Link>
      {username === "gautamtiwari003" && (
        <IconButton
          onClick={(e) =>
            deleteMessages(
              e,
              parseInt(prompt("how many messages you want to delete?"))
            )
          }
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      )}

      {/* <div style={{ height: "78px", border: "5px white dotted" }}></div> */}
      <form className="chat__form">
        <FormControl className="chat__formControl">
          <Input
            className="chat__input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />

          <IconButton
            className="chat__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <div className="chat__chat">
        <FlipMove className="chat__FlipMove">
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} id={id} />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default Chat;
