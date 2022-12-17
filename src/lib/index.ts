export { default as modalSaga } from "./saga";

export { default as modalReducer } from "./redux";

export type { Duration } from "./redux";

export { ModalBase, GlobalModalProvider, ModalTransitions } from "./modal";

export type {
  ModalProps,
  ModalBaseProps,
  TransitionProps,
  ModalTransition,
  ModalMapper,
} from "./modal";

export * as consts from "./consts";

export { useModal, useModalData, useModalInfo } from "./hook";

export type { ModalRequest } from "./hook";

export { createModalMapper, createTransitionProps } from "./creator";

// consts
export { MODAL_TIMEOUT } from "./saga";
export { TRANSITION_DURATION } from "./redux";