import * as React from "react";
import { SerializedStyles } from "@emotion/react";

import { ModalTransition } from ".";

// Modal을 만들 때 이를 통해 Transition Animation을 커스텀할 수 있다.
export interface TransitionProps {
  // 각 ModalTransition마다 요소의 스타일을 설정한다.
  transitions: { [type in ModalTransition]: SerializedStyles };

  // 각 요소의 transition 지속 시간을 설정한다.
  durations: SerializedStyles;
};

export interface CustomModalProps {
  // 이 모달이 활성화된 여부를 나타낸다.
  open: boolean;

  // 이 모달의 고유 ID이다.
  modalID: string;

  // 모달을 닫는 요청을 보낸다.
  onClose: () => void;
};

export interface ModalProps extends React.PropsWithChildren, CustomModalProps {
  // 이 모달의 레이아웃이다.
  layout: SerializedStyles;

  // 모달 뒤에 있는 백그라운드 블러 처리를 하지 않는다.
  // 단, 다른 모달에 backdrop이 존재하는 이상 이 설정은 적용되지 않는다.
  noBackdrop?: boolean;

  // 모달과 모달 뒤의 백그라운드가 공존할 수 있도록 한다.
  // 기본적으로 'noBackdrop' 처리된다.
  dialog?: boolean;

  // 모달의 Transition을 커스텀할 수 있다.
  transition?: TransitionProps;

  // 모달의 Transition 지속 시간을 설정한다. 기본값은 500(ms)이다.
  duration?: number;
}
