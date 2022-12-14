import * as React from "react";
import { Modal } from "../../../lib";

import * as Styled from "./default.styled";
import { DefaultModalProps } from "./default.props";

const DefaultModal = (props: DefaultModalProps) => (
  <Modal
    open={props.open}
    onClose={props.onClose}
    layout={Styled.Modal}
    transition={Styled.Transition()}
    modalID={props.modalID}
  >
    <div className="container">{props.children}</div>
  </Modal>
);

export default React.memo(DefaultModal);
