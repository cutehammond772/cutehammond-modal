import {
  all,
  call,
  delay,
  fork,
  put,
  race,
  take,
  takeEvery,
} from "redux-saga/effects";
import {
  SagaActionTypes,
  Actions as actions,
  InternalActions as internal,
} from "./redux";
import { END_TRANSITION_TIMEOUT } from "./types";

// 모달 Transition이 끝날 때까지 기다린다.
const waitEndTransition = function* (modalID: string) {
  while (true) {
    const action: ReturnType<typeof internal.responseEnd> = yield take(
      SagaActionTypes.SAGA_RESPONSE_END_TRANSITION
    );

    if (action.payload.modalID !== modalID) {
      continue;
    }

    break;
  }
};

// FLOW:
// 1. 모달 생성: SAGA_CREATE => CREATE
// 2. 모달 삭제: SAGA_REQUEST_REMOVE => CLOSE => SAGA_RESPONSE_END_TRANSITION => REMOVE
const modalFlow = function* (action: ReturnType<typeof actions.createModal>) {
  const { name, data } = action.payload;

  // 임의의 modalID 생성
  const modalID = crypto.randomUUID();

  // 모달을 생성한다.
  yield put(internal.createModal({ name, data, modalID }));

  /* 모달이 보이는 중 */

  // 이 modalID에 대한 모달 삭제 요청을 받는다.
  while (true) {
    const action: ReturnType<typeof actions.removeModal> = yield take(
      SagaActionTypes.SAGA_REQUEST_REMOVE
    );

    if (action.payload.modalID !== modalID) {
      continue;
    }

    // 먼저 모달을 닫는다.
    yield put(internal.closeModal({ modalID }));

    // 모달 Transition이 끝날 때까지 기다린다. 단, 5초(= 5000ms) 타임아웃이 존재한다.
    const { timeout } = yield race({
      wait: call(waitEndTransition, modalID),
      timeout: delay(END_TRANSITION_TIMEOUT),
    });

    if (!!timeout) {
      throw new Error(
        "[modalFlow] 모달을 닫는 과정에서 Transition 지속 시간이 일정 시간을 초과했습니다."
      );
    }

    // 모달 데이터를 삭제한다.
    yield put(internal.removeModal({ modalID }));

    break;
  }
};

const watchCreateModal = function* () {
  yield takeEvery(SagaActionTypes.SAGA_CREATE, modalFlow);
};

const modalSaga = function* () {
  yield all([fork(watchCreateModal)]);
};

export default modalSaga;
