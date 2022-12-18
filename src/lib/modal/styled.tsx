/** @jsxImportSource '@emotion/react' */
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

import { ModalTransition, ModalTransitions, TransitionProps } from ".";
import { createTransitionProps } from "../creator";
import { Duration } from "../redux";

export const ModalContainer = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
`;

export const Backdrop = styled.div<{
  noBackdrop: boolean;
  duration: Duration;
  state: ModalTransition;
}>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: var(--z-modal);

  transition: backdrop-filter
    ${(props) => {
      switch (props.state) {
        case ModalTransitions.ENTERING:
        case ModalTransitions.ENTERED:
          return props.duration.open;

        case ModalTransitions.EXITING:
        case ModalTransitions.EXITED:
          return props.duration.close;
      }
    }}ms;

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

  visibility: ${(props) => (props.state === ModalTransitions.EXITED ? "hidden" : "visible")};
`;

export const ModalBase = styled.div<{
  layout: SerializedStyles;
  state: ModalTransition;
  transitionProps: TransitionProps;
}>`
  ${(props) => props.layout};
  ${(props) => props.transitionProps.transitions[props.state]};
  ${(props) => props.transitionProps.durations};

  visibility: ${(props) => (props.state === ModalTransitions.EXITED ? "hidden" : "visible")};
`;

export const defaultTransition = createTransitionProps(() => ({
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
}));
