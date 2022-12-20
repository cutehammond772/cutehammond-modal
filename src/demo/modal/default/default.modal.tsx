import * as React from "react";
import { ModalBase, ModalProps } from "../../../lib";

import * as Styled from "./default.styled";

const DefaultModal = (props: React.PropsWithChildren<ModalProps>) => (
  <ModalBase layout={Styled.Modal} transition={Styled.Transition()} {...props}>
    <div className="container">{props.children}</div>
  </ModalBase>
);

export default DefaultModal;
