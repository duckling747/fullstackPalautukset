import React from "react";
import { useSelector } from "react-redux";
import { messageClasses } from "../App";
import { Alert } from "react-bootstrap";

const Notification = () => {

  const notification = useSelector(state => state.notes);

  // console.log(notification);

  const style = {
    display: notification.text === "" ? "none" : ""
  };
  let variant;
  switch (notification.messageclass) {
  case messageClasses.NOTIFICATION:
    variant = "success";
    break;
  case messageClasses.ERROR:
    variant = "danger";
    break;
  default:
    break;
  }

  return (
    <Alert variant={variant} style={style}>
      {notification.text}
    </Alert>
  );
};


export default Notification;
