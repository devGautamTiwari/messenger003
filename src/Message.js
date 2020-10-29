import React, { forwardRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Input,
  IconButton,
} from "@material-ui/core";
import "./Message.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase";

const Message = forwardRef((props, ref) => {
  const [text, setText] = useState(props.message.text);
  const [editMode, setEditMode] = useState(false);
  const isUser = props.email === props.message.email;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <p className="message__username">
        {!isUser && props.message.username}
        {props.message.edited && !isUser && " (edited)"}
      </p>

      {isUser && (
        <>
          <IconButton
            className="message__edit"
            onClick={(e) => {
              setEditMode(!editMode);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>

          <IconButton
            className="message__delete"
            onClick={() => db.collection("messages").doc(props.id).delete()}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          {!editMode ? (
            <Typography
              color="textPrimary"
              className={`message__text ${isUser && "message__userText"}`}
              variant="h6"
              component="h6"
            >
              {text}
            </Typography>
          ) : (
            <form
              onSubmit={() => {
                db.collection("messages").doc(props.id).set(
                  {
                    text: text,
                    edited: true,
                  },
                  { merge: true }
                );
                setEditMode(false);
              }}
            >
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => {
                  setEditMode(false);
                }}
              />
              <button type="submit" style={{ display: "none" }}></button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;