export { default as modalSaga } from "./saga";

export { default as modalReducer } from "./redux";

export { Modal, GlobalModalProvider, ModalTransitions } from "./modal";

export type { CustomModalProps, TransitionProps, ModalTransition, ModalMapper } from "./modal";

export { default as useModal } from "./hook";

export type { CreateModalProps } from "./types";

export const LIBRARY_NAME = "@cutehammond/modal";