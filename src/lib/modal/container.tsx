import * as React from "react";
import { useCallback, useRef, useEffect, PropsWithChildren } from "react";

import * as Styled from "./styled";

import {
  StaticSelectors as selectors,
  Actions as actions,
  ModalIDReference,
  useAppDispatch,
  useAppSelector,
} from "../redux";
import { ModalMapperGenerator } from "./types";

export interface ModalContainerProps {
  mapper: ModalMapperGenerator;
}

// 모달을 관리하는 컴포넌트이다.
const ModalContainer = (props: PropsWithChildren<ModalContainerProps>) => {
  const dispatch = useAppDispatch();
  const infos = useAppSelector(selectors.INFOS);
  const lifes = useAppSelector(selectors.LIFES);

  const register = useRef<WeakSet<ModalIDReference>>(new WeakSet());

  const closeHandler = useCallback(
    (modalID: string) => dispatch(actions.removeModal({ modalID })),
    [dispatch]
  );

  const mapper = props.mapper();

  useEffect(() => {
    Object.keys(lifes).forEach((modalID) => {
      const ref = lifes[modalID];

      if (!register.current.has(ref)) {
        register.current.add(ref);
        dispatch(actions.registerModal({ modalID }));
      }
    });
  }, [lifes, dispatch]);

  return (
    <Styled.ModalContainer>
      {props.children}
      {Object.keys(infos).map((modalID) => {
        const { name } = infos[modalID];
        const Modal = mapper[name];

        return <Modal modalID={modalID} onClose={() => closeHandler(modalID)} key={modalID} />;
      })}
    </Styled.ModalContainer>
  );
};

export default ModalContainer;
