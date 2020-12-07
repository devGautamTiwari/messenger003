import React, { forwardRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { isMobile } from "react-device-detect";

import "../assets/css/Message.css";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import { db } from "../firebase";

const Message = forwardRef((props, ref) => {
  const [text, setText] = useState(props.message.text);
  const [editMode, setEditMode] = useState(false);
  const isUser = props.email === props.message.email;
  const updateMessage = (id, text_) => {
    db.collection("messages").doc(id).set(
      {
        text: text,
        edited: true,
      },
      { merge: true }
    );
  };

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
      {!editMode ? (
        <Card className={isUser ? "message__userCard" : "message__guestCard"}>
          <CardContent>
            <Typography
              color="textPrimary"
              className={`message__text ${isUser && "message__userText"}`}
              variant="h6"
              component="h6"
            >
              {text}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <form className="message__form">
          <FormControl className="message__formControl">
            <TextField
              className="message__input"
              value={text}
              variant="outlined"
              multiline
              size="small"
              onChange={(e) => setText(e.target.value)}
              onBlur={() => {
                updateMessage(props.id, text);
                setEditMode(false);
              }}
              onKeyPress={(e) => {
                if (!isMobile) {
                  if (!e.shiftKey && e.key === "Enter") {
                    e.preventDefault();
                    updateMessage(props.id, text);
                    setEditMode(false);
                  }
                }
              }}
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment postion="end">
                    <IconButton
                      className="message__sendIconButton"
                      disabled={!text}
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={() => updateMessage(props.id, text)}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </form>
      )}
    </div>
  );
});

export default Message;
