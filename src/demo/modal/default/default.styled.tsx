/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";

import { createTransitionProps, ModalTransitions } from "../../../lib";

export const Modal = css`
  z-index: var(--z-header-tab);
  background: var(--panel);
  border-radius: 20px;

  position: absolute;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px var(--shadow);
  overflow: hidden;

  & > .container {
    position: relative;
    overflow-y: auto;
    padding: 30px;

    box-sizing: border-box;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  // Not mobile
  @media screen and (min-width: 768px) {
    top: 50%;
    transform: translateY(-50%);

    & > .container {
      max-height: 700px;
    }
  }

  // desktop ~
  @media screen and (min-width: 992px) {
    margin-left: calc(50% - 446.4px);
    margin-right: calc(50% - 446.4px);

    width: 892.8px;
  }

  // tablet
  @media screen and (max-width: 992px) {
    margin-left: 5%;
    margin-right: 5%;

    width: 90%;
  }

  // mobile
  @media screen and (max-width: 768px) {
    bottom: 0px;
    transform: none;

    border-radius: 30px 30px 0px 0px;

    margin-left: 36px;
    margin-right: 36px;

    width: calc(100% - 72px);

    & > .container {
      max-height: 800px;
    }
  }
`;

const ModalOpenTransition = css`
  opacity: 1;

  @media screen and (max-width: 768px) {
    opacity: 1;
    transform: none;
  }
`;

const ModalCloseTransition = css`
  opacity: 0;

  @media screen and (max-width: 768px) {
    opacity: 1;
    transform: translateY(100%);
  }
`;

export const Transition = createTransitionProps(() => ({
  transitions: {
    [ModalTransitions.ENTERING]: ModalOpenTransition,
    [ModalTransitions.ENTERED]: ModalOpenTransition,
    [ModalTransitions.EXITING]: ModalCloseTransition,
    [ModalTransitions.EXITED]: ModalCloseTransition,
  },

  durations: css`
    transition: opacity 300ms, transform 500ms;
  `,
}));
