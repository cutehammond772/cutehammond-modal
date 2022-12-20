import { ModalProps, TransitionProps } from ".";
import { Duration } from "../redux";

export const ModalTransitions = {
  ENTERING: "ENTERING",
  ENTERED: "ENTERED",
  EXITING: "EXITING",
  EXITED: "EXITED",
} as const;

export type ModalTransition =
  typeof ModalTransitions[keyof typeof ModalTransitions];

export interface ModalMapper {
  [name: string]: {
    component: React.ComponentType<ModalProps>;
    duration?: Duration;
  };
}

export type TransitionPropsGenerator = () => TransitionProps;
