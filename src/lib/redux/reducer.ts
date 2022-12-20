import { createReducer, createSelector } from "@reduxjs/toolkit";

import { InternalActions } from "./actions";
import { RootState } from "./provider";
import { Duration, ModalState, TRANSITION_DURATION } from "./types";
import { ModalTransitions } from "../modal";
import { map, identity, CopyOptions, msg } from "../utils";

const logMsg = msg("Redux");

export const initialState: ModalState = {
  data: {},
  info: {},
  life: {},
};

export const initialDuration: Duration = {
  open: TRANSITION_DURATION,
  close: TRANSITION_DURATION,
};

const modalIDFn = (_: RootState, modalID: string) => modalID;

const dataSelector = (state: RootState) => state.modal.data;
const infoSelector = (state: RootState) => state.modal.info;
const lifeSelector = (state: RootState) => state.modal.life;

export const DynamicSelectors = {
  DATA: () =>
    createSelector([dataSelector, modalIDFn], (data, modalID) => data[modalID]),
  INFO: () =>
    createSelector([infoSelector, modalIDFn], (info, modalID) => info[modalID]),
} as const;

export const StaticSelectors = {
  INFOS: createSelector([infoSelector], identity),
  DATAS: createSelector([dataSelector], identity),
  LIFES: createSelector([lifeSelector], identity),
} as const;

const modalReducer = createReducer(initialState, (builder) => {
  builder
    // 모달 생성
    .addCase(InternalActions.create, (state, action) => {
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
    })
    // 모달 Transition 상태 변경
    .addCase(
      InternalActions.changeTransition,
      (state, action) =>
        void map.replace(state.info, CopyOptions.COPY_NOTHING)((info) => {
          if (!info) {
            throw new Error(
              logMsg.error(
                "[modalID={0}]는 존재하지 않는 모달입니다.",
                action.payload.modalID
              )
            );
          }

          return { ...info, state: action.payload.state };
        }, action.payload.modalID)
    )
    // 모달 삭제
    .addCase(InternalActions.remove, (state, action) => {
      state.data = map.remove(state.data)(action.payload.modalID);
      state.info = map.remove(state.info)(action.payload.modalID);
      state.life = map.remove(state.life)(action.payload.modalID);
    });
});

export default modalReducer;
