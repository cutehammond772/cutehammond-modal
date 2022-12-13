import { ModalState } from "./redux";

// saga.ts
export const END_TRANSITION_TIMEOUT = 5000;

// redux.ts
export type ReduxState = { [name: string]: any; modal: ModalState };

export type AnyProps = { [key: string]: any };
export type ModalInfo = { name: string; open: boolean };

// hook.ts
export interface CreateModalProps<T extends AnyProps> {
  name: string;
  data: T;
}
