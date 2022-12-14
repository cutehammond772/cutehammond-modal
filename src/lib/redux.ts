import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { LIBRARY_NAME } from ".";

import { AnyProps, ModalInfo, ReduxState } from "./types";
import { map, identity, CopyOptions } from "./utils";

export const REDUCER_NAME = "@cutehammond/modal";

export interface ModalState {
  data: { [modalID: string]: AnyProps };
  info: { [modalID: string]: ModalInfo };
}

const initialState: ModalState = {
  data: {},
  info: {},
};

// Saga 로직에서 받는 요청
export const SagaActionTypes = {
  // 모달 생성 요청
  SAGA_CREATE: `${REDUCER_NAME}/SAGA_CREATE`,

  // 모달 삭제 요청
  SAGA_REQUEST_REMOVE: `${REDUCER_NAME}/SAGA_REQUEST_REMOVE`,

  // (삭제 요청 후) ModalTransition이 END일 때 (= 화면에서 안보이면) 응답
  SAGA_RESPONSE_END_TRANSITION: `${REDUCER_NAME}/SAGA_RESPONSE_END_TRANSITION`,
} as const;

// Reducer 요청
export const ReducerActionTypes = {
  // 모달 데이터를 Redux Store에 저장
  CREATE: `${REDUCER_NAME}/CREATE`,

  // 모달 닫기
  CLOSE: `${REDUCER_NAME}/CLOSE`,

  // 모달 데이터를 redux store에서 삭제
  REMOVE: `${REDUCER_NAME}/REMOVE_MODAL`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  createModal: createAction<{ name: string; data: AnyProps }>(SagaActionTypes.SAGA_CREATE),
  removeModal: createAction<{ modalID: string }>(SagaActionTypes.SAGA_REQUEST_REMOVE),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  createModal: createAction<{
    name: string;
    data: AnyProps;
    modalID: string;
  }>(ReducerActionTypes.CREATE),

  closeModal: createAction<{ modalID: string }>(ReducerActionTypes.CLOSE),
  removeModal: createAction<{ modalID: string }>(ReducerActionTypes.REMOVE),
  responseEnd: createAction<{ modalID: string }>(SagaActionTypes.SAGA_RESPONSE_END_TRANSITION),
} as const;

const modalIDFn = (_: ReduxState, modalID: string) => modalID;
const dataSelector = (state: ReduxState) => state.modal.data;
const infoSelector = (state: ReduxState) => state.modal.info;

export const DynamicSelectors = {
  DATA: () => createSelector([dataSelector, modalIDFn], (data, modalID) => data[modalID]),
} as const;

export const StaticSelectors = {
  INFOS: createSelector([infoSelector], identity),
} as const;

const modalReducer = createReducer(initialState, {
  [ReducerActionTypes.CREATE]: (state, action: ReturnType<typeof InternalActions.createModal>) => {
    const { name, data, modalID } = action.payload;

    map.put(state.data, CopyOptions.COPY_NOTHING)(modalID, data);
    map.put(state.info, CopyOptions.COPY_NOTHING)(modalID, {
      name,
      open: true,
    });
  },

  [ReducerActionTypes.CLOSE]: (state, action: ReturnType<typeof InternalActions.closeModal>) =>
    void map.replace(state.info, CopyOptions.COPY_NOTHING)((info) => {
      if (!info) {
        throw new Error(`[${LIBRARY_NAME}] [Redux] 존재하지 않는 modal에 대해 close를 요청했습니다.`);
      }

      return { ...info, open: false };
    }, action.payload.modalID),

  [ReducerActionTypes.REMOVE]: (state, action: ReturnType<typeof InternalActions.removeModal>) => {
    state.data = map.remove(state.data)(action.payload.modalID);
    state.info = map.remove(state.info)(action.payload.modalID);
  },
});

export default modalReducer;
