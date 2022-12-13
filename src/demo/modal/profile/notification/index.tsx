import * as React from "react";
import { NotificationProps } from "../profile.props";
import * as Styled from "./notification.styled";

const Notification = (props: NotificationProps) => (
  <Styled.Notification onClick={props.onClick}>
    <div className="icon">{props.icon}</div>
    <div className="title">{props.title}</div>
    <div className="content">{props.content}</div>
    <div
      className="remove"
      onClick={(event) => {
        event.stopPropagation();
        !!props.onRemove && props.onRemove();
      }}
    >
      {"지우기"}
    </div>
  </Styled.Notification>
);

export default React.memo(Notification);
