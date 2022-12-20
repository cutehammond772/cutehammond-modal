import * as React from "react";
import { AppProvider } from "./redux";
import ModalContainer from "./modal/container";

const GlobalModalProvider = (props: React.PropsWithChildren) => (
  <AppProvider>
    <ModalContainer>{props.children}</ModalContainer>
  </AppProvider>
);

export default React.memo(GlobalModalProvider);
