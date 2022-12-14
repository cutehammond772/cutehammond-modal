import * as React from "react";
import { ModalProps, Modal } from "../../../lib";

import * as Styled from "./info.styled";

const InfoModal = (props: ModalProps) => {
  return (
    <Modal layout={Styled.Layout} {...props}>
      <Styled.Container>
        <Styled.Title>정보</Styled.Title>
        <Styled.Content>햄찌는 귀엽습니다.</Styled.Content>
        <Styled.ConfirmButton onClick={props.onClose}>
          확인
        </Styled.ConfirmButton>
      </Styled.Container>
    </Modal>
  );
};

export default InfoModal;
