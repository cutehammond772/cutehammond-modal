import * as React from "react";
import { ModalProps, ModalBase } from "../../../lib";
import { createModal } from "../../../lib";

import * as Styled from "./info.styled";

export const INFO_MODAL = "INFO_MODAL";

const InfoModal = React.memo((props: ModalProps) => (
  <ModalBase layout={Styled.Modal} {...props}>
    <Styled.Container>
      <Styled.Title>정보</Styled.Title>
      <Styled.Content>햄찌는 귀엽습니다.</Styled.Content>
      <Styled.ConfirmButton onClick={props.onClose}>확인</Styled.ConfirmButton>
    </Styled.Container>
  </ModalBase>
));

// 모달을 등록한다.
createModal(INFO_MODAL, InfoModal);
