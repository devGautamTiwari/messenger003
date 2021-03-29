import React, { useState, useEffect, useContext, useRef } from "react";
import Message from "./Message";
// import FlipMove from "react-flip-move";
import { db } from "../firebase";
import { UserProfileContext } from "./UserProfileContext";
import Header from "./Header";
import Footer from "./Footer";
import "../assets/css/Chat.css";

import UsernameModal from "./UsernameModal";

const Chat = () => {
  const [
    [email],
    [username],
    [user],
    [, setLoading],
    ,
    ,
    chatSectionHeight,
  ] = useContext(UserProfileContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = () => {
      db.collection("messages")
        .orderBy("timestamp", "asc")
        .limit(100)
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
          setLoading(false);
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        });
    };
    return unsubscribe();
  }, []);

  return (
    <div className="chat__main">
      {/* {user && user.displayName ? ( */}
      {true ? (
        <>
          <Header displayName={"user.displayName"} />
          <div className="chat__chat">
            {/* <FlipMove className="chat__flipmove"> */}
            {messages.map(({ id, message }) => {
              if (!message.text.trim()) {
                db.collection("messages").doc(id).delete();
                return <></>;
              }
              return (
                <Message
                  key={id}
                  username={username}
                  message={message}
                  email={email}
                  id={id}
                />
              );
            })}
            {/* </FlipMove> */}
          </div>
          <div ref={messagesEndRef} />
          <Footer />
        </>
      ) : (
        <UsernameModal />
      )}
    </div>
  );
};
export default Chat;
