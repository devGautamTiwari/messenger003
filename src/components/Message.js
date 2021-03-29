import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import "../assets/css/Message.css";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
// import Swipeable from "react-mui-swipeable";

import { db } from "../firebase";

const Message = (props, ref) => {
  const [text, setText] = useState(props.message.text);
  const [editMode, setEditMode] = useState(false);
  const isOwnMsg = props.email === props.message.email;
  var messageTimestamp = "";
  if (props.message.timestamp) {
    messageTimestamp = new Date(
      props.message.timestamp.seconds * 1000
    ).toLocaleString("en-US", {
      // weekday: "short",
      day: "numeric",
      month: "short",
      year: "2-digit",
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  const updateMessage = (id, text_) => {
    db.collection("messages").doc(id).set(
      {
        text: text_,
        edited: true,
      },
      { merge: true }
    );
  };

  return (
    <div className={`message${isOwnMsg ? " message__own" : ""}`}>
      <div className="message__card">
        <div className="row">
          <span className="message__name">
            {!isOwnMsg ? props.message.username : "You"}
          </span>
        </div>
        <div className="row">
          <span className="message__text">{props.message.text}</span>
          <span className="message__text__extra">
            {props.message.edited && " (edited)"}
          </span>
        </div>
        <div className="row">
          <span className="message__timestamp">{messageTimestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
