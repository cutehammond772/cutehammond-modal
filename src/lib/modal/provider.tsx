import * as React from "react";
import { useCallback, PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ModalMapper } from ".";
import * as Styled from "./styled";

import {
  StaticSelectors as selectors,
  Actions as actions,
} from "../redux";

const GlobalModalProvider = (props: PropsWithChildren<{ mapper: ModalMapper }>) => {
  const dispatch = useDispatch();
  const info = useSelector(selectors.INFOS);

  const handleClose = useCallback(
    (modalID: string) => dispatch(actions.removeModal({ modalID })),
    [dispatch]
  );

  const mapper = props.mapper();

  return (
    <Styled.GlobalModalProvider>
      {props.children}
      {Object.keys(info).map((modalID) => {
        const { name, open } = info[modalID];
        const Modal = mapper[name];

        return (
          <Modal
            open={open}
            modalID={modalID}
            onClose={() => handleClose(modalID)}
            key={modalID}
          />
        );
      })}
    </Styled.GlobalModalProvider>
  );
};

export default GlobalModalProvider;
