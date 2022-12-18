export { useAppDispatch, useAppSelector } from "./provider";

export { default as ModalProvider } from "./provider";

export { Actions } from "./actions";

export { initialState, initialDuration } from "./reducer";

export { DynamicSelectors, StaticSelectors } from "./reducer";

export { TRANSITION_DURATION, MODAL_TIMEOUT } from "./types";

export type { Duration, AnyProps, ModalInfo, ModalIDReference } from "./types"