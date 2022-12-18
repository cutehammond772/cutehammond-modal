import * as React from "react";
import { ModalContainer, ModalContainerProps } from "./modal";
import { AppProvider } from "./redux";

const GlobalModalProvider = (props: React.PropsWithChildren<ModalContainerProps>) => (
  <AppProvider>
    <ModalContainer mapper={props.mapper}>{props.children}</ModalContainer>
  </AppProvider>
);

export default React.memo(GlobalModalProvider);
