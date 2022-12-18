import * as React from "react";

import * as Styled from "./styled";

import { ModalBaseProps } from "./props";
import { ModalTransitions } from "./types";

import { initialDuration } from "../redux";
import { useModalInfo } from "../hook";

// 모달 컴포넌트를 만들기 위한 베이스 컴포넌트이다.
const ModalBase = (props: ModalBaseProps) => {
  const { info } = useModalInfo(props.modalID);

  const modal = (
    <Styled.ModalBase
      layout={props.layout}
      state={info?.state ?? ModalTransitions.EXITED}
      onClick={(event) => event.stopPropagation()}
      transitionProps={props.transition || Styled.defaultTransition()}
    >
      {props.children}
    </Styled.ModalBase>
  );

  if (!!props.dialog) {
    return modal;
  }

  return (
    <Styled.Backdrop
      noBackdrop={!!props.noBackdrop}
      state={info?.state ?? ModalTransitions.EXITED}
      onClick={props.onClose}
      duration={info?.duration ?? initialDuration}
    >
      {modal}
    </Styled.Backdrop>
  );
};

export default ModalBase;
