import React, { useState, useEffect, useContext, useRef } from "react";
import Message from "./Message";
import FlipMove from "react-flip-move";
import { db } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import Header from "./Header";
import Footer from "./Footer";
import "../assets/css/Chat.css";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { auth } from "../firebase";

const Chat = () => {
  const [[email], [username, setUsername], [user]] = useContext(
    UserProfileContext
  );
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(true);
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("timestamp", "asc")
      .limit(100)
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      });

    return () => unsubscribe();
  }, []);
  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <div className="chat__main">
      <Header />
      {username ? (
        <div className="chat__chat">
          <FlipMove className="chat__flipmove">
            {messages.map(({ id, message }) => (
              <Message
                key={id}
                username={username}
                message={message}
                email={email}
                id={id}
              />
            ))}
          </FlipMove>
        </div>
      ) : (
        <Modal
          open={modalOpen}
          className="chat__modal"
          onClose={handleClose}
          disableBackdropClick
          aria-labelledby="Enter your username (be creative)"
          aria-describedby="Username is your display name"
        >
          <form>
            <FormControl className="chat__modal__formcontrol">
              <TextField
                variant="outlined"
                label="Username (be creative)"
                value={displayName}
                className="chat__modal__input"
                size="small"
                onChange={(e) => setDisplayName(e.target.value)}
                autoFocus
              />
              <Button
                className="chat__modal__button"
                disabled={!displayName}
                variant="contained"
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
                        setModalOpen(false);
                        setUsername(displayName);
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
      )}
      <div ref={messagesEndRef} />
      <Footer />
    </div>
  );
};

export default Chat;
