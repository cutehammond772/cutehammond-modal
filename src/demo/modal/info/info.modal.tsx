import * as React from "react";
import { ModalProps, ModalBase } from "../../../lib";
import { createModal } from "../../../lib/modal/creator";

import * as Styled from "./info.styled";

export const INFO_MODAL = "info";

createModal(INFO_MODAL, (props: ModalProps) => (
  <ModalBase layout={Styled.Layout} {...props}>
    <Styled.Container>
      <Styled.Title>정보</Styled.Title>
      <Styled.Content>햄찌는 귀엽습니다.</Styled.Content>
      <Styled.ConfirmButton onClick={props.onClose}>확인</Styled.ConfirmButton>
    </Styled.Container>
  </ModalBase>
));
