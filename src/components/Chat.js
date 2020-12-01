import React, { useState, useEffect, useContext, useRef } from "react";
import Message from "./Message";
import FlipMove from "react-flip-move";
import { db } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import Header from "./Header";
import Footer from "./Footer";
import "../assets/css/Chat.css";

const Chat = () => {
  const [[email], [username]] = useContext(UserProfileContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

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

  return (
    <div className="chat__main">
      <Header />
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
        <div ref={messagesEndRef} />
      </div>
      <Footer />
    </div>
  );
};

export default Chat;