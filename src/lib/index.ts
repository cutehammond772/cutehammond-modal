export type { Duration } from "./redux";

export { ModalBase, ModalTransitions } from "./modal";

<<<<<<< HEAD
export { default as GlobalModalProvider } from "./provider";

export type {
  ModalProps,
  ModalBaseProps,
  TransitionProps,
  ModalTransition,
  ModalMapper,
} from "./modal";

=======
export type { Duration } from "./redux";

export { ModalBase, GlobalModalProvider, ModalTransitions } from "./modal";

export type {
  ModalProps,
  ModalBaseProps,
  TransitionProps,
  ModalTransition,
  ModalMapper,
} from "./modal";

>>>>>>> 0329976a0dce5d611d1e34a746847cc5260373e9
export * as consts from "./consts";

export { useModal, useModalData, useModalInfo } from "./hook";

export type { ModalRequest } from "./hook";

export { createModalMapper, createTransitionProps } from "./creator";

// consts
<<<<<<< HEAD
export { MODAL_TIMEOUT, TRANSITION_DURATION } from "./redux";
=======
export { MODAL_TIMEOUT } from "./saga";
export { TRANSITION_DURATION } from "./redux";
>>>>>>> 0329976a0dce5d611d1e34a746847cc5260373e9
