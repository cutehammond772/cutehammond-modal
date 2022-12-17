import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { ModalTransition, ModalTransitions } from "./modal";
import { map, identity, CopyOptions, msg } from "./utils";

const logMsg = msg("Redux");

export type ReduxState = { [name: string]: any; modal: ModalState };
export type Duration = { open: number; close: number };

export type AnyProps = { [key: string]: any };
export type ModalInfo = { name: string; state: ModalTransition; duration: Duration };
export type ModalIDReference = { modalID: string };

export type ModalIDContainer<T> = { [modalID: string]: T };

export const TRANSITION_DURATION = 500;

export interface ModalState {
  data: ModalIDContainer<AnyProps>;
  info: ModalIDContainer<ModalInfo>;

  // GlobalModalProvider에서 생명 주기를 관리할 때 사용한다.
  life: ModalIDContainer<ModalIDReference>;
}

const initialState: ModalState = {
  data: {},
  info: {},
  life: {},
};

export const initialDuration: Duration = {
  open: TRANSITION_DURATION,
  close: TRANSITION_DURATION,
};

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

const modalIDFn = (_: ReduxState, modalID: string) => modalID;
const dataSelector = (state: ReduxState) => state.modal.data;
const infoSelector = (state: ReduxState) => state.modal.info;
const lifeSelector = (state: ReduxState) => state.modal.life;

export const DynamicSelectors = {
  DATA: () => createSelector([dataSelector, modalIDFn], (data, modalID) => data[modalID]),
  INFO: () => createSelector([infoSelector, modalIDFn], (info, modalID) => info[modalID]),
} as const;

export const StaticSelectors = {
  INFOS: createSelector([infoSelector], identity),
  DATAS: createSelector([dataSelector], identity),
  LIFES: createSelector([lifeSelector], identity),
} as const;

const modalReducer = createReducer(initialState, {
  // 모달 생성
  [ReducerActions.CREATE]: (state, action: ReturnType<typeof InternalActions.create>) => {
    const { name, duration, data, modalID } = action.payload;

    // 모달 props 저장
    map.put(state.data, CopyOptions.COPY_NOTHING)(modalID, data);

    // 모달 정보 저장
    map.put(state.info, CopyOptions.COPY_NOTHING)(modalID, {
      name,
      duration: duration || initialDuration,
      state: ModalTransitions.EXITED,
    });

    // 모달 생명주기 관리를 위한 레퍼런스 생성
    map.put(state.life, CopyOptions.COPY_NOTHING)(modalID, { modalID });
  },

  // 모달 Transition 상태 변경
  [ReducerActions.CHANGE_TRANSITION]: (
    state,
    action: ReturnType<typeof InternalActions.changeTransition>
  ) =>
    void map.replace(state.info, CopyOptions.COPY_NOTHING)((info) => {
      if (!info) {
        throw new Error(
          logMsg.error("[modalID={0}]는 존재하지 않는 모달입니다.", action.payload.modalID)
        );
      }

      return { ...info, state: action.payload.state };
    }, action.payload.modalID),

  // 모달 삭제
  [ReducerActions.REMOVE]: (state, action: ReturnType<typeof InternalActions.remove>) => {
    state.data = map.remove(state.data)(action.payload.modalID);
    state.info = map.remove(state.info)(action.payload.modalID);
    state.life = map.remove(state.life)(action.payload.modalID);
  },
});

export default modalReducer;
