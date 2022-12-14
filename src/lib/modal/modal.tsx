import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as Styled from "./styled";
import {
  DEFAULT_DURATION,
  ModalTransition,
  ModalTransitions as transitions,
  ModalBaseProps,
} from ".";

import { InternalActions as internal } from "../redux";

// 모달 컴포넌트를 만들기 위한 베이스 컴포넌트이다.
const ModalBase = (props: ModalBaseProps) => {
  const dispatch = useDispatch();

  const transitionID = useRef<NodeJS.Timeout>();
  const [transition, setTransition] = useState<ModalTransition>(
    transitions.EXITED
  );

  useEffect(() => {
    setTransition(props.open ? transitions.ENTERING : transitions.EXITING);
    clearTimeout(transitionID.current);

    transitionID.current = setTimeout(() => {
      setTransition(props.open ? transitions.ENTERED : transitions.EXITED);

      if (!props.open) {
        dispatch(internal.responseEnd({ modalID: props.modalID }));
      }
    }, props.duration ?? DEFAULT_DURATION);

    return () => clearTimeout(transitionID.current);
  }, [dispatch, props]);

  const modalComponent = (
    <Styled.Modal
      layout={props.layout}
      state={transition}
      onClick={(event) => event.stopPropagation()}
      customTransition={props.transition || Styled.DefaultTransition()}
    >
      {props.children}
    </Styled.Modal>
  );

  return !!props.dialog ? (
    modalComponent
  ) : (
    <Styled.Backdrop
      noBackdrop={!!props.noBackdrop}
      state={transition}
      onClick={props.onClose}
      duration={props.duration ?? DEFAULT_DURATION}
    >
      {modalComponent}
    </Styled.Backdrop>
  );
};

export default ModalBase;
