import { ModalProps, TransitionProps } from ".";

export const ModalTransitions = {
  ENTERING: "ENTERING",
  ENTERED: "ENTERED",
  EXITING: "EXITING",
  EXITED: "EXITED",
} as const;

export type ModalTransition = typeof ModalTransitions[keyof typeof ModalTransitions];

export interface ModalMapper {
  [name: string]: React.ComponentType<ModalProps>;
}

export type ModalMapperGenerator = () => ModalMapper;

export type TransitionPropsGenerator = () => TransitionProps;
