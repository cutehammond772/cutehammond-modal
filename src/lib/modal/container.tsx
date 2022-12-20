import * as React from "react";
import { useCallback, useRef, useEffect } from "react";

import * as Styled from "./styled";

import {
  StaticSelectors as selectors,
  Actions as actions,
  ModalIDReference,
  useAppDispatch,
  useAppSelector,
} from "../redux";
import { msg } from "../utils";
import { useMapper } from "./creator";

const logMsg = msg("ModalContainer");

// 모달을 관리하는 컴포넌트이다.
const ModalContainer = (props: React.PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const infos = useAppSelector(selectors.INFOS);
  const lifes = useAppSelector(selectors.LIFES);

  const register = useRef<WeakSet<ModalIDReference>>(new WeakSet());
  const mapper = useMapper();

  const closeHandler = useCallback(
    (modalID: string) => dispatch(actions.removeModal({ modalID })),
    [dispatch]
  );

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

        if (!(name in mapper)) {
          throw new Error(logMsg.error("'{0}'는 존재하지 않는 모달입니다.", name));
        }

        const { component: Modal } = mapper[name];

        return <Modal modalID={modalID} onClose={() => closeHandler(modalID)} key={modalID} />;
      })}
    </Styled.ModalContainer>
  );
};

export default ModalContainer;
