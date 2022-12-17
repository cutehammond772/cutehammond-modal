import * as React from "react";
import { useCallback, useRef, useEffect, PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Styled from "./styled";

import { StaticSelectors as selectors, Actions as actions, ModalIDReference } from "../redux";
import { ModalMapperGenerator } from "./types";

// 모달을 관리하는 컴포넌트이다.
const GlobalModalProvider = (props: PropsWithChildren<{ mapper: ModalMapperGenerator }>) => {
  const dispatch = useDispatch();
  const infos = useSelector(selectors.INFOS);
  const lifes = useSelector(selectors.LIFES);

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
    <Styled.GlobalModalProvider>
      {props.children}
      {Object.keys(infos).map((modalID) => {
        const { name } = infos[modalID];
        const Modal = mapper[name];

        return <Modal modalID={modalID} onClose={() => closeHandler(modalID)} key={modalID} />;
      })}
    </Styled.GlobalModalProvider>
  );
};

export default GlobalModalProvider;
