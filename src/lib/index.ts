export type { Duration } from "./redux";

export { ModalBase, ModalTransitions } from "./modal";

export { default as GlobalModalProvider } from "./provider";

export type {
  ModalProps,
  ModalBaseProps,
  TransitionProps,
  ModalTransition,
  ModalMapper,
} from "./modal";

export * as consts from "./consts";

export { useModal, useModalData, useModalInfo } from "./hook";

export { createTransitionProps } from "./creator";

export { TRANSITION_DURATION, MODAL_TIMEOUT } from "./redux";
