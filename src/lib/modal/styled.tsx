/** @jsxImportSource '@emotion/react' */
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

import { ModalTransition, ModalTransitions, TransitionProps } from ".";

export const GlobalModalProvider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Backdrop = styled.div<{
  noBackdrop: boolean;
  duration: number;
  state: ModalTransition;
}>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transition: ${(props) => `backdrop-filter ${props.duration}ms`};
  z-index: var(--z-modal);

  backdrop-filter: ${(props) => {
    switch (props.state) {
      case ModalTransitions.ENTERING:
      case ModalTransitions.ENTERED:
        return !props.noBackdrop ? "blur(4px)" : "none";

      case ModalTransitions.EXITING:
      case ModalTransitions.EXITED:
        return "none";
    }
  }};

  visibility: ${(props) =>
    props.state === ModalTransitions.EXITED ? "hidden" : "visible"};
`;

export const Modal = styled.div<{
  layout: SerializedStyles;
  state: ModalTransition;
  customTransition: TransitionProps;
}>`
  ${(props) => props.layout};

  ${(props) => props.customTransition.transitions[props.state]};
  ${(props) => props.customTransition.durations};

  visibility: ${(props) =>
    props.state === ModalTransitions.EXITED ? "hidden" : "visible"};
`;

export const DefaultTransition = (): TransitionProps => ({
  transitions: {
    [ModalTransitions.ENTERING]: css`
      opacity: 1;
    `,
    [ModalTransitions.ENTERED]: css`
      opacity: 1;
    `,
    [ModalTransitions.EXITING]: css`
      opacity: 0;
    `,
    [ModalTransitions.EXITED]: css`
      opacity: 0;
    `,
  },
  durations: css`
    transition: opacity 300ms;
  `,
});
