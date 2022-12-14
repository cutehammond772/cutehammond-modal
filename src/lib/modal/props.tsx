import * as React from "react";
import { SerializedStyles } from "@emotion/react";

import { ModalTransition } from ".";

// 모달 Transition 정보를 나타낸다.
// Fade-in, Fade-out의 기본 Transition이 존재한다.
export interface TransitionProps {
  // Transition의 상태에 따라 스타일을 달리 한다.
  // 기본 Transition 설정을 예로 들면,
  // - 모달이 열릴 때는 opacity를 1로 설정하고
  // - 모달이 닫힐 때는 opacity를 0으로 설정한다.
  transitions: { [type in ModalTransition]: SerializedStyles };

  // Transition의 지속 시간을 설정한다.
  durations: SerializedStyles;
};

// 모달의 정보를 나타낸다.
// 아래의 모든 property는 내부 로직에서 관리한다.
export interface ModalProps {
  // 이 모달이 열린 여부를 나타낸다.
  open: boolean;

  // 이 모달의 고유 ID이다.
  modalID: string;

  // 모달을 닫는 요청을 보낸다.
  onClose: () => void;
};

// 모달을 만들 때 필요한 베이스 컴포넌트의 정보를 나타낸다.
export interface ModalBaseProps extends React.PropsWithChildren<ModalProps> {
  // 이 모달의 레이아웃이다.
  layout: SerializedStyles;

  // 모달의 백그라운드에 백드랍 필터 처리를 하지 않는다.
  // 단, 각 모달마다 백드랍 필터가 포함되기 때문에
  // 이 모달의 백드랍 필터를 비활성화하더라도 다른 모달이 활성화 상태라면 백드랍 필터는 존재한다.
  noBackdrop?: boolean;

  // 모달과 백그라운드가 공존할 수 있도록 한다.
  // 기본적으로 'noBackdrop' 처리된다.
  dialog?: boolean;

  // 모달의 Transition을 커스터마이징할 수 있다.
  transition?: TransitionProps;

  // 모달의 Transition 지속 시간을 설정한다. 기본값은 500(ms)이다.
  duration?: number;
}
