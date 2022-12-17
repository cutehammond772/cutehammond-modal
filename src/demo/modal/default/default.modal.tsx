import * as React from "react";
import { ModalBase, ModalBaseProps } from "../../../lib";

import * as Styled from "./default.styled";

const DefaultModal = (props: Omit<ModalBaseProps, "layout" | "transition">) => (
  <ModalBase layout={Styled.Modal} transition={Styled.Transition()} {...props}>
    <div className="container">{props.children}</div>
  </ModalBase>
);

export default React.memo(DefaultModal);
