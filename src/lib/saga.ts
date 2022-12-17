import { all, call, delay, fork, put, race, takeEvery } from "redux-saga/effects";

import { takeExact, msg } from "./utils";
import { ModalTransitions } from ".";
import {
  ReducerActions,
  SagaActions,
  Actions as actions,
  InternalActions as internal,
  initialDuration,
  Duration,
} from "./redux";

const logMsg = msg("Saga");

// 모달의 내부 행위에 대한 타임아웃이다. (5000 ms)
export const MODAL_TIMEOUT = 5000;

// 모달의 생명 주기를 관리한다.
const modalFlow = function* (action: ReturnType<typeof actions.createModal>) {
  const { name, data, duration } = action.payload;

  // modalID를 생성한다.
  const modalID = crypto.randomUUID();

  // 모달을 생성한다. (Redux Store에 초기 데이터를 저장한다.)
  yield put(internal.create({ name, data, duration, modalID }));

  // 모달이 GlobalModalProvider에 등록될 때까지 기다린다.
  yield call(waitRegistration, modalID);

  // 모달이 열리는 과정을 수행한다.
  yield call(handleOpen, modalID, duration || initialDuration);

  /* 모달이 보이는 중 */

  // 모달 삭제 요청을 받을 때까지 기다린다.
  yield call(waitDeletion, modalID);

  // 모달이 닫히는 과정을 수행한다.
  yield fork(handleClose, modalID, duration || initialDuration);

  // 모달이 닫힐 때까지 기다린다.
  yield waitClose(modalID);

  // 모달 데이터를 삭제한다.
  yield put(internal.remove({ modalID }));
};

// 모달이 GlobalModalProvider에 등록될 때까지 기다린다.
const waitRegistration = function* (modalID: string) {
  const { timeout } = yield race({
    wait: takeExact<ReturnType<typeof actions.registerModal>>(
      SagaActions.RESPONSE_REGISTER,
      (action) => action.payload.modalID === modalID
    ),
    timeout: delay(MODAL_TIMEOUT),
  });

  if (!!timeout) {
    throw new Error(logMsg.error("모달을 등록하는 데 실패하였습니다."));
  }
};

// 모달이 닫힐 때까지 기다린다.
const waitClose = function* (modalID: string) {
  const { timeout } = yield race({
    wait: takeExact<ReturnType<typeof internal.changeTransition>>(
      ReducerActions.CHANGE_TRANSITION,
      (action) =>
        action.payload.modalID === modalID && action.payload.state === ModalTransitions.EXITED
    ),
    timeout: delay(MODAL_TIMEOUT),
  });

  if (!!timeout) {
    throw new Error(logMsg.error("모달을 닫는 데 실패하였습니다."));
  }
};

// 모달 삭제 요청을 받을 때까지 기다린다.
const waitDeletion = function* (modalID: string) {
  yield takeExact<ReturnType<typeof actions.removeModal>>(
    SagaActions.REQUEST_REMOVE,
    (action) => action.payload.modalID === modalID
  );
};

// 모달이 열리는 과정을 수행한다.
const handleOpen = function* (modalID: string, duration: Duration) {
  // 모달 등록 후 Transition이 제대로 일어나도록 한다.
  yield delay(0);

  // 모달을 ENTERING 상태로 만든다.
  yield put(internal.changeTransition({ modalID, state: ModalTransitions.ENTERING }));

  // open duration만큼 기다린다.
  yield delay(duration.open);

  // 모달을 ENTERED 상태로 만든다.
  yield put(internal.changeTransition({ modalID, state: ModalTransitions.ENTERED }));
};

// 모달이 닫히는 과정을 수행한다.
const handleClose = function* (modalID: string, duration: Duration) {
  // 모달을 EXITING 상태로 만든다.
  yield put(internal.changeTransition({ modalID, state: ModalTransitions.EXITING }));

  // close duration만큼 기다린다.
  yield delay(duration.close);

  // 모달을 EXITED 상태로 만든다.
  yield put(internal.changeTransition({ modalID, state: ModalTransitions.EXITED }));
};

// 모달 생성 요청을 받는다.
const watchCreateModal = function* () {
  yield takeEvery(SagaActions.REQUEST_CREATE, modalFlow);
};

const modalSaga = function* () {
  yield all([fork(watchCreateModal)]);
};

export default modalSaga;
