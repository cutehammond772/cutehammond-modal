import { createAction } from "@reduxjs/toolkit";

import { AnyProps, Duration } from "./types";
import { ModalTransition } from "../modal";

// Saga 로직에서 받는 액션
export const SagaActions = {
  // 모달 생성 요청
  REQUEST_CREATE: `@cutehammond/modal/saga/REQUEST_CREATE`,

  // 모달 등록 응답
  RESPONSE_REGISTER: `@cutehammond/modal/saga/RESPONSE_REGISTER`,

  // 모달 삭제 요청
  REQUEST_REMOVE: `@cutehammond/modal/saga/REQUEST_REMOVE`,
} as const;

// Reducer 액션
export const ReducerActions = {
  // 모달 데이터를 Redux Store에 저장
  CREATE: `@cutehammond/modal/reducer/CREATE`,

  // 모달 데이터를 redux store에서 삭제
  REMOVE: `@cutehammond/modal/reducer/REMOVE`,

  // 모달 (Transition) 상태 변경
  CHANGE_TRANSITION: `@cutehammond/modal/reducer/CHANGE_TRANSITION`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  createModal: createAction<{ name: string; duration?: Duration; data: AnyProps }>(
    SagaActions.REQUEST_CREATE
  ),
  registerModal: createAction<{ modalID: string }>(SagaActions.RESPONSE_REGISTER),
  removeModal: createAction<{ modalID: string }>(SagaActions.REQUEST_REMOVE),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  create: createAction<{
    name: string;
    duration?: Duration;
    data: AnyProps;
    modalID: string;
  }>(ReducerActions.CREATE),

  // entering, entered, closing, closed는 saga 로직에서 처리
  changeTransition: createAction<{ modalID: string; state: ModalTransition }>(
    ReducerActions.CHANGE_TRANSITION
  ),

  remove: createAction<{ modalID: string }>(ReducerActions.REMOVE),
} as const;
