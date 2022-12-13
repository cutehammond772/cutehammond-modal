import { CustomModalProps } from ".";

// 모달 Transition의 기본 지속 시간이다. (밀리초)
export const DEFAULT_DURATION: number = 500;

export const ModalTransitions = {
  ENTERING: "ENTERING",
  ENTERED: "ENTERED",
  EXITING: "EXITING",
  EXITED: "EXITED",
} as const;

export type ModalTransition =
  typeof ModalTransitions[keyof typeof ModalTransitions];

export type ModalMapper = () => {
  [name: string]: React.ComponentType<CustomModalProps>;
};
