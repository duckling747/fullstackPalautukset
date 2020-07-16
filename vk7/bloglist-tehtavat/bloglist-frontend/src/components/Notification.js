import React from "react";
import { useSelector } from "react-redux";
import { messageClasses } from "../App";

const Notification = () => {

  const notification = useSelector(state => state.notes);

  // console.log(notification);

  let style;
  switch (notification.messageclass) {
  case messageClasses.NOTIFICATION:
    style = {
      color: "green",
      background: "white",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
      display: notification.text === "" ? "none" : ""
    };
    break;
  case messageClasses.ERROR:
    style = {
      color: "red",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
      display: notification.text === "" ? "none" : ""
    };
    break;
  default:
    break;
  }

  return (
    <div style={style}>
      {notification.text}
    </div>
  );
};


export default Notification;
