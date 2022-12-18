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
export { MODAL_TIMEOUT, TRANSITION_DURATION } from "./redux";