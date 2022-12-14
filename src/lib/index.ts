export { default as modalSaga } from "./saga";

export { default as modalReducer } from "./redux";

export { Modal, GlobalModalProvider, ModalTransitions } from "./modal";

export type { ModalProps, TransitionProps, ModalTransition, ModalMapper } from "./modal";

export { useModal, useModalData } from "./hook";

export type { ModalRequest } from "./hook";

export { createModalMapper, createTransitionProps } from "./creator";

export const LIBRARY_NAME = "@cutehammond/modal";